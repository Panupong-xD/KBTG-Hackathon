import assert from 'node:assert/strict';
import test from 'node:test';
import { createLoginLimiter, loginClientKey } from '../src/lib/login-limiter.ts';

test('repeated login attempts are blocked until the window expires', () => {
  const limiter = createLoginLimiter({ maxAttempts: 2, windowMs: 60_000 });
  assert.equal(limiter.consume('client', 0).allowed, true);
  assert.equal(limiter.consume('client', 1).allowed, true);
  assert.deepEqual(limiter.consume('client', 2), { allowed: false, retryAfter: 60 });
  assert.equal(limiter.consume('client', 59_999).allowed, false);
  assert.equal(limiter.consume('client', 60_000).allowed, true);
});

test('separate clients retain separate limits and successful login can reset one client', () => {
  const limiter = createLoginLimiter({ maxAttempts: 1 });
  limiter.consume('one', 0);
  assert.equal(limiter.consume('one', 1).allowed, false);
  assert.equal(limiter.consume('two', 1).allowed, true);
  limiter.reset('one');
  assert.equal(limiter.consume('one', 2).allowed, true);
  assert.equal(limiter.consume('two', 2).allowed, false);
});

test('many new keys share a bounded overflow bucket rather than evicting active limits', () => {
  const limiter = createLoginLimiter({ maxAttempts: 1, maxKeys: 1 });
  limiter.consume('one', 0);
  assert.equal(limiter.consume('two', 1).allowed, true);
  assert.equal(limiter.consume('three', 2).allowed, false);
  assert.equal(limiter.consume('one', 2).allowed, false);
});

test('untrusted forwarded IP headers cannot create new client identities', () => {
  const first = new Headers({ 'x-forwarded-for': '192.0.2.1' });
  const second = new Headers({ 'x-forwarded-for': '192.0.2.2' });
  assert.equal(loginClientKey(first, false), loginClientKey(second, false));
  assert.notEqual(loginClientKey(first, true), loginClientKey(second, true));
  assert.equal(loginClientKey(new Headers({ 'x-forwarded-for': 'fake' }), true), loginClientKey(new Headers(), true));
  assert.equal(loginClientKey(first, true).includes('192.0.2.1'), false);
});
