// Evaluate on the server for each request, in Bangkok time. No password or API key is required.
export const DEMO_REOPEN_AT = '2026-11-07T00:00:00+07:00';
export const DEMO_REOPEN_TIMESTAMP = Date.parse(DEMO_REOPEN_AT);

export function isDemoPaused(now = Date.now()) {
  return !Number.isFinite(now) || now < DEMO_REOPEN_TIMESTAMP;
}
