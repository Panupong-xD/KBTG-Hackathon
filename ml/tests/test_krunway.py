import sys
import unittest
from pathlib import Path
from types import SimpleNamespace

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from krunway.data import generate  # noqa: E402
from krunway.model import DelayModel, UserHistory, detect_bills, prior_delays, project_bills  # noqa: E402
from krunway.simulate import Income, direct_plan, even_split, simulate  # noqa: E402


def fixed_delay(days):
    return lambda size, min_delay: np.full(size, days)


def slide_bills():
    bills = np.zeros(30)
    bills[4] = 3500
    return bills


class SimulationTest(unittest.TestCase):
    def test_without_noise_the_budget_is_exact(self):
        bills = np.zeros(10)
        bills[2] = 300
        sim = simulate(np.random.default_rng(0), 1000, bills, [Income(5, 1000, fixed_delay(0))],
                       np.full(10, 50.0), np.array([1.0]), paths=10)
        # Tightest point is day 5 (index 4): 1000 - 300 = 700 over 5 days -> 140/day
        # (over all 10 days it would be 1700 / 10 = 170).
        self.assertAlmostEqual(sim.budget_for(0.85), 140.0)
        self.assertEqual(sim.probability(140), 1.0)
        self.assertEqual(sim.probability(141), 0.0)

    def test_chance_falls_as_budget_rises_and_meets_target(self):
        rng = np.random.default_rng(1)
        incomes = [Income(11, 8000, lambda size, min_delay: rng.choice([0, 6, 13], size, p=[0.6, 0.3, 0.1]))]
        sim = simulate(rng, 9000, slide_bills(), incomes, np.full(30, 395.0), rng.lognormal(0, 0.6, 5000), paths=5000)
        chances = [sim.probability(b) for b in range(0, 600, 20)]
        self.assertTrue(all(a >= b for a, b in zip(chances, chances[1:])))
        for target in (0.7, 0.85, 0.95):
            self.assertGreaterEqual(sim.probability(sim.budget_for(target)), target - 1e-9)

    def test_late_income_lowers_the_safe_budget(self):
        def budget(delay):
            sim = simulate(np.random.default_rng(2), 9000, np.zeros(30), [Income(11, 8000, fixed_delay(delay))],
                           np.full(30, 395.0), np.array([1.0]), paths=10)
            return sim.budget_for(0.85)
        self.assertLess(budget(40), budget(0))

    def test_even_split_matches_the_slide_example(self):
        self.assertAlmostEqual(even_split(9000, slide_bills(), [Income(11, 8000, fixed_delay(0))]), 450.0)

    def test_direct_plan_respects_timing_but_even_split_does_not(self):
        late_income = [Income(20, 8000, fixed_delay(0))]
        # Until the income on day 21 there is only 9000 - 3500 = 5500 for 20 days.
        self.assertAlmostEqual(direct_plan(9000, slide_bills(), late_income), 275.0)
        self.assertAlmostEqual(even_split(9000, slide_bills(), late_income), 450.0)


class DataAndModelTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = generate(n_users=6, seed=5)

    def test_bill_detection_finds_monthly_bills_but_not_everyday_spending(self):
        tx, _, _ = self.data.user(0)
        found = set(detect_bills(tx[(tx.direction == 'out') & (tx.day < 180)]).merchant)
        self.assertTrue({'LANDLORD', 'TELCO'} <= found)
        self.assertFalse({'DAILY', 'SHOP'} & found)

    def test_projected_bills_match_the_next_month(self):
        tx, _, _ = self.data.user(0)
        bills = detect_bills(tx[(tx.direction == 'out') & (tx.day < 180)])
        actual = tx[(tx.day >= 180) & (tx.day < 210) & tx.merchant.isin(bills.merchant)]
        self.assertAlmostEqual(project_bills(bills, 180, 30).sum(), actual.amount.sum())

    def test_history_never_sees_the_future(self):
        tx, inv, opening = self.data.user(1)
        history = UserHistory(tx, inv, opening, 150)
        daily = self.data.daily_balance()
        self.assertAlmostEqual(history.balance, daily[(daily.user_id == 1) & (daily.day == 149)].balance.item())
        self.assertEqual(len(history.spend), 150)
        self.assertEqual(sum(map(len, history.delays.values())), (inv.actual_day < 150).sum())

    def test_overdue_income_is_never_sampled_as_already_paid(self):
        tx, inv, opening = self.data.user(1)
        history = UserHistory(tx, inv, opening, 150)
        model = DelayModel(prior_delays(self.data.invoices, 150))
        draws = model.sample(np.random.default_rng(0), history, 'CLIENT_0', 2000, min_delay=5)
        self.assertTrue((draws >= 5).all())

    def test_late_payers_get_a_higher_chance_of_being_late(self):
        model = DelayModel({'CLIENT': np.array([0, 5]), 'EMPLOYER': np.array([0])}, k=3.0)
        history = SimpleNamespace(delays={'SLOW': np.array([5, 7, 3]), 'PROMPT': np.array([0, 0, 0])})
        # Three own observations weigh as much as the prior (k = 3); the prior says 50% late.
        self.assertAlmostEqual(model.p_late(history, 'SLOW'), 0.75)
        self.assertAlmostEqual(model.p_late(history, 'PROMPT'), 0.25)
        self.assertAlmostEqual(model.p_late(history, 'NEW'), 0.5)
        self.assertAlmostEqual(model.p_late(history, 'EMPLOYER'), 0.0)


class BacktestTest(unittest.TestCase):
    def test_k_runway_never_suggests_spending_above_usual(self):
        from krunway import backtest
        data = generate(n_users=6, seed=5)
        results, _ = backtest.run(data, origins=[180], paths=200)
        self.assertEqual(set(results.method), set(backtest.METHODS))
        ml = results[results.method == 'ml'].set_index('user_id')
        uncapped = results[results.method == 'ml_uncapped'].set_index('user_id')
        self.assertTrue((ml.budget <= ml.natural_budget + 1e-9).all())
        self.assertTrue((ml.budget <= uncapped.budget + 1e-9).all())
        # The status quo row replays exactly what the user really spent.
        usual = results[results.method == 'usual']
        self.assertTrue((usual.ran_out == ~usual.natural_ok).all())


if __name__ == '__main__':
    unittest.main()
