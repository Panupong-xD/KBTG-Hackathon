import { NextRequest, NextResponse } from 'next/server';
import { createTeamSession, DEMO_REOPEN_TIMESTAMP, isDemoPaused, passwordMatches, readTeamPassword, sameOriginPost, TEAM_COOKIE, TEAM_SESSION_SECONDS, teamPassword, validTeamSession } from '@/lib/demo-access';
import { PRIVATE_HEADERS, teamGateResponse } from '@/lib/demo-gate';
import { loginClientKey, loginLimiter } from '@/lib/login-limiter';

export function GET(request: NextRequest) {
  if (!isDemoPaused()) return NextResponse.redirect(new URL('/', request.url), 303);
  const password = teamPassword();
  return teamGateResponse({
    ready: Boolean(password),
    signedIn: validTeamSession(request.cookies.get(TEAM_COOKIE)?.value, password),
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  if (!sameOriginPost(request)) return teamGateResponse({ ready: Boolean(teamPassword()), error: true, status: 403 });
  if (!isDemoPaused()) return NextResponse.redirect(new URL('/', request.url), 303);
  const password = teamPassword();
  if (!password) return teamGateResponse({ ready: false });
  const client = loginClientKey(request.headers);
  const limit = loginLimiter.consume(client);
  if (!limit.allowed) {
    const response = teamGateResponse({ ready: true, error: true, status: 429 });
    response.headers.set('Retry-After', String(limit.retryAfter));
    return response;
  }

  let candidate: string | undefined;
  try {
    candidate = await readTeamPassword(request);
  } catch {
    // Malformed or interrupted bodies fail closed without logging credentials.
  }
  if (candidate === undefined || !passwordMatches(candidate, password)) {
    return teamGateResponse({ ready: true, error: true, status: 401 });
  }
  loginLimiter.reset(client);

  const now = Date.now();
  const token = createTeamSession(password, now);
  const response = NextResponse.redirect(new URL('/', request.url), { status: 303, headers: PRIVATE_HEADERS });
  if (token) response.cookies.set(TEAM_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: Math.min(TEAM_SESSION_SECONDS, Math.floor((DEMO_REOPEN_TIMESTAMP - now) / 1000)),
  });
  return response;
}
