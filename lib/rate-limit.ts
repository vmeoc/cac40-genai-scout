/**
 * In-memory sliding-window rate limiter.
 *
 * Works per serverless function instance (resets on cold start).
 * For multi-instance production use, swap the store for Upstash Redis:
 *   https://github.com/upstash/ratelimit
 *
 * Limits are intentionally tight to protect Anthropic + Tavily API costs.
 */

interface Window {
  count: number;
  resetAt: number;
}

// Global store shared across requests in the same instance
const store = new Map<string, Window>();

// Periodically evict expired windows to avoid unbounded growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, win] of store.entries()) {
      if (win.resetAt < now) store.delete(key);
    }
  }, 60_000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds until window resets
}

export function rateLimit(
  ip: string,
  endpoint: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const key = `${endpoint}:${ip}`;
  const now = Date.now();

  let win = store.get(key);
  if (!win || win.resetAt < now) {
    win = { count: 0, resetAt: now + windowMs };
    store.set(key, win);
  }

  win.count++;
  const remaining = Math.max(0, limit - win.count);
  const resetIn = Math.ceil((win.resetAt - now) / 1000);

  return { allowed: win.count <= limit, remaining, resetIn };
}

/** Per-endpoint limits: [maxRequests, windowMs] */
export const LIMITS: Record<string, [number, number]> = {
  analyze:     [4,  60_000],   // 4 streaming analyses / min  (heavy: Tavily×2 + Claude stream)
  demo:        [6,  60_000],   // 6 demo/email generations / min
  contacts:    [10, 60_000],   // 10 contact searches / min
  competitors: [8,  60_000],   // 8 competitor analyses / min
};

/** Extract a best-effort client IP from Next.js request headers */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  return (
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

/** Return a standardised 429 response */
export function tooManyRequests(resetIn: number): Response {
  return new Response(
    JSON.stringify({
      error: "Too many requests. Please wait before retrying.",
      retryAfter: resetIn,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(resetIn),
        "X-RateLimit-Reset": String(Math.floor(Date.now() / 1000) + resetIn),
      },
    }
  );
}
