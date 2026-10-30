// The public demo is open only for pitch day: [reopen, close) in Bangkok time.
export const DEMO_REOPEN_AT = '2026-11-07T00:00:00+07:00';
export const DEMO_REOPEN_TIMESTAMP = Date.parse(DEMO_REOPEN_AT);
export const DEMO_CLOSE_AT = '2026-11-08T00:00:00+07:00';
export const DEMO_CLOSE_TIMESTAMP = Date.parse(DEMO_CLOSE_AT);

const bangkokDate = new Intl.DateTimeFormat('th-TH', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Bangkok',
});
export const DEMO_REOPEN_LABEL = bangkokDate.format(new Date(DEMO_REOPEN_TIMESTAMP));
// The last public day, i.e. the day before the close instant.
export const DEMO_LAST_DAY_LABEL = bangkokDate.format(new Date(DEMO_CLOSE_TIMESTAMP - 1));

export function isDemoEnded(now = Date.now()) {
  return Number.isFinite(now) && now >= DEMO_CLOSE_TIMESTAMP;
}
