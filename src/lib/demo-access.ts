import { DEMO_CLOSE_TIMESTAMP, DEMO_REOPEN_TIMESTAMP } from './demo-schedule.mjs';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

// Server-only access gate. Never import this module into a client component.
export { DEMO_CLOSE_AT, DEMO_CLOSE_TIMESTAMP, DEMO_LAST_DAY_LABEL, DEMO_REOPEN_AT, DEMO_REOPEN_TIMESTAMP, DEMO_REOPEN_LABEL, isDemoEnded } from './demo-schedule.mjs';
export const TEAM_COOKIE = '__Host-runway_team';
export const TEAM_SESSION_SECONDS = 8 * 60 * 60;

export function isDemoPaused(now = Date.now()) {
  return !Number.isFinite(now) || now < DEMO_REOPEN_TIMESTAMP || now >= DEMO_CLOSE_TIMESTAMP;
}

// Unix seconds when a session issued at `now` ends: eight hours, cut short at reopening.
export function teamSessionExpiry(now: number) {
  const expires = Math.floor(now / 1000) + TEAM_SESSION_SECONDS;
  return now < DEMO_REOPEN_TIMESTAMP ? Math.min(expires, DEMO_REOPEN_TIMESTAMP / 1000) : expires;
}

// The team chose an easy-to-remember password for this temporary preview; no fallback.
export function teamPassword(value = process.env.DEMO_TEAM_PASSWORD) {
  return value && value.length >= 8 && value.length <= 128 && value === value.trim() &&
    !/[\u0000-\u001f\u007f]/.test(value) ? value : undefined;
}

export function passwordMatches(candidate: string, password: string | undefined) {
  if (!password || !teamPassword(password) || candidate.length > 128) return false;
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(candidate), digest(password));
}

function signature(payload: string, password: string) {
  return createHmac('sha256', password).update(`runway-team-session:${payload}`).digest('base64url');
}

export function createTeamSession(password: string, now = Date.now()) {
  if (!teamPassword(password) || !Number.isFinite(now) || !isDemoPaused(now)) return undefined;
  const payload = `v1.${teamSessionExpiry(now)}`;
  return `${payload}.${signature(payload, password)}`;
}

export function validTeamSession(token: string | undefined, password: string | undefined, now = Date.now()) {
  if (!password || !teamPassword(password) || !token || !Number.isFinite(now)) return false;
  const match = /^v1\.([0-9]{10})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return false;
  const expires = Number(match[1]);
  const seconds = Math.floor(now / 1000);
  if (expires <= seconds || expires > seconds + TEAM_SESSION_SECONDS) return false;
  // No session is ever issued during the public window, so none can end inside it.
  if (expires > DEMO_REOPEN_TIMESTAMP / 1000 && expires <= DEMO_CLOSE_TIMESTAMP / 1000) return false;
  const expected = signature(`v1.${expires}`, password);
  return timingSafeEqual(Buffer.from(match[2]), Buffer.from(expected));
}

export function sameOriginPost(request: Request) {
  return request.method === 'POST' && request.headers.get('origin') === new URL(request.url).origin;
}

export async function readTeamPassword(request: Request) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/x-www-form-urlencoded') return undefined;
  const reader = request.body?.getReader();
  if (!reader) return undefined;
  let body = '';
  let size = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) {
        await reader.cancel();
        return undefined;
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const values = new URLSearchParams(body).getAll('password');
    return values.length === 1 ? values[0] : undefined;
  } finally {
    reader.releaseLock();
  }
}
