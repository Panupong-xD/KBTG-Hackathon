"""Synthetic bank data. No real customer data is used.

Patterns are built in on purpose (weekday effect, spending after payday, a
"mood" that lasts several days, occasional big purchases, clients who pay
late), so results show that the pipeline works, not that it beats a baseline
on real data.
"""
from dataclasses import dataclass
from pathlib import Path

import numpy as np
import pandas as pd

DAYS = 270
PERSONAS = ('salaried', 'freelancer', 'side_gig')
WEEKDAY = np.array([0.95, 0.9, 0.95, 1.0, 1.25, 1.35, 1.1])  # Mon..Sun spending multiplier


@dataclass
class Dataset:
    users: pd.DataFrame         # user_id, persona, base_spend, opening_balance
    transactions: pd.DataFrame  # user_id, day, direction ('in'/'out'), merchant, amount
    invoices: pd.DataFrame      # user_id, payer, known_day, expected_day, actual_day, amount

    def user(self, user_id):
        """One user's transactions, invoices and opening balance."""
        return (self.transactions[self.transactions.user_id == user_id],
                self.invoices[self.invoices.user_id == user_id],
                float(self.users.opening_balance[user_id]))

    def daily_balance(self) -> pd.DataFrame:
        """One row per user-day: net flow and end-of-day balance."""
        tx = self.transactions
        signed = tx.amount.where(tx.direction == 'in', -tx.amount)
        net = signed.groupby([tx.user_id, tx.day]).sum()
        grid = pd.MultiIndex.from_product([self.users.user_id, range(DAYS)], names=['user_id', 'day'])
        frame = net.reindex(grid, fill_value=0.0).rename('net').reset_index()
        opening = self.users.set_index('user_id').opening_balance
        frame['balance'] = frame.groupby('user_id').net.cumsum() + frame.user_id.map(opening)
        return frame

    def save_csv(self, folder: Path) -> None:
        folder.mkdir(parents=True, exist_ok=True)
        self.users.round(2).to_csv(folder / 'users.csv', index=False)
        self.transactions.to_csv(folder / 'transactions.csv', index=False)
        self.invoices.to_csv(folder / 'invoices.csv', index=False)
        self.daily_balance().round(2).to_csv(folder / 'daily_balance.csv', index=False)


def _invoice_stream(rng, payer, amount, cadence, on_time, first_day, salary=False):
    """Pay dates from one payer. `known_day` is when the user could enter it as pending income."""
    rows, day = [], first_day
    while day < DAYS + 60:
        late = rng.random() > on_time
        if salary:
            delay, lead, paid = (int(rng.integers(1, 4)) if late else 0), 35, amount
        else:
            delay = (int(rng.integers(3, 8)) if rng.random() < 0.7 else int(rng.integers(10, 21))) if late else 0
            lead, paid = int(rng.integers(30, 46)), float(round(amount * rng.lognormal(0, 0.2), -1))
        rows.append(dict(payer=payer, known_day=day - lead, expected_day=day, actual_day=day + delay, amount=paid))
        day += 30 if salary else int(cadence * rng.uniform(0.7, 1.3))
    return rows


def _income_plan(rng, persona):
    rows = []
    if persona in ('salaried', 'side_gig'):
        salary = float(round(rng.uniform(18000, 30000) if persona == 'salaried' else rng.uniform(14000, 20000), -2))
        rows += _invoice_stream(rng, 'EMPLOYER', salary, 30, 0.97, 25, salary=True)
    n_clients = {'salaried': 0, 'freelancer': int(rng.integers(2, 4)), 'side_gig': 1}[persona]
    for c in range(n_clients):
        on_time = rng.choice([0.85, 0.6, 0.35])
        amount = rng.uniform(4000, 12000) if persona == 'freelancer' else rng.uniform(2000, 6000)
        cadence = rng.uniform(20, 40) if persona == 'freelancer' else rng.uniform(30, 60)
        first_day = int(rng.integers(3, 30))
        rows += _invoice_stream(rng, f'CLIENT_{c}', amount, cadence, on_time, first_day)
    return rows


def _bill_plan(rng):
    """(merchant, amount, day of the 30-day cycle)"""
    bills = [('LANDLORD', float(round(rng.uniform(3000, 6000), -2)), int(rng.integers(1, 6))),
             ('TELCO', float(rng.choice([299, 399, 599])), 15)]
    if rng.random() < 0.4:
        bills.append(('PAYLATER', float(round(rng.uniform(500, 2000), -1)), 10))
    return bills


def generate(n_users=300, seed=7) -> Dataset:
    rng = np.random.default_rng(seed)
    users, tx, invoices = [], [], []
    for uid in range(n_users):
        persona = PERSONAS[uid % 3]
        base = rng.uniform(220, 420)
        balance = float(round(rng.uniform(2000, 12000), -2))
        users.append(dict(user_id=uid, persona=persona, base_spend=base, opening_balance=balance))

        plan = _income_plan(rng, persona)
        invoices += [dict(user_id=uid, **row) for row in plan]
        arrivals = {}
        for row in plan:
            arrivals.setdefault(row['actual_day'], []).append(row)
        bills = _bill_plan(rng)

        mood, days_since_income = 0.0, 10
        for day in range(DAYS):
            for row in arrivals.get(day, []):
                balance += row['amount']
                days_since_income = 0
                tx.append(dict(user_id=uid, day=day, direction='in', merchant=row['payer'], amount=row['amount']))
            for merchant, amount, due in bills:
                if day % 30 == due:
                    balance -= amount
                    tx.append(dict(user_id=uid, day=day, direction='out', merchant=merchant, amount=amount))

            mood = 0.5 * mood + rng.normal(0, 0.25)
            mult = WEEKDAY[day % 7] * (1 + 0.35 * np.exp(-days_since_income / 3)) * np.exp(mood - 0.04)
            pressure = max(0.4, min(1.0, balance / (5 * base)))  # people tighten up when money runs low
            spend = float(round(base * mult * pressure * rng.lognormal(-0.1, 0.45)))
            balance -= spend
            tx.append(dict(user_id=uid, day=day, direction='out', merchant='DAILY', amount=spend))
            if rng.random() < 0.015:
                lump = float(round(rng.uniform(1500, 5000), -1))
                balance -= lump
                tx.append(dict(user_id=uid, day=day, direction='out', merchant='SHOP', amount=lump))
            days_since_income += 1

    return Dataset(pd.DataFrame(users), pd.DataFrame(tx), pd.DataFrame(invoices))
