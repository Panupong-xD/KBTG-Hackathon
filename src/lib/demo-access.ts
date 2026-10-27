import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

// Server-only access gate. Never import this module into a client component.
export const DEMO_REOPEN_AT = '2026-11-07T00:00:00+07:00';
export const DEMO_REOPEN_TIMESTAMP = Date.parse(DEMO_REOPEN_AT);
export const TEAM_COOKIE = '__Host-runway_team';
export const TEAM_SESSION_SECONDS = 8 * 60 * 60;

export function isDemoPaused(now = Date.now()) {
  return !Number.isFinite(now) || now < DEMO_REOPEN_TIMESTAMP;
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
  const expires = Math.min(Math.floor(now / 1000) + TEAM_SESSION_SECONDS, DEMO_REOPEN_TIMESTAMP / 1000);
  const payload = `v1.${expires}`;
  return `${payload}.${signature(payload, password)}`;
}

export function validTeamSession(token: string | undefined, password: string | undefined, now = Date.now()) {
  if (!password || !teamPassword(password) || !token || !Number.isFinite(now)) return false;
  const match = /^v1\.([0-9]{10})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return false;
  const expires = Number(match[1]);
  const seconds = Math.floor(now / 1000);
  if (expires <= seconds || expires > seconds + TEAM_SESSION_SECONDS || expires > DEMO_REOPEN_TIMESTAMP / 1000) return false;
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
