// The interface stays at two steps. Income and probability are illustrative inputs.
export const demoFinance = {
  openingBalance: 9000, fixedBills: 3500, hardFloor: 1000,
  openingAccumulated: 100, pendingIncome: 8000, daysUntilIncome: 12,
  daysIncludingToday: 30, spentToday: 250,
  sweepMinRate: 0.1, sweepMaxRate: 0.2,
  sweepCap: 150, illustrativeProbability: 86,
} as const;
export const dailyBudget = 280;
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

// Save first: at the start of the day, offer to move part of today's budget into a Pocket.
// The offer is 10–20% of the budget, rounded up to ฿10, at most ฿150, and only if bills, the
// safety floor and the budget until the next income are still covered.
export function suggestSaving(budget: number = dailyBudget, mainBalance: number = mainPocket.balance) {
  if (!Number.isFinite(budget) || budget <= 0 || !Number.isFinite(mainBalance)) return 0;
  const liquidLimit = mainBalance - demoFinance.hardFloor - budget * demoFinance.daysUntilIncome;
  const amount = Math.min(Math.ceil(budget * demoFinance.sweepMinRate / 10) * 10, budget * demoFinance.sweepMaxRate, demoFinance.sweepCap, liquidLimit);
  return amount >= budget * demoFinance.sweepMinRate ? amount : 0;
}
export const savingOffer = suggestSaving();

export function dailySummary(spentToday: number, saved = 0) {
  const futureDays = demoFinance.daysIncludingToday - 1;
  const budget = dailyBudget - saved;
  const difference = budget - spentToday;
  const accumulated = Math.max(0, demoFinance.openingAccumulated + difference);
  const overspendCovered = Math.min(demoFinance.openingAccumulated, Math.max(0, -difference));
  const shortfall = Math.max(0, -difference - demoFinance.openingAccumulated);
  const futureBudget = Math.max(0, dailyBudget - shortfall / futureDays);
  return {budget, difference, accumulated, overspendCovered, futureDays, futureBudget};
}

type SavingState = {status:'idle'; pocketId:null} | {status:'skipped'; pocketId:null} | {status:'choosing'; pocketId:null; amount:number} | {status:'saved'; pocketId:SavingPocketId; amount:number};
type SavingAction = {type:'open'} | {type:'cancel'} | {type:'skip'} | {type:'undoSkip'} | {type:'confirm'; pocketId:SavingPocketId};
export const initialSavingState: SavingState = {status:'idle', pocketId:null};
export function pocketSavingReducer(state: SavingState, action: SavingAction): SavingState {
  if (action.type === 'open' && (state.status === 'idle' || state.status === 'skipped') && savingOffer > 0) {
    return {status:'choosing', pocketId:null, amount:savingOffer};
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
