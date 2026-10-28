export const DEMO_REOPEN_AT = '2026-11-07T00:00:00+07:00';
export const DEMO_REOPEN_TIMESTAMP = Date.parse(DEMO_REOPEN_AT);
export const DEMO_REOPEN_LABEL = new Intl.DateTimeFormat('th-TH', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Bangkok',
}).format(new Date(DEMO_REOPEN_TIMESTAMP));
