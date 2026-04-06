import { NextRequest, NextResponse } from "next/server";

// ─── Bot / crawler patterns to block ─────────────────────────────────────────
const BOT_PATTERNS = [
  /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i,
  /python-requests/i, /go-http-client/i, /java\//i, /libwww/i,
  /postman/i, /insomnia/i, /httpclient/i,
];

// Allow Playwright and common testing agents in development
const DEV_EXCEPTIONS = /playwright|puppeteer|headless/i;

// ─── Slug validation: only lowercase letters, digits, hyphens ─────────────────
const SLUG_RE = /^[a-z0-9-]{1,60}$/;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  // ── Only guard API routes ──────────────────────────────────────────────────
  if (!pathname.startsWith("/api/")) {
    return addSecurityHeaders(NextResponse.next());
  }

  // ── Health endpoints: open to monitors (UptimeRobot, etc.) ────────────────
  if (pathname.startsWith("/api/health")) {
    return addSecurityHeaders(NextResponse.next());
  }

  // ── Bot detection ──────────────────────────────────────────────────────────
  const ua = req.headers.get("user-agent") || "";
  if (!isDev && !DEV_EXCEPTIONS.test(ua) && BOT_PATTERNS.some((p) => p.test(ua))) {
    return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Origin / Referer check (browser requests should come from our domain) ──
  if (!isDev) {
    const origin = req.headers.get("origin") || "";
    const referer = req.headers.get("referer") || "";
    const host = req.headers.get("host") || "";
    const allowed = origin.includes(host) || referer.includes(host) || origin === "";
    if (!allowed) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // ── Slug sanitization for GET endpoints ───────────────────────────────────
  if (req.method === "GET") {
    const slug = req.nextUrl.searchParams.get("slug");
    if (slug && !SLUG_RE.test(slug)) {
      return new NextResponse(JSON.stringify({ error: "Invalid slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return addSecurityHeaders(NextResponse.next());
}

function addSecurityHeaders(res: NextResponse): NextResponse {
  // Prevent clickjacking
  res.headers.set("X-Frame-Options", "DENY");
  // Prevent MIME sniffing
  res.headers.set("X-Content-Type-Options", "nosniff");
  // Referrer policy
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Basic CSP (tight for an API, relaxed for pages — pages override via next.config)
  res.headers.set("X-XSS-Protection", "1; mode=block");
  // Remove server fingerprinting
  res.headers.set("X-Powered-By", "");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
