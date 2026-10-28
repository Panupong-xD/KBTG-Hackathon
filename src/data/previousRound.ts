import { demoFinance } from '../lib/pocket-saving';

// Illustrative history, not model results or real account transactions.
// The carried amount is already included in the current round's opening balance.
export const previousRoundDemo = {
  period: '1–30 ก.ย. 2569',
  days: 30,
  daysWithinPlan: 22,
  incomeDelayDays: 6,
  adjustedPlanDays: 5,
  carriedAmount: demoFinance.openingAccumulated,
} as const;
