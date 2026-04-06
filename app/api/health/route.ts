/**
 * GET /api/health
 *
 * Lightweight liveness probe — no external calls.
 * Poll every 3 minutes with UptimeRobot (HTTP keyword monitor, keyword: "ok").
 *
 * Returns 200 if the process is alive and all required env vars are present,
 * 503 otherwise.
 */
export async function GET() {
  const checks: Record<string, boolean> = {
    anthropic_key:  Boolean(process.env.ANTHROPIC_API_KEY?.startsWith("sk-ant-")),
    tavily_key:     Boolean(process.env.TAVILY_API_KEY),
  };

  const allOk = Object.values(checks).every(Boolean);
  const status = allOk ? "ok" : "degraded";
  const httpStatus = allOk ? 200 : 503;

  return Response.json(
    {
      status,
      ts: new Date().toISOString(),
      uptime_s: Math.floor(process.uptime()),
      checks,
    },
    { status: httpStatus }
  );
}
