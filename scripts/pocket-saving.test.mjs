import assert from 'node:assert/strict';
import test from 'node:test';
import { initialSavingState, pocketSavingReducer, pocketBalance, pockets, savingAmount } from '../src/lib/pocket-saving.ts';

const total = state => pockets.reduce((sum, pocket) => sum + pocketBalance(pocket.id, state), 0);

test('opening and cancelling Pocket selection does not move money', () => {
  const choosing = pocketSavingReducer(initialSavingState, { type: 'open' });
  assert.equal(choosing.status, 'choosing');
  for (const pocket of pockets) assert.equal(pocketBalance(pocket.id, choosing), pocket.balance);
  assert.deepEqual(pocketSavingReducer(choosing, { type: 'cancel' }), initialSavingState);
});

test('confirmation requires an open selection and a valid destination', () => {
  assert.equal(pocketSavingReducer(initialSavingState, { type: 'confirm', pocketId: 'emergency' }), initialSavingState);
  const choosing = pocketSavingReducer(initialSavingState, { type: 'open' });
  for (const pocketId of ['main', null, 'unknown']) {
    assert.equal(pocketSavingReducer(choosing, { type: 'confirm', pocketId }), choosing);
  }
});

test('each destination receives exactly 150 baht from the source without changing the total', () => {
  for (const destination of pockets.filter(pocket => pocket.id !== 'main')) {
    const choosing = pocketSavingReducer(initialSavingState, { type: 'open' });
    const saved = pocketSavingReducer(choosing, { type: 'confirm', pocketId: destination.id });
    assert.equal(saved.status, 'saved');
    assert.equal(saved.pocketId, destination.id);
    assert.equal(pocketBalance(destination.id, saved), destination.balance + savingAmount);
    assert.equal(pocketBalance('main', saved), pocketBalance('main', initialSavingState) - savingAmount);
    assert.equal(total(saved), total(initialSavingState));
    for (const pocket of pockets.filter(pocket => pocket.id !== destination.id && pocket.id !== 'main')) {
      assert.equal(pocketBalance(pocket.id, saved), pocket.balance);
    }
    assert.equal(pocketSavingReducer(saved, { type: 'confirm', pocketId: destination.id }), saved);
    assert.equal(pocketSavingReducer(saved, { type: 'confirm', pocketId: 'savings' }), saved);
    assert.equal(pocketSavingReducer(saved, { type: 'open' }), saved);
    assert.equal(pocketSavingReducer(saved, { type: 'cancel' }), saved);
  }
});
