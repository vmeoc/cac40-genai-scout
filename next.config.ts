import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer in cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions policy — disable features we don't use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Basic XSS protection for older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // HSTS — enforce HTTPS (only applied in production by Vercel)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy
  // - default-src 'self': only load resources from same origin
  // - script-src: allow Next.js inline scripts + same origin
  // - style-src: allow inline styles (Tailwind/framer-motion inject them)
  // - img-src: allow data URIs (recharts uses them) + same origin
  // - connect-src: allow calls to Anthropic/Tavily from the browser (none — all via server)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-eval in dev
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
