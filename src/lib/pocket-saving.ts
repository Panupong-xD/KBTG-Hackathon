// The interface stays at two steps. Income and probability are illustrative inputs.
export const demoFinance = {
  openingBalance: 9000, fixedBills: 3500, hardFloor: 1000,
  openingAccumulated: 100, pendingIncome: 8000, daysUntilIncome: 12,
  daysIncludingToday: 30, spentToday: 230,
  sweepCap: 150, illustrativeProbability: 86,
} as const;
export const dailyBudget = 280;
export const pockets = [
  { id: 'main', name: 'กระเป๋าหลัก', kind: 'spending', tone: 'green', balance: 5500 },
  { id: 'bills', name: 'ค่าใช้จ่ายประจำเดือน', kind: 'spending', tone: 'mint', balance: 3500 },
  { id: 'travel', name: 'ค่าท่องเที่ยว', kind: 'spending', tone: 'blue', balance: 0 },
  { id: 'emergency', name: 'เงินสำรองฉุกเฉิน', kind: 'saving', tone: 'gold', balance: 0 },
  { id: 'savings', name: 'เงินเก็บ', kind: 'saving', tone: 'gold', balance: 0 },
] as const;
export type PocketId = typeof pockets[number]['id'];
export type SavingPocketId = Exclude<PocketId, 'main'>;
export const formatPocketBalance = (amount: number) => amount.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});

export function dailySummary(spentToday: number, allocated = 0) {
  const futureDays = demoFinance.daysIncludingToday - 1;
  const difference = dailyBudget - spentToday;
  const accumulatedBeforeSaving = Math.max(0, demoFinance.openingAccumulated + difference);
  const accumulated = Math.max(0, accumulatedBeforeSaving - allocated);
  const overspendCovered = Math.min(demoFinance.openingAccumulated, Math.max(0, -difference));
  const shortfall = Math.max(0, -difference - demoFinance.openingAccumulated);
  const futureBudget = Math.max(0, dailyBudget - shortfall / futureDays);
  const protectedFutureBudget = dailyBudget * (demoFinance.daysUntilIncome - 1);
  const liquidLimit = pockets[0].balance - spentToday - allocated - demoFinance.hardFloor - protectedFutureBudget;
  const validSpending = Number.isFinite(spentToday) && spentToday >= 0;
  const suggestedAmount = validSpending ? Math.max(0, Math.min(demoFinance.sweepCap, difference, accumulated, liquidLimit)) : 0;
  return {difference, accumulated, overspendCovered, futureDays, futureBudget, suggestedAmount};
}

type SavingState = {status:'idle'; pocketId:null} | {status:'choosing'; pocketId:null; amount:number; spentToday:number} | {status:'saved'; pocketId:SavingPocketId; amount:number; spentToday:number};
type SavingAction = {type:'open'; spentToday:number} | {type:'cancel'} | {type:'confirm'; pocketId:SavingPocketId};
export const initialSavingState: SavingState = {status:'idle', pocketId:null};
export function pocketSavingReducer(state: SavingState, action: SavingAction): SavingState {
  if (action.type === 'open' && state.status === 'idle') {
    const {suggestedAmount} = dailySummary(action.spentToday);
    if (suggestedAmount > 0) return {status:'choosing', pocketId:null, amount:suggestedAmount, spentToday:action.spentToday};
  }
  if (action.type === 'cancel' && state.status === 'choosing') return initialSavingState;
  if (action.type === 'confirm' && state.status === 'choosing' && pockets.some(pocket => pocket.id !== 'main' && pocket.id === action.pocketId)) {
    return {status:'saved', pocketId:action.pocketId, amount:state.amount, spentToday:state.spentToday};
  }
  return state;
}
export function pocketBalance(pocketId: PocketId, state: SavingState, spentToday: number = demoFinance.spentToday): number {
  const spending = state.status === 'idle' ? spentToday : state.spentToday;
  const opening = pockets.find(pocket => pocket.id === pocketId)!.balance - (pocketId === 'main' ? spending : 0);
  if (state.status !== 'saved') return opening;
  return opening + (pocketId === state.pocketId ? state.amount : pocketId === 'main' ? -state.amount : 0);
}
