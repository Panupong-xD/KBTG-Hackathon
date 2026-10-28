import { createHash } from 'node:crypto';
import { isIP } from 'node:net';

// Best-effort protection within one warm server instance. Cross-instance limits
// require the hosting firewall or a shared store; this Map cannot provide that.
export function createLoginLimiter({ maxAttempts = 10, windowMs = 60_000, maxKeys = 2048 } = {}) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return {
    consume(key: string, now = Date.now()) {
      for (const [id, entry] of attempts) if (entry.expires <= now) attempts.delete(id);
      const id = attempts.has(key) || attempts.size < maxKeys ? key : 'capacity';
      const entry = attempts.get(id) ?? { count: 0, expires: now + windowMs };
      attempts.set(id, entry);
      if (entry.count >= maxAttempts) return { allowed: false, retryAfter: Math.max(1, Math.ceil((entry.expires - now) / 1000)) };
      entry.count += 1;
      return { allowed: true, retryAfter: 0 };
    },
    reset(key: string) { attempts.delete(key); },
  };
}

export function loginClientKey(headers: Headers, trustedVercel = process.env.VERCEL === '1') {
  // Vercel overwrites this header at its own proxy. Ignore it on untrusted hosts.
  const forwarded = trustedVercel ? headers.get('x-forwarded-for')?.split(',')[0].trim() : undefined;
  const client = forwarded && isIP(forwarded) ? forwarded : 'local-or-unknown';
  return createHash('sha256').update(client).digest('hex');
}

export const loginLimiter = createLoginLimiter();
