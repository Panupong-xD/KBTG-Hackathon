// The interface stays at two steps. Income and probability are illustrative inputs.
export const demoFinance = {
  openingBalance: 9000, fixedBills: 3500, hardFloor: 1000,
  openingAccumulated: 100, pendingIncome: 8000, daysUntilIncome: 12,
  daysIncludingToday: 30, spentToday: 250,
  sweepMinRate: 0.1, sweepMaxRate: 0.2,
  sweepCap: 150, illustrativeProbability: 86,
  incomeDelayBuffer: 4,
} as const;
export const pockets = [
  { id: 'main', name: 'กระเป๋าหลัก', kind: 'spending', tone: 'green', balance: demoFinance.openingBalance - demoFinance.fixedBills },
  { id: 'bills', name: 'ค่าใช้จ่ายประจำเดือน', kind: 'spending', tone: 'mint', balance: demoFinance.fixedBills },
  { id: 'travel', name: 'ค่าท่องเที่ยว', kind: 'spending', tone: 'blue', balance: 0 },
  { id: 'emergency', name: 'เงินสำรองฉุกเฉิน', kind: 'saving', tone: 'gold', balance: 0 },
  { id: 'savings', name: 'เงินเก็บ', kind: 'saving', tone: 'gold', balance: 0 },
] as const;
export type PocketId = typeof pockets[number]['id'];
export type SavingPocketId = Exclude<PocketId, 'main'>;
const mainPocket = pockets.find(pocket => pocket.id === 'main')!;
export const formatDemoAmount = (amount: number) => amount.toLocaleString('en-US');
export const formatPocketBalance = (amount: number) => amount.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});

// The plan the user can correct in "ปรับแต่ง". The system guesses it from history; the user has the
// last word. Days are days of October 2569 and the demo's today is the 1st, so the 30-day window
// is 1–30 Oct and the wage usually arrives on the 13th (in 12 days).
export const demoToday = 1;
export const demoMonth = 10;
export const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'] as const;
export const formatDemoDay = (day: number) => `${day} ${monthNames[demoMonth - 1]}`;
export const savingGoals = [
  { id: 'low', label: 'น้อย', rate: demoFinance.sweepMinRate },
  { id: 'medium', label: 'กลาง', rate: 0.15 },
  { id: 'high', label: 'มาก', rate: demoFinance.sweepMaxRate },
] as const;
export type SavingGoal = typeof savingGoals[number]['id'];
export type PlanBill = {
  id: string; name: string; amount: number; dueDay: number;
  repeat: 'monthly' | 'yearly'; dueMonth: number;
  // Already set aside in the bills Pocket, so it is not taken from the main Pocket again.
  reserved: number;
  // A bill the system found in past transactions. It counts only once the user confirms it.
  guessed: boolean;
};
export type MoneyPlan = {
  incomeDay: number;
  extraIncome: { name: string; amount: number; day: number; certain: boolean };
  bills: PlanBill[];
  goal: SavingGoal;
};
export const defaultPlan: MoneyPlan = {
  incomeDay: demoToday + demoFinance.daysUntilIncome,
  extraIncome: { name: 'งานเสริม', amount: 1500, day: 8, certain: false },
  bills: [
    { id: 'rent', name: 'ค่าห้อง', amount: demoFinance.fixedBills, dueDay: 5, repeat: 'monthly', dueMonth: demoMonth, reserved: demoFinance.fixedBills, guessed: false },
    { id: 'phone', name: 'ค่าโทรศัพท์', amount: 499, dueDay: 10, repeat: 'monthly', dueMonth: demoMonth, reserved: 0, guessed: true },
  ],
  goal: 'low',
};
export const samePlan = (a: MoneyPlan, b: MoneyPlan) => JSON.stringify(a) === JSON.stringify(b);
const billDueInWindow = (bill: PlanBill) => !bill.guessed && (bill.repeat === 'monthly' || bill.dueMonth === demoMonth) && bill.dueDay >= demoToday;

// A simple stand-in for the forecast: keep the safety floor, pay bills that are not set aside yet,
// count extra income only when the user marks it certain, and do not count the wage until it
// arrives. The wage may be late by incomeDelayBuffer days, so cash must last until then. The budget
// is the largest same-every-day amount that never dips below the floor, rounded down to ฿10.
export function forecastPlan(plan: MoneyPlan) {
  const daysUntilIncome = Math.max(1, plan.incomeDay - demoToday);
  const planDays = daysUntilIncome + demoFinance.incomeDelayBuffer;
  const lastDay = demoToday + planDays - 1;
  const usable = mainPocket.balance - demoFinance.hardFloor;
  const billsBy = (day: number) => plan.bills.filter(bill => billDueInWindow(bill) && bill.dueDay <= day).reduce((sum, bill) => sum + Math.max(0, bill.amount - bill.reserved), 0);
  const extraBy = (day: number) => plan.extraIncome.certain && plan.extraIncome.day <= day ? plan.extraIncome.amount : 0;
  let binding = { day: lastDay, perDay: Infinity };
  for (let day = demoToday; day <= lastDay; day++) {
    const perDay = (usable - billsBy(day) + extraBy(day)) / (day - demoToday + 1);
    if (perDay < binding.perDay) binding = { day, perDay };
  }
  const days = binding.day - demoToday + 1;
  const unreservedBills = billsBy(binding.day);
  const certainIncome = extraBy(binding.day);
  const available = usable - unreservedBills + certainIncome;
  const budget = Math.max(0, Math.floor(available / days / 10) * 10);
  return { budget, daysUntilIncome, planDays, lastDay, usable, unreservedBills, certainIncome, available, days, bindingDay: binding.day };
}
export type PlanForecast = ReturnType<typeof forecastPlan>;
export const dailyBudget = forecastPlan(defaultPlan).budget;

