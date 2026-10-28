"""What the bank can learn from a user's history, and the models that feed the simulation.

detect_bills   recurring bills from outgoing payments (rule-based)
UserHistory    everything visible about one user before a given day
SpendModel     gradient boosting: each future day's spending relative to the user's usual level
DelayModel     how late each payer tends to pay, shrunk toward a bank-wide prior (cold start)
"""
import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingRegressor

LEVEL_WINDOW = 30
FEATURES = ['dow', 'dom', 'days_since_income', 'log_level', 'balance_ratio']


def detect_bills(outflows: pd.DataFrame, min_count=3, max_amount_cv=0.1, gap_range=(26, 35)) -> pd.DataFrame:
    """Merchants paid at least three times, with nearly the same amount, roughly monthly."""
    rows = []
    for merchant, group in outflows.groupby('merchant'):
        days = np.sort(group.day.unique())
        if len(group) < min_count or len(days) != len(group):  # several payments a day is not a bill
            continue
        gap = float(np.median(np.diff(days)))
        cv = group.amount.std() / group.amount.mean()
        if gap_range[0] <= gap <= gap_range[1] and cv <= max_amount_cv:
            rows.append(dict(merchant=merchant, amount=float(group.amount.iloc[-1]),
                             period=round(gap), last_day=int(days[-1])))
    return pd.DataFrame(rows, columns=['merchant', 'amount', 'period', 'last_day'])


def project_bills(bills: pd.DataFrame, origin: int, horizon: int) -> np.ndarray:
    """Expected bill amount on each of the `horizon` days starting at `origin`."""
    schedule = np.zeros(horizon)
    for bill in bills.itertuples():
        due = bill.last_day + bill.period
        while due < origin:
            due += bill.period
        while due < origin + horizon:
            schedule[due - origin] += bill.amount
            due += bill.period
    return schedule


class UserHistory:
    """Everything visible about one user before day `origin`."""

    def __init__(self, user_tx: pd.DataFrame, user_invoices: pd.DataFrame, opening_balance: float, origin: int):
        seen = user_tx[user_tx.day < origin]
        out = seen[seen.direction == 'out']
        self.origin = origin
        self.bills = detect_bills(out)
        everyday = out[~out.merchant.isin(self.bills.merchant)]
        self.spend = everyday.groupby('day').amount.sum().reindex(range(origin), fill_value=0.0).to_numpy()
        signed = seen.amount.where(seen.direction == 'in', -seen.amount)
        net = signed.groupby(seen.day).sum().reindex(range(origin), fill_value=0.0).to_numpy()
        self.balances = opening_balance + np.cumsum(net)  # end of each day
        self.balance = float(self.balances[-1])
        self.income_days = np.sort(seen[seen.direction == 'in'].day.unique())
        paid = user_invoices[user_invoices.actual_day < origin]
        self.delays = {payer: (g.actual_day - g.expected_day).to_numpy() for payer, g in paid.groupby('payer')}
        known = (user_invoices.known_day <= origin) & (user_invoices.actual_day >= origin)
        self.pending = user_invoices[known][['payer', 'expected_day', 'amount']].reset_index(drop=True)

    def level(self, window=LEVEL_WINDOW):
        return float(self.spend[-window:].mean())

    def level_sigma(self, window=LEVEL_WINDOW, minimum=0.1):
        """How far a month's average spending drifts from the long-run average (log scale)."""
        months = self.spend[len(self.spend) % window:].reshape(-1, window).mean(axis=1)
        if len(months) < 3:
            return 0.25  # new customer: a cautious default
        return max(minimum, float(np.std(np.log(months / self.spend.mean()), ddof=1)))


def _days_since(days, income_days):
    if len(income_days) == 0:
        return np.full(len(days), 30)
    idx = np.searchsorted(income_days, days, side='right') - 1
    last = np.where(idx >= 0, income_days[np.clip(idx, 0, None)], -30)
    return np.minimum(days - last, 30)


