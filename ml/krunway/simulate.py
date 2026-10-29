"""Monte Carlo cash-flow simulation and the "safe to spend today" budget.

Each path draws when every pending income arrives and how spending fluctuates.
Spending on a path is budget * shape[path, day], so the largest budget that
keeps a path above the floor on every day has a closed form:

    budget_max[path] = min over days of (cash available by that day) / (cumulative shape)

The chance of lasting at budget B is the share of paths with budget_max >= B,
and the budget for a target chance q is the (1 - q) quantile of budget_max.
All budgets share the same draws, so the chance always falls as the budget rises.
"""
from dataclasses import dataclass
from typing import Callable

import numpy as np


@dataclass
class Income:
    expected_offset: int  # days from today; negative when already overdue
    amount: float
    sample_delay: Callable  # (size, min_delay) -> delays in days


@dataclass
class Simulation:
    budget_max: np.ndarray  # (paths,)
    shape: np.ndarray       # (paths, days); spending = budget * shape
    available: np.ndarray   # (paths, days); balance + income - bills - floor, cumulative
    natural_budget: float   # the user's expected daily spending if nothing changes

    def probability(self, budget: float) -> float:
        return float(np.mean(self.budget_max >= budget))

    def budget_for(self, target: float) -> float:
        return max(0.0, float(np.quantile(self.budget_max, 1 - target)))

    def balance_paths(self, budget: float, floor: float = 0.0) -> np.ndarray:
        return self.available + floor - budget * np.cumsum(self.shape, axis=1)


def block_bootstrap(rng, residuals: np.ndarray, paths: int, days: int, block: int) -> np.ndarray:
    """Resample residuals in runs of `block` days so streaks of heavy spending survive."""
    if block <= 1 or len(residuals) < block:
        return rng.choice(residuals, size=(paths, days))
    blocks = -(-days // block)
    starts = rng.integers(0, len(residuals) - block + 1, size=(paths, blocks))
    idx = (starts[..., None] + np.arange(block)).reshape(paths, -1)[:, :days]
    return residuals[idx]


def simulate(rng, balance: float, bills: np.ndarray, incomes, mean_spend: np.ndarray, residuals: np.ndarray,
             paths: int = 4000, block: int = 7, floor: float = 0.0, level_sigma: float = 0.0) -> Simulation:
    days = len(bills)
    inflow = np.zeros((paths, days))
    for income in incomes:
        overdue = max(0, -income.expected_offset)
        arrival = income.expected_offset + income.sample_delay(paths, overdue)
        inside = (arrival >= 0) & (arrival < days)
        np.add.at(inflow, (np.nonzero(inside)[0], arrival[inside].astype(int)), income.amount)

    available = balance + np.cumsum(inflow, axis=1) - np.cumsum(bills) - floor
    pattern = mean_spend / mean_spend.mean()
    shape = pattern * block_bootstrap(rng, residuals, paths, days, block)
    # A heavier or lighter month than usual, mean 1.
    shape *= np.exp(rng.normal(-level_sigma ** 2 / 2, level_sigma, size=(paths, 1)))
    budget_max = np.min(available / np.cumsum(shape, axis=1), axis=1)
    return Simulation(budget_max, shape, available, float(mean_spend.mean()))


def even_split(balance: float, bills: np.ndarray, incomes, floor: float = 0.0) -> float:
    """Baseline (a): everything expected to come in, minus bills, divided evenly over the days."""
    days = len(bills)
    expected = sum(i.amount for i in incomes if i.expected_offset < days)
    return max(0.0, (balance + expected - bills.sum() - floor) / days)


def direct_plan(balance: float, bills: np.ndarray, incomes, floor: float = 0.0) -> float:
    """Baseline (b): plan day by day with every income arriving on its expected date (overdue ones today)."""
    days = len(bills)
    inflow = np.zeros(days)
    for income in incomes:
        if income.expected_offset < days:
            inflow[max(0, income.expected_offset)] += income.amount
    available = balance + np.cumsum(inflow) - np.cumsum(bills) - floor
    return max(0.0, float(np.min(available / np.arange(1, days + 1))))
