/**
 * GET /api/health/llm
 *
 * Deep LLM smoke-test — makes a real (minimal) Claude API call.
 * Poll every 60 minutes with UptimeRobot (HTTP keyword monitor, keyword: "ok").
 *
 * Rate-limited to 3 calls/hour to prevent accidental cost spikes.
 * Returns 200 + { status: "ok" } on success, 503 on any failure.
 */
import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, getClientIp, LIMITS } from "@/lib/rate-limit";

export const maxDuration = 15;

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const [limit, windowMs] = LIMITS["health-llm"];
  const rl = rateLimit(ip, "health-llm", limit, windowMs);
  if (!rl.allowed) {
    return Response.json(
      { status: "rate_limited", retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
    );
  }

  const t0 = Date.now();

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [{ role: "user", content: 'Reply with exactly the word "ok".' }],
    });

    const reply = msg.content?.[0]?.type === "text" ? msg.content[0].text.trim().toLowerCase() : "";
    const latency_ms = Date.now() - t0;

    if (!reply.includes("ok")) {
      return Response.json(
        { status: "unexpected_response", reply, latency_ms },
        { status: 503 }
      );
    }

    return Response.json({
      status: "ok",
      model: msg.model,
      latency_ms,
      tokens_used: msg.usage.input_tokens + msg.usage.output_tokens,
      ts: new Date().toISOString(),
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json(
      { status: "error", error: message, latency_ms: Date.now() - t0 },
      { status: 503 }
    );
  }
}
