"""Rolling-origin backtest: three ways to set "safe to spend today", checked against what really happened.

(a) even    (balance + expected income - bills) / days
(b) direct  day-by-day cash flow with every income on its expected date: timing, but no uncertainty
(c) ml      K-Runway: gradient-boosting spend model + per-payer delays + Monte Carlo

Models are trained on the first 180 days. For every user and start day after
that, each method recommends a daily budget for the next 30 days (K-Runway
targets an 85% chance of never going below zero). We then replay what really
happened: real income dates, real bills, and the user's real day-to-day
spending pattern rescaled so its average equals the recommendation.
"""
import numpy as np
import pandas as pd
from sklearn.metrics import roc_auc_score

from .data import Dataset
from .model import DelayModel, SpendModel, UserHistory, prior_delays, project_bills
from .simulate import Income, direct_plan, even_split, simulate

HORIZON = 30
TRAIN_END = 180
ORIGINS = range(TRAIN_END, 240, 7)
TARGETS = (0.7, 0.8, 0.85, 0.9, 0.95)
MAIN_TARGET = 0.85
WARN_BELOW = 0.7  # warn when the chance of lasting at usual spending is below this
METHODS = ('even', 'direct', 'ml')


def pending_incomes(history: UserHistory, sampler, rng):
    def arrival(payer):
        return lambda size, min_delay: sampler.sample(rng, history, payer, size, min_delay)
    return [Income(int(row.expected_day - history.origin), float(row.amount), arrival(row.payer))
            for row in history.pending.itertuples()]


def what_happened(user_tx: pd.DataFrame, history: UserHistory, horizon=HORIZON) -> dict:
    """The real next `horizon` days.

    realized_max  largest average daily spend the user could have afforded, keeping their own day-to-day pattern
    natural_ok    whether their actual spending stayed above zero
    """
    window = user_tx[(user_tx.day >= history.origin) & (user_tx.day < history.origin + horizon)]
    offset = (window.day - history.origin).to_numpy()
    amount = window.amount.to_numpy()
    incoming = (window.direction == 'in').to_numpy()
    is_bill = window.merchant.isin(history.bills.merchant).to_numpy()

    def by_day(mask):
        return np.bincount(offset[mask], weights=amount[mask], minlength=horizon)

    available = history.balance + np.cumsum(by_day(incoming)) - np.cumsum(by_day(~incoming & is_bill))
    spend = by_day(~incoming & ~is_bill)
    usual = float(history.spend.mean())
    shape = np.maximum(np.cumsum(spend) / usual, 1e-9)
    return dict(realized_max=float(np.min(available / shape)),
                natural_ok=bool(np.all(available - np.cumsum(spend) >= 0)),
                usual_spend=usual, actual_spend=float(spend.sum()))


def fit_models(data: Dataset, train_end=TRAIN_END):
    histories = [UserHistory(*data.user(uid), train_end) for uid in data.users.user_id]
    return SpendModel().fit(histories), DelayModel(prior_delays(data.invoices, train_end))


