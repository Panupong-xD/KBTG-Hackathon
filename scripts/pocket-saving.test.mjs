import assert from 'node:assert/strict';
import test from 'node:test';
import {initialSavingState, pocketSavingReducer, pocketBalance, pockets, dailySummary} from '../src/lib/pocket-saving.ts';
const total = state => pockets.reduce((sum,pocket)=>sum+pocketBalance(pocket.id,state),0);
const open = (spentToday=250) => pocketSavingReducer(initialSavingState,{type:'open',spentToday});

test('daily surplus accumulates without changing cash or increasing the next budget',()=>{
  const summary=dailySummary(250);
  assert.equal(summary.difference,30);
  assert.equal(summary.accumulated,130);
  assert.equal(summary.suggestedAmount,30);
  assert.equal(summary.futureBudget,280);
  assert.equal(total(initialSavingState),8750);
});
test('cancelling selection never transfers money',()=>{
  const choosing=open();
  assert.equal(choosing.status,'choosing');
  assert.equal(choosing.amount,30);
  assert.equal(total(choosing),total(initialSavingState));
  assert.deepEqual(pocketSavingReducer(choosing,{type:'cancel'}),initialSavingState);
});
test('each supported destination receives one approved transfer, without double-counting accumulation',()=>{
  for(const destination of pockets.filter(pocket=>pocket.id!=='main')){
    const saved=pocketSavingReducer(open(),{type:'confirm',pocketId:destination.id});
    assert.equal(saved.status,'saved');
    assert.equal(pocketBalance(destination.id,saved),destination.balance+30);
    assert.equal(pocketBalance('main',saved),5220);
    assert.equal(total(saved),8750);
    assert.equal(dailySummary(saved.spentToday,saved.amount).accumulated,100);
    assert.equal(pocketSavingReducer(saved,{type:'confirm',pocketId:destination.id}),saved);
    assert.equal(pocketSavingReducer(saved,{type:'open',spentToday:250}),saved);
  }
});
test('overspending uses accumulation first, then spreads only the uncovered amount',()=>{
  const covered=dailySummary(340);
  assert.equal(covered.accumulated,40);
  assert.equal(covered.overspendCovered,60);
  assert.equal(covered.futureBudget,280);
  assert.equal(covered.suggestedAmount,0);
  assert.equal(open(340),initialSavingState);
  const short=dailySummary(500);
  assert.equal(short.accumulated,0);
  assert.ok(Math.abs(short.futureBudget-(280-120/29))<0.00001);
});
test('the 10–20% rule, per-transfer cap and liquidity buffer limit the suggestion',()=>{
  assert.equal(open(0).amount,56);
  assert.equal(dailySummary(224).suggestedAmount,56);
  assert.equal(dailySummary(252).suggestedAmount,28);
  assert.equal(dailySummary(253).suggestedAmount,0);
  assert.equal(open(253),initialSavingState);
  const saved=pocketSavingReducer(open(0),{type:'confirm',pocketId:'emergency'});
  assert.ok(pocketBalance('main',saved)>=1000+11*280);
  assert.equal(pocketBalance('bills',saved),3500);
});
test('invalid confirmations and spending values do not initiate saving',()=>{
  assert.equal(pocketSavingReducer(initialSavingState,{type:'confirm',pocketId:'emergency'}),initialSavingState);
  const choosing=open();
  for(const pocketId of ['main',null,'unknown']) assert.equal(pocketSavingReducer(choosing,{type:'confirm',pocketId}),choosing);
  for(const spent of [-1,NaN,Infinity,5501]) assert.equal(open(spent),initialSavingState);
});
