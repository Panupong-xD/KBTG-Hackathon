import assert from 'node:assert/strict';
import test from 'node:test';
import { DEMO_REOPEN_TIMESTAMP, isDemoPaused } from '../src/lib/demo-access.ts';

test('the production pause ends at midnight on 7 November in Bangkok', () => {
  assert.equal(new Date(DEMO_REOPEN_TIMESTAMP).toISOString(), '2026-11-06T17:00:00.000Z');
  assert.equal(isDemoPaused(Date.parse('2026-10-27T12:00:00+07:00')), true);
  assert.equal(isDemoPaused(DEMO_REOPEN_TIMESTAMP - 1), true);
  assert.equal(isDemoPaused(DEMO_REOPEN_TIMESTAMP), false);
  assert.equal(isDemoPaused(DEMO_REOPEN_TIMESTAMP + 1), false);
});

test('an invalid clock cannot open the demo', () => {
  assert.equal(isDemoPaused(NaN), true);
  assert.equal(isDemoPaused(Infinity), true);
});
