"""K-Runway prototype: pitch example, backtest, model checks, charts and the synthetic dataset.

    .venv/bin/python run.py           # 300 synthetic users, about 1 minute -> output/
    .venv/bin/python run.py --quick   # 60 users for a fast check           -> output/quick/
"""
import sys
from pathlib import Path

import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
import pandas as pd  # noqa: E402

from krunway import backtest  # noqa: E402
from krunway.data import generate  # noqa: E402
from krunway.simulate import Income, even_split, simulate  # noqa: E402

ROOT = Path(__file__).resolve().parent
GREEN, RED, AMBER, GREY = '#00A950', '#DC2626', '#F59E0B', '#94A3B8'
METHOD_STYLE = {
    'usual': ('Spend as usual\n(no app)', GREY),
    'even': ('Even split', RED),
    'direct': ('Day-by-day plan\n(no uncertainty)', AMBER),
    'mc_noml': ('Monte Carlo\nwithout ML', '#64748B'),
    'ml_uncapped': ('ML + MC\nuncapped', '#86EFAC'),
    'ml': ('K-Runway\n(ML + MC, capped)', GREEN),
}


def pitch_example(rng):
    """The slide example: ฿9,000 today, rent ฿3,500 on day 5, a client owes ฿8,000 expected on day 12."""
    days = 30
    bills = np.zeros(days)
    bills[4] = 3500

    def client(may_be_late):
        delays = np.array([0, 6, 13]) if may_be_late else np.array([0])
        weights = np.array([0.6, 0.3, 0.1]) if may_be_late else np.array([1.0])
        return [Income(11, 8000, lambda size, min_delay: rng.choice(delays, size, p=weights))]

    usual = np.full(days, 395.0)
    cv = 0.7
    noise = rng.lognormal(-np.log1p(cv ** 2) / 2, np.sqrt(np.log1p(cv ** 2)), 20_000)
    on_time = simulate(rng, 9000, bills, client(False), usual, noise, paths=20_000, block=1)
    late = simulate(rng, 9000, bills, client(True), usual, noise, paths=20_000, block=1)
    recommended = late.budget_for(backtest.MAIN_TARGET)
    rows = [
        ('Even split (balance + income - rent) / 30', even_split(9000, bills, client(True)), None),
        ('Usual spending, client always pays on time', 395, on_time.probability(395)),
        ('Usual spending, client may pay late', 395, late.probability(395)),
        ('Spend 280/day, client may pay late', 280, late.probability(280)),
        (f'Recommended at {backtest.MAIN_TARGET:.0%} target', recommended, late.probability(recommended)),
    ]
    return pd.DataFrame(rows, columns=['scenario', 'daily_budget', 'chance_enough']), late, recommended


def fan_chart(sim, budget, path):
    day = np.arange(1, sim.shape.shape[1] + 1)
    fig, ax = plt.subplots(figsize=(8, 4.2))
    for spend, colour, label in ((sim.natural_budget, RED, 'Usual'), (budget, GREEN, 'Recommended')):
        p5, p50, p95 = np.percentile(sim.balance_paths(spend), [5, 50, 95], axis=0)
        ax.fill_between(day, p5, p95, color=colour, alpha=0.15, linewidth=0)
        ax.plot(day, p50, color=colour, linewidth=2, label=f'{label} {spend:,.0f} THB/day (median, 5-95% band)')
    ax.axhline(0, color=GREY, linewidth=1, linestyle='--')
    ax.set(xlabel='Day', ylabel='Balance (THB)', title='Simulated balance over 30 days (illustrative example)')
    ax.legend(frameon=False, loc='upper right')
    ax.spines[['top', 'right']].set_visible(False)
    fig.tight_layout()
    fig.savefig(path, dpi=200)
    plt.close(fig)


def ran_out_chart(summary, path):
    labels, colours = zip(*(METHOD_STYLE[m] for m in summary.index))
    fig, ax = plt.subplots(figsize=(10, 4.5))
    bars = ax.bar(labels, summary.ran_out_pct, color=colours)
    ax.tick_params(axis='x', labelsize=8)
    ax.bar_label(bars, fmt='%.0f%%', padding=3)
    ax.set(ylabel='Ran out of money (%)', ylim=(0, 100),
           title="Following each method's daily budget for 30 days (synthetic backtest)")
    ax.spines[['top', 'right']].set_visible(False)
    fig.tight_layout()
    fig.savefig(path, dpi=200)
    plt.close(fig)


def calibration_chart(cal, path):
    fig, ax = plt.subplots(figsize=(5, 5))
    ax.plot([0.65, 1], [0.65, 1], color=GREY, linestyle='--', label='Perfect calibration')
    label, colour = METHOD_STYLE['ml']
    ax.plot(cal.target, cal.realized, marker='o', color=colour, label=label.replace('\n', ' '))
    ax.set(xlabel='Target chance of staying above 0 THB', ylabel='Share that really stayed above 0 THB',
           title='Calibration on synthetic backtest', xlim=(0.65, 1), ylim=(0.55, 1))
    ax.legend(frameon=False, loc='lower right')
    ax.spines[['top', 'right']].set_visible(False)
    fig.tight_layout()
    fig.savefig(path, dpi=200)
    plt.close(fig)


def main(quick=False):
    out = ROOT / 'output' / 'quick' if quick else ROOT / 'output'
    out.mkdir(parents=True, exist_ok=True)

    example, late, recommended = pitch_example(np.random.default_rng(3))
    example.to_csv(out / 'pitch_example.csv', index=False)
    fan_chart(late, recommended, out / 'example_fan_chart.png')

    data = generate(n_users=60 if quick else 300)
    data.save_csv(out / 'data')
    results, lateness = backtest.run(data, paths=2000 if quick else 4000)
    summary = backtest.summary(results)
    by_persona = backtest.ran_out_by_persona(results)
    by_risk = backtest.ran_out_by_risk(results)
    cal = backtest.calibration(results)
    checks = backtest.model_checks(results, lateness)
    summary.to_csv(out / 'backtest_summary.csv')
    by_persona.to_csv(out / 'backtest_by_persona.csv')
    by_risk.to_csv(out / 'backtest_by_risk.csv')
    cal.to_csv(out / 'calibration.csv', index=False)
    checks.to_csv(out / 'model_checks.csv')
    ran_out_chart(summary, out / 'ran_out_by_method.png')
    calibration_chart(cal, out / 'calibration.png')

    pct = lambda p: '-' if pd.isna(p) else f'{p:.0%}'  # noqa: E731
    print('\n== Pitch example (illustrative assumptions) ==')
    print(example.to_string(index=False, formatters={'daily_budget': '{:,.0f} THB'.format, 'chance_enough': pct}))
    print(f'\n== Backtest: {len(data.users)} synthetic users x {results.origin.nunique()} start days, 30-day horizon ==')
    print(summary.round(3).to_string())
    print('\nRan out of money when following the recommendation (%), by persona:')
    print(by_persona.round(1).to_string())
    print(f'\nRan out (%), split by whether K-Runway saw a chance below {backtest.MAIN_TARGET:.0%} at usual spending:')
    print(by_risk.round(1).to_string())
    print('\nCalibration (cases where the target is reachable; the rest get a warning):')
    print(cal.round(3).to_string(index=False))
    print('\nModel checks:')
    print(checks.round(3).to_string())
    print(f'\nWritten to {out}')


if __name__ == '__main__':
    main(quick='--quick' in sys.argv)
