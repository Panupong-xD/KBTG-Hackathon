import { NextRequest, NextResponse } from 'next/server';
import { isDemoPaused, TEAM_COOKIE, teamPassword, validTeamSession } from './lib/demo-access';
import { PRIVATE_HEADERS, teamGateResponse } from './lib/demo-gate';

// No matcher: the same authentication protects pages, bundles, images and data.
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production' || !isDemoPaused()) return NextResponse.next();

  const password = teamPassword();
  if (request.nextUrl.pathname === '/team-access' || request.nextUrl.pathname === '/team-access/logout' ||
      validTeamSession(request.cookies.get(TEAM_COOKIE)?.value, password)) {
    const response = NextResponse.next();
    for (const [key, value] of Object.entries(PRIVATE_HEADERS)) response.headers.set(key, value);
    return response;
  }

  return teamGateResponse({ ready: Boolean(password) });
}