// Save first: at the start of the day, offer to move part of today's budget into a Pocket.
// The offer is the goal's share of the budget (10–20%) in ฿10 steps, at most ฿150, and only if
// bills, the safety floor and the budget until the next income are still covered.
export function suggestSaving(budget: number = dailyBudget, mainBalance: number = mainPocket.balance, { rate = demoFinance.sweepMinRate, daysUntilIncome = demoFinance.daysUntilIncome }: { rate?: number; daysUntilIncome?: number } = {}) {
  if (!Number.isFinite(budget) || budget <= 0 || !Number.isFinite(mainBalance)) return 0;
  const liquidLimit = mainBalance - demoFinance.hardFloor - budget * daysUntilIncome;
  const least = Math.ceil(budget * demoFinance.sweepMinRate / 10) * 10;
  const most = Math.max(least, Math.floor(budget * demoFinance.sweepMaxRate / 10) * 10);
  const target = Math.max(least, Math.round(budget * Math.min(rate, demoFinance.sweepMaxRate) / 10) * 10);
  const amount = Math.min(target, most, budget * demoFinance.sweepMaxRate, demoFinance.sweepCap, liquidLimit);
  return amount >= budget * demoFinance.sweepMinRate ? amount : 0;
}
export const savingOffer = suggestSaving();
export function planSavingOffer(plan: MoneyPlan, forecast: PlanForecast = forecastPlan(plan)) {
  const rate = savingGoals.find(goal => goal.id === plan.goal)!.rate;
  // Check liquidity against the same cash the budget uses: after unreserved bills, with certain extra income.
  return suggestSaving(forecast.budget, forecast.available + demoFinance.hardFloor, { rate, daysUntilIncome: forecast.daysUntilIncome });
}

export function dailySummary(spentToday: number, saved = 0, plannedBudget: number = dailyBudget) {
  const futureDays = demoFinance.daysIncludingToday - 1;
  const budget = plannedBudget - saved;
  const difference = budget - spentToday;
  const accumulated = Math.max(0, demoFinance.openingAccumulated + difference);
  const overspendCovered = Math.min(demoFinance.openingAccumulated, Math.max(0, -difference));
  const shortfall = Math.max(0, -difference - demoFinance.openingAccumulated);
  const futureBudget = Math.max(0, plannedBudget - shortfall / futureDays);
  return {budget, difference, accumulated, overspendCovered, futureDays, futureBudget};
}

type SavingState = {status:'idle'; pocketId:null} | {status:'skipped'; pocketId:null} | {status:'choosing'; pocketId:null; amount:number} | {status:'saved'; pocketId:SavingPocketId; amount:number};
type SavingAction = {type:'open'; amount?:number} | {type:'cancel'} | {type:'skip'} | {type:'undoSkip'} | {type:'confirm'; pocketId:SavingPocketId};
export const initialSavingState: SavingState = {status:'idle', pocketId:null};
export function pocketSavingReducer(state: SavingState, action: SavingAction): SavingState {
  if (action.type === 'open' && (state.status === 'idle' || state.status === 'skipped') && (action.amount ?? savingOffer) > 0) {
    return {status:'choosing', pocketId:null, amount:action.amount ?? savingOffer};
  }
  if (action.type === 'cancel' && state.status === 'choosing') return initialSavingState;
  // Not saving moves no money: the whole budget stays spendable in the main Pocket.
  if (action.type === 'skip' && state.status === 'idle') return {status:'skipped', pocketId:null};
  if (action.type === 'undoSkip' && state.status === 'skipped') return initialSavingState;
  if (action.type === 'confirm' && state.status === 'choosing' && pockets.some(pocket => pocket.id !== 'main' && pocket.id === action.pocketId)) {
    return {status:'saved', pocketId:action.pocketId, amount:state.amount};
  }
  return state;
}
export const savedAmount = (state: SavingState) => state.status === 'saved' ? state.amount : 0;
export function pocketBalance(pocketId: PocketId, state: SavingState, spentToday: number = demoFinance.spentToday): number {
  const opening = pockets.find(pocket => pocket.id === pocketId)!.balance - (pocketId === 'main' ? spentToday : 0);
  if (state.status !== 'saved') return opening;
  return opening + (pocketId === state.pocketId ? state.amount : pocketId === 'main' ? -state.amount : 0);
}

export const demoSavingExample = {
  offer: savingOffer,
  budgetAfterSaving: dailyBudget - savingOffer,
  withoutSaving: dailySummary(demoFinance.spentToday),
  withSaving: dailySummary(demoFinance.spentToday, savingOffer),
};
