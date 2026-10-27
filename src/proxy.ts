import { NextResponse } from 'next/server';
import { DEMO_REOPEN_TIMESTAMP, isDemoPaused } from './lib/demo-access';

// No matcher: also block direct static-asset, image and data requests while paused.
export function proxy() {
  if (process.env.NODE_ENV !== 'production' || !isDemoPaused()) {
    return NextResponse.next();
  }

  return new NextResponse(`<!doctype html>
<html lang="th"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>ปิดการเข้าชมชั่วคราว</title>
<meta name="description" content="เดโมนี้ปิดการเข้าชมชั่วคราว เปิดอีกครั้งวันที่ 7 พฤศจิกายน 2569">
<meta property="og:title" content="ปิดการเข้าชมชั่วคราว">
<meta property="og:description" content="เปิดอีกครั้งวันที่ 7 พฤศจิกายน 2569">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f8f6;color:#17332b;font-family:system-ui,sans-serif}main{max-width:32rem;margin:24px;padding:40px;border:1px solid #dce7e1;border-radius:20px;background:white;text-align:center}h1{font-size:1.5rem;line-height:1.5}p{line-height:1.8;color:#52665d}</style>
</head><body><main><h1>ปิดการเข้าชมชั่วคราว</h1><p>เดโมนี้ยังไม่เปิดให้เข้าชมในช่วงนี้<br>กลับมาได้วันที่ 7 พฤศจิกายน 2569</p></main></body></html>`, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store, max-age=0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
      'Retry-After': new Date(DEMO_REOPEN_TIMESTAMP).toUTCString(),
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    },
  });
}
