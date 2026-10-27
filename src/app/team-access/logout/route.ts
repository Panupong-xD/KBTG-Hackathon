import { NextRequest, NextResponse } from 'next/server';
import { sameOriginPost, TEAM_COOKIE } from '@/lib/demo-access';
import { PRIVATE_HEADERS } from '@/lib/demo-gate';

export function POST(request: NextRequest) {
  if (!sameOriginPost(request)) return new Response('Forbidden', { status: 403, headers: PRIVATE_HEADERS });
  const response = NextResponse.redirect(new URL('/', request.url), { status: 303, headers: PRIVATE_HEADERS });
  response.cookies.set(TEAM_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 });
  return response;
}
