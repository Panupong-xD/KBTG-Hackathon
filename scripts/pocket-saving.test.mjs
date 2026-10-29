import assert from 'node:assert/strict';
import test from 'node:test';
import {initialSavingState, pocketSavingReducer, pocketBalance, pockets, dailySummary, savedAmount, savingOffer, suggestSaving} from '../src/lib/pocket-saving.ts';
const total = state => pockets.reduce((sum,pocket)=>sum+pocketBalance(pocket.id,state),0);
const open = (state=initialSavingState) => pocketSavingReducer(state,{type:'open'});

test('the save-first offer is shown before spending, from the daily budget',()=>{
  assert.equal(savingOffer,30);
  const before=dailySummary(250);
  assert.equal(before.budget,280);
  assert.equal(before.difference,30);
  assert.equal(before.accumulated,130);
  assert.equal(total(initialSavingState),8750);
});
test('saving lowers today\'s budget by the saved amount and keeps the account total',()=>{
  for(const destination of pockets.filter(pocket=>pocket.id!=='main')){
    const saved=pocketSavingReducer(open(),{type:'confirm',pocketId:destination.id});
    assert.equal(saved.status,'saved');
    assert.equal(savedAmount(saved),30);
    assert.equal(pocketBalance(destination.id,saved),destination.balance+30);
    assert.equal(pocketBalance('main',saved),5220);
    assert.equal(total(saved),8750);
    const after=dailySummary(250,savedAmount(saved));
    assert.equal(after.budget,250);
    assert.equal(after.difference,0);
    assert.equal(after.accumulated,100);
    assert.equal(pocketSavingReducer(saved,{type:'confirm',pocketId:destination.id}),saved);
    assert.equal(open(saved),saved);
  }
});
test('not saving or cancelling never transfers money, and the user can change their mind',()=>{
  const choosing=open();
  assert.equal(choosing.status,'choosing');
  assert.equal(choosing.amount,30);
  assert.equal(total(choosing),total(initialSavingState));
  assert.deepEqual(pocketSavingReducer(choosing,{type:'cancel'}),initialSavingState);
  const skipped=pocketSavingReducer(initialSavingState,{type:'skip'});
  assert.equal(skipped.status,'skipped');
  assert.equal(savedAmount(skipped),0);
  assert.equal(pocketBalance('main',skipped),pocketBalance('main',initialSavingState));
  assert.equal(open(skipped).status,'choosing');
  assert.deepEqual(pocketSavingReducer(skipped,{type:'undoSkip'}),initialSavingState);
});
test('the 10–20% rule, per-day cap and liquidity buffer limit the offer',()=>{
  assert.equal(suggestSaving(280),30);
  assert.equal(suggestSaving(500,1e6),50);
  assert.equal(suggestSaving(1500,1e6),150);
  assert.equal(suggestSaving(1600,1e6),0); // the ฿150 cap is below 10% of the budget
  assert.equal(suggestSaving(280,1000+12*280),0); // nothing left after the floor and the budget until income
  assert.equal(suggestSaving(280,1000+12*280+30),30);
  const saved=pocketSavingReducer(open(),{type:'confirm',pocketId:'emergency'});
  assert.ok(pocketBalance('main',saved,0)>=1000+12*250);
  assert.equal(pocketBalance('bills',saved),3500);
});
test('overspending uses accumulation first, then spreads only the uncovered amount',()=>{
  const covered=dailySummary(340);
  assert.equal(covered.accumulated,40);
  assert.equal(covered.overspendCovered,60);
  assert.equal(covered.futureBudget,280);
  const short=dailySummary(500);
  assert.equal(short.accumulated,0);
  assert.ok(Math.abs(short.futureBudget-(280-120/29))<0.00001);
});
test('invalid confirmations and inputs do not initiate saving',()=>{
  assert.equal(pocketSavingReducer(initialSavingState,{type:'confirm',pocketId:'emergency'}),initialSavingState);
  const choosing=open();
  for(const pocketId of ['main',null,'unknown']) assert.equal(pocketSavingReducer(choosing,{type:'confirm',pocketId}),choosing);
  for(const budget of [-1,0,NaN,Infinity]) assert.equal(suggestSaving(budget),0);
  assert.equal(pocketSavingReducer(choosing,{type:'skip'}),choosing);
});
