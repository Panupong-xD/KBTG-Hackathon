import assert from 'node:assert/strict';
import test from 'node:test';
import { randomBytes } from 'node:crypto';
import { createTeamSession, DEMO_REOPEN_LABEL, DEMO_REOPEN_TIMESTAMP, isDemoPaused, passwordMatches, readTeamPassword, sameOriginPost, TEAM_SESSION_SECONDS, teamPassword, validTeamSession } from '../src/lib/demo-access.ts';
import { teamGateResponse } from '../src/lib/demo-gate.ts';

const password = randomBytes(6).toString('base64url');
const now = Date.parse('2026-10-27T12:00:00+07:00');

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

test('the gate date text follows the same reopening timestamp in Bangkok time', async () => {
  assert.equal(DEMO_REOPEN_LABEL, '7 พฤศจิกายน 2569');
  const html = await teamGateResponse({ ready: true }).text();
  assert.equal(html.split(DEMO_REOPEN_LABEL).length - 1, 3);
});

test('missing, malformed and short environment passwords fail closed', () => {
  for (const value of ['', 'short', 'a'.repeat(7), 'a'.repeat(129), password + '\n', password + ' ', password + '\0', password + '\t']) {
    assert.equal(teamPassword(value), undefined);
    assert.equal(createTeamSession(value, now), undefined);
    assert.equal(passwordMatches(value, value), false);
  }
  assert.equal(teamPassword(password), password);
  assert.equal(passwordMatches(password, password), true);
  assert.equal(passwordMatches('wrong', password), false);
  assert.equal(passwordMatches(password, undefined), false);
});

test('eight-character passwords and ordinary symbols retain their exact value', () => {
  assert.equal(password.length, 8);
  assert.equal(teamPassword(password), password);
  const withSymbols = password + '!@#$%^&*()+=';
  assert.equal(teamPassword(withSymbols), withSymbols);
  assert.equal(passwordMatches(withSymbols, withSymbols), true);
  assert.equal(passwordMatches(password, withSymbols), false);
  assert.equal(validTeamSession(createTeamSession(withSymbols, now), withSymbols, now), true);
});

test('session is signed, lasts eight hours and contains no password', () => {
  const token = createTeamSession(password, now);
  assert.equal(token.includes(password), false);
  assert.equal(validTeamSession(token, password, now), true);
  assert.equal(validTeamSession(token, password, now + TEAM_SESSION_SECONDS * 1000 - 1), true);
  assert.equal(validTeamSession(token, password, now + TEAM_SESSION_SECONDS * 1000), false);
  assert.equal(validTeamSession(token, password, now - 1000), false);
});

test('forged, altered, missing and rotated sessions cannot grant access', () => {
  const token = createTeamSession(password, now);
  const parts = token.split('.');
  for (const value of [undefined, '', 'true', token + 'x', 'v2.' + parts.slice(1).join('.'), `v1.${Number(parts[1]) + 1}.${parts[2]}`, `v1.${parts[1]}.${'a'.repeat(43)}`, token.replaceAll('.', '/')]) {
    assert.equal(validTeamSession(value, password, now), false);
  }
  assert.equal(validTeamSession(token, undefined, now), false);
  assert.equal(validTeamSession(token, randomBytes(24).toString('base64url'), now), false);
  assert.equal(validTeamSession(token, password, NaN), false);
});

test('sessions never outlive reopening and cannot be issued afterwards', () => {
  const token = createTeamSession(password, DEMO_REOPEN_TIMESTAMP - 1000);
  assert.equal(validTeamSession(token, password, DEMO_REOPEN_TIMESTAMP - 1), true);
  assert.equal(validTeamSession(token, password, DEMO_REOPEN_TIMESTAMP), false);
  assert.equal(createTeamSession(password, DEMO_REOPEN_TIMESTAMP), undefined);
  assert.equal(createTeamSession(password, NaN), undefined);
});

test('login and logout require same-origin POST, not missing, null or lookalike origins', () => {
  const url = 'https://demo.example/team-access';
  for (const origin of [undefined, 'null', 'https://other.example', 'https://demo.example.evil.test', 'http://demo.example']) {
    assert.equal(sameOriginPost(new Request(url, { method: 'POST', headers: origin ? { origin } : {} })), false);
  }
  assert.equal(sameOriginPost(new Request(url, { method: 'GET', headers: { origin: 'https://demo.example' } })), false);
  assert.equal(sameOriginPost(new Request(url, { method: 'POST', headers: { origin: 'https://demo.example' } })), true);
});

test('the login form preserves same-origin POST metadata for the CSRF check', () => {
  const response = teamGateResponse({ ready: true });
  assert.equal(response.headers.get('referrer-policy'), 'same-origin');
  assert.match(response.headers.get('content-security-policy'), /form-action 'self'/);
  assert.match(response.headers.get('cache-control'), /no-store/);
});

test('password parser bounds request size and rejects other body formats and repeated values', async () => {
  const request = (body, type = 'application/x-www-form-urlencoded') => new Request('https://demo.example/team-access', { method: 'POST', headers: { 'content-type': type }, body });
  assert.equal(await readTeamPassword(request(new URLSearchParams({ password }).toString())), password);
  assert.equal(await readTeamPassword(request('password=one&password=two')), undefined);
  assert.equal(await readTeamPassword(request('password=' + 'a'.repeat(2048))), undefined);
  assert.equal(await readTeamPassword(request(JSON.stringify({ password }), 'application/json')), undefined);
  assert.equal(await readTeamPassword(request('other=value')), undefined);
});