def training_rows(history: UserHistory, start=LEVEL_WINDOW) -> pd.DataFrame:
    """One row per past day: features known the evening before, and spending relative to the usual level."""
    days = np.arange(start, history.origin)
    level = pd.Series(history.spend).rolling(LEVEL_WINDOW).mean().shift(1).to_numpy()[days]
    return pd.DataFrame(dict(
        dow=days % 7, dom=days % 30, days_since_income=_days_since(days, history.income_days),
        log_level=np.log(level), balance_ratio=np.clip(history.balances[days - 1] / level, -20, 60),
        target=history.spend[days] / level,
    ))


class SpendModel:
    def __init__(self, seed=0):
        self.model = HistGradientBoostingRegressor(max_iter=300, learning_rate=0.05, max_leaf_nodes=15,
                                                   min_samples_leaf=80, random_state=seed)

    def fit(self, histories):
        rows = pd.concat([training_rows(h) for h in histories], ignore_index=True)
        rows = rows[np.isfinite(rows.log_level)]
        self.model.fit(rows[FEATURES], rows.target)
        return self

    def forecast(self, history: UserHistory, horizon: int):
        """Expected spending for each future day, and this user's residual multipliers (mean 1)."""
        level = history.level()
        days = np.arange(history.origin, history.origin + horizon)
        income_days = np.sort(np.concatenate([history.income_days, history.pending.expected_day.to_numpy()]))
        future = pd.DataFrame(dict(
            dow=days % 7, dom=days % 30, days_since_income=_days_since(days, income_days),
            log_level=np.log(level), balance_ratio=np.clip(history.balance / level, -20, 60)))
        mean = np.clip(self.model.predict(future[FEATURES]), 0.05, None) * level

        past = training_rows(history, start=max(LEVEL_WINDOW, history.origin - 90))
        fitted = np.clip(self.model.predict(past[FEATURES]), 0.05, None)
        residuals = past.target.to_numpy() / fitted
        return mean, residuals / residuals.mean()


def _not_yet_paid(rng, draws, own, prior, min_delay):
    """An invoice that is already overdue must arrive at least `min_delay` days late."""
    too_early = draws < min_delay
    if min_delay <= 0 or not too_early.any():
        return draws
    pool = np.concatenate([own, prior])
    pool = pool[pool >= min_delay]
    # Nothing in history this late: assume it may not arrive within the horizon.
    replacement = rng.choice(pool, too_early.sum()) if len(pool) else np.full(too_early.sum(), 10_000)
    draws = draws.copy()
    draws[too_early] = replacement
    return draws


class DelayModel:
    """This payer's own delay history mixed with the bank-wide prior, weighted like k extra observations."""

    def __init__(self, prior: dict, k=3.0):
        self.prior = prior  # payer kind -> delays observed across all customers
        self.k = k

    @staticmethod
    def kind(payer):
        return 'EMPLOYER' if payer == 'EMPLOYER' else 'CLIENT'

    def _own(self, history, payer):
        return history.delays.get(payer, np.array([], dtype=int))

    def sample(self, rng, history, payer, size, min_delay=0):
        own, prior = self._own(history, payer), self.prior[self.kind(payer)]
        use_own = rng.random(size) < len(own) / (len(own) + self.k)
        own_draws = rng.choice(own, size) if len(own) else 0
        draws = np.where(use_own, own_draws, rng.choice(prior, size))
        return _not_yet_paid(rng, draws, own if len(own) else prior, prior, min_delay)

    def prior_late(self, payer):
        return float(np.mean(self.prior[self.kind(payer)] > 0))

    def p_late(self, history, payer):
        own = self._own(history, payer)
        weight = len(own) / (len(own) + self.k)
        own_rate = float(np.mean(own > 0)) if len(own) else 0.0
        return weight * own_rate + (1 - weight) * self.prior_late(payer)


def prior_delays(invoices: pd.DataFrame, before_day: int) -> dict:
    """Bank-wide delays observed before `before_day`, by payer kind."""
    paid = invoices[invoices.actual_day < before_day]
    delays = (paid.actual_day - paid.expected_day).to_numpy()
    employer = (paid.payer == 'EMPLOYER').to_numpy()
    return {'EMPLOYER': delays[employer], 'CLIENT': delays[~employer]}