def run(data: Dataset, origins=ORIGINS, paths=4000, seed=11):
    """Returns (results, lateness).

    results   one row per user x start day x method
    lateness  one row per pending income due within a week of a start day, with predicted chance of being late
    """
    rng = np.random.default_rng(seed)
    spend_model, delay_model = fit_models(data)
    rows, lateness = [], []
    for user in data.users.itertuples():
        user_tx, user_inv, opening = data.user(user.user_id)
        for origin in origins:
            history = UserHistory(user_tx, user_inv, opening, origin)
            bills = project_bills(history.bills, origin, HORIZON)
            incomes = pending_incomes(history, delay_model, rng)
            base = dict(user_id=user.user_id, persona=user.persona, origin=origin,
                        naive_forecast=float(history.spend[-7:].mean() * HORIZON), **what_happened(user_tx, history))

            rows.append(dict(base, method='even', budget=even_split(history.balance, bills, incomes)))
            rows.append(dict(base, method='direct', budget=direct_plan(history.balance, bills, incomes)))

            mean, residuals = spend_model.forecast(history, HORIZON)
            sim = simulate(rng, history.balance, bills, incomes, mean, residuals,
                           paths=paths, block=7, level_sigma=history.level_sigma())
            row = dict(base, method='ml', budget=sim.budget_for(MAIN_TARGET),
                       p_natural=sim.probability(sim.natural_budget), forecast_spend=float(mean.sum()))
            for t in TARGETS:
                row[f'budget_{t}'] = sim.budget_for(t)
                # Even spending nothing misses the target: the product should warn instead of budgeting.
                row[f'feasible_{t}'] = sim.probability(0.0) >= t
            rows.append(row)

            due = user_inv[(user_inv.known_day <= origin) & (user_inv.expected_day >= origin)
                           & (user_inv.expected_day < origin + 7)]
            lateness += [dict(payer=i.payer, late=i.actual_day > i.expected_day,
                              p_payer=delay_model.p_late(history, i.payer), p_type=delay_model.prior_late(i.payer))
                         for i in due.itertuples()]

    results = pd.DataFrame(rows)
    results['ran_out'] = results.budget > results.realized_max
    return results, pd.DataFrame(lateness)


def summary(results: pd.DataFrame) -> pd.DataFrame:
    rows = {}
    for method in METHODS:
        g = results[results.method == method]
        has_p = g.p_natural.notna().any()
        rows[method] = {
            'ran_out_pct': 100 * g.ran_out.mean(),
            'avg_budget': g.budget.mean(),
            'budget_vs_usual_pct': 100 * (g.budget / g.usual_spend).mean(),
            'zero_budget_pct': 100 * (g.budget < 1).mean(),
            'brier': ((g.p_natural - g.natural_ok.astype(float)) ** 2).mean() if has_p else np.nan,
        }
    return pd.DataFrame(rows).T.rename_axis('method')


def ran_out_by_persona(results: pd.DataFrame) -> pd.DataFrame:
    table = results.pivot_table(index='persona', columns='method', values='ran_out', aggfunc='mean')
    return 100 * table[list(METHODS)]


def calibration(results: pd.DataFrame) -> pd.DataFrame:
    """For each target: among cases where the target is reachable, how often the budget really lasted."""
    ml = results[results.method == 'ml']
    rows = []
    for t in TARGETS:
        reachable = ml[ml[f'feasible_{t}'].astype(bool)]
        rows.append(dict(target=t, realized=float((reachable[f'budget_{t}'] <= reachable.realized_max).mean()),
                         warned_pct=100 * (1 - len(reachable) / len(ml))))
    return pd.DataFrame(rows)


def model_checks(results: pd.DataFrame, lateness: pd.DataFrame) -> pd.DataFrame:
    """The individual pieces of the ML model, next to a simple baseline where one applies."""
    ml = results[results.method == 'ml']
    clients = lateness[lateness.payer != 'EMPLOYER']

    def forecast_error(forecast, actual):
        return 100 * float(np.median(np.abs(forecast - actual) / actual))

    flagged, ran_out = ml.p_natural < WARN_BELOW, ~ml.natural_ok
    caught = (flagged & ran_out).sum()
    rows = [
        ('Spend forecast error, 30-day total (median %) | baseline: last 7 days average',
         forecast_error(ml.forecast_spend, ml.actual_spend), forecast_error(ml.naive_forecast, ml.actual_spend)),
        ('Late-payment AUC, all income | baseline: payer type only',
         roc_auc_score(lateness.late, lateness.p_payer), roc_auc_score(lateness.late, lateness.p_type)),
        ('Late-payment AUC, freelance clients only | baseline: payer type only',
         roc_auc_score(clients.late, clients.p_payer), roc_auc_score(clients.late, clients.p_type)),
        (f'Run-out warning (chance < {WARN_BELOW:.0%}): real run-outs caught %', 100 * caught / ran_out.sum(), np.nan),
        (f'Run-out warning (chance < {WARN_BELOW:.0%}): warnings that were right %', 100 * caught / flagged.sum(), np.nan),
    ]
    return pd.DataFrame(rows, columns=['check', 'ml', 'baseline']).set_index('check')
