export const PRIVATE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

export function teamGateResponse(options: { ready: boolean; error?: boolean; signedIn?: boolean; status?: number }) {
  const { ready, error = false, signedIn = false, status = 503 } = options;
  return new Response(`<!doctype html>
<html lang="th"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>ปิดการเข้าชมชั่วคราว</title>
<meta name="description" content="เดโมนี้ปิดการเข้าชมชั่วคราว เปิดอีกครั้งวันที่ 7 พฤศจิกายน 2569">
<meta property="og:title" content="ปิดการเข้าชมชั่วคราว">
<meta property="og:description" content="เปิดอีกครั้งวันที่ 7 พฤศจิกายน 2569">
<style>*{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;background:#f4f8f6;color:#17332b;font-family:system-ui,sans-serif}main{width:min(100% - 40px,440px);margin:24px 0;padding:36px;border:1px solid #dce7e1;border-radius:24px;background:white}h1{font-size:1.5rem;line-height:1.5;margin:12px 0}p{font-size:.95rem;line-height:1.8;color:#52665d}.tag{font-size:.75rem;font-weight:650;letter-spacing:.06em;color:#33785c}form{margin-top:28px;padding-top:24px;border-top:1px solid #e8eee9}label{display:block;font-weight:600;font-size:.9rem;margin-bottom:10px}input{width:100%;padding:13px 14px;border:1px solid #b9cbc1;border-radius:10px;font:inherit;min-width:0}input:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #86cfa8;outline-offset:3px}button,.button{display:block;width:100%;margin-top:14px;padding:14px;border:0;border-radius:10px;background:#187849;color:#fff;font:inherit;font-weight:600;cursor:pointer;text-align:center;text-decoration:none}.secondary{background:#eaf2ed;color:#28543e}.hint{font-size:.8rem;margin-bottom:0}.error{color:#a52c32;font-size:.85rem}.status{margin-top:24px;padding-top:20px;border-top:1px solid #e8eee9}@media(max-width:380px){main{padding:26px}}</style>
</head><body><main><div class="tag">TEAM PREVIEW</div><h1>ปิดการเข้าชมชั่วคราว</h1><p>เดโมอยู่ระหว่างเตรียมความพร้อม<br>เปิดให้เข้าชมอีกครั้งวันที่ 7 พฤศจิกายน 2569</p>
${signedIn ? '<p class="status">คุณเข้าสู่การเข้าชมสำหรับทีมแล้ว</p><a class="button" href="/">กลับไปดูเดโม</a><form method="post" action="/team-access/logout"><button class="secondary" type="submit">ออกจากการเข้าชมสำหรับทีม</button></form>' : ready ? `<form method="post" action="/team-access"><label for="team-password">รหัสเข้าชมสำหรับทีม</label><input id="team-password" name="password" type="password" autocomplete="current-password" maxlength="128" required${error ? ' aria-invalid="true" aria-describedby="login-error"' : ''}>${error ? '<p class="error" id="login-error" role="alert">เข้าใช้งานไม่สำเร็จ กรุณาตรวจสอบรหัสแล้วลองอีกครั้ง</p>' : ''}<button type="submit">เข้าดูเดโม</button><p class="hint">สำหรับทีมที่มีรหัสเข้าชม · ใช้งานได้ 8 ชั่วโมงต่อครั้ง</p></form>` : '<p class="status">สำหรับทีมงาน กรุณาติดต่อผู้ดูแลเพื่อขอสิทธิ์เข้าชม</p>'}
</main></body></html>`, {
    status,
    headers: {
      ...PRIVATE_HEADERS,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
  });
}
