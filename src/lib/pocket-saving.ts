export const pockets = [
  { id: 'main', name: 'กระเป๋าหลัก', kind: 'spending', tone: 'green', balance: 7840 },
  { id: 'bills', name: 'ค่าใช้จ่ายประจำเดือน', kind: 'spending', tone: 'mint', balance: 7160 },
  { id: 'travel', name: 'ค่าท่องเที่ยว', kind: 'spending', tone: 'blue', balance: 0 },
  { id: 'emergency', name: 'เงินสำรองฉุกเฉิน', kind: 'saving', tone: 'gold', balance: 0 },
  { id: 'savings', name: 'เงินเก็บ', kind: 'saving', tone: 'gold', balance: 0 },
] as const;

export type PocketId = typeof pockets[number]['id'];
export type SavingPocketId = Exclude<PocketId, 'main'>;
export const savingAmount = 150;
export const formatPocketBalance = (amount: number) => amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type SavingState = { status: 'idle' | 'choosing'; pocketId: null } | { status: 'saved'; pocketId: SavingPocketId };
type SavingAction = { type: 'open' | 'cancel' } | { type: 'confirm'; pocketId: SavingPocketId };
export const initialSavingState: SavingState = { status: 'idle', pocketId: null };

export function pocketSavingReducer(state: SavingState, action: SavingAction): SavingState {
  if (action.type === 'open' && state.status === 'idle') return { status: 'choosing', pocketId: null };
  if (action.type === 'cancel' && state.status === 'choosing') return initialSavingState;
  if (action.type === 'confirm' && state.status === 'choosing' && pockets.some(pocket => pocket.id !== 'main' && pocket.id === action.pocketId)) {
    return { status: 'saved', pocketId: action.pocketId };
  }
  return state;
}

export function pocketBalance(pocketId: PocketId, state: SavingState): number {
  const balance = pockets.find(pocket => pocket.id === pocketId)!.balance;
  if (state.status !== 'saved') return balance;
  return balance + (pocketId === state.pocketId ? savingAmount : pocketId === 'main' ? -savingAmount : 0);
}
