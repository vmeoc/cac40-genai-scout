import Anthropic from "@anthropic-ai/sdk";
import { getCompanyBySlug, getCompanyCompetitors } from "@/lib/cac40-data";
import { buildCompetitorsPrompt } from "@/lib/prompts";
import { rateLimit, getClientIp, tooManyRequests, LIMITS } from "@/lib/rate-limit";

export const maxDuration = 30;

async function searchTavily(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return "";
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, query, search_depth: "basic", max_results: 4 }),
    });
    if (!res.ok) return "";
    const data = await res.json() as { results: { title: string; content: string }[] };
    return data.results.map((r) => `[${r.title}] ${r.content}`).join("\n\n");
  } catch { return ""; }
}

/** Try to extract the first valid JSON object from a string that may contain markdown fences. */
function extractJson(raw: string): Record<string, unknown> | null {
  // Strip markdown code fences if present
  const stripped = raw.replace(/```(?:json)?\s*/g, "").replace(/```\s*/g, "").trim();

  // Try the whole string first
  try { return JSON.parse(stripped) as Record<string, unknown>; } catch { /* continue */ }

  // Try greedy brace match
  const match = stripped.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]) as Record<string, unknown>; } catch { /* continue */ }

  // Try to find the last closing brace and parse from the first opening brace
  const firstBrace = stripped.indexOf("{");
  const lastBrace = stripped.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;
  try { return JSON.parse(stripped.slice(firstBrace, lastBrace + 1)) as Record<string, unknown>; } catch { return null; }
}

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const [limit, windowMs] = LIMITS.competitors;
  const rl = rateLimit(ip, "competitors", limit, windowMs);
  if (!rl.allowed) return tooManyRequests(rl.resetIn);

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ error: "Missing slug" }, { status: 400 });

  const company = getCompanyBySlug(slug);
  if (!company) return Response.json({ error: "Not found" }, { status: 404 });

  const competitors = getCompanyCompetitors(company);

  const fallback = {
    dimensions: ["Budget IA", "Use cases prod", "Partenariats", "Recrutement IA", "Communication"],
    companies: [company, ...competitors].map((c) => ({
      name: c.name,
      scores: [
        Math.round(c.score / 20),
        Math.min(5, c.useCases.length),
        Math.min(5, c.aiPartners.length),
        Math.round(c.score / 25),
        Math.max(1, Math.min(5, Math.round(c.trend / 8))),
      ],
      topUseCase: c.useCases[0]?.title || "N/A",
      aiPartner: c.aiPartners[0] || "N/A",
    })),
    insights: [
      `${competitors[0]?.name ?? "Les concurrents"} investissent dans la GenAI — analyse live indisponible.`,
      "Relancez l'analyse pour obtenir une comparaison en temps réel.",
    ],
    opportunity: `**Core-métier** : Claude peut transformer les workflows clés de ${company.name} dans le secteur ${company.sector}.\n\n**Dev & API** : Les équipes tech de ${company.name} peuvent intégrer Claude API pour accélérer leurs projets internes.\n\n**Productivité** : Chaque employé peut bénéficier de Claude comme assistant intelligent adapté à leur métier.\n\n**Prochaine étape** : Proposer un atelier de 2h pour identifier le use case prioritaire à démonter.`,
  };

  try {
    const allNames = [company.name, ...competitors.map((c) => c.name)].join(", ");
    const searchResults = await searchTavily(
      `${allNames} intelligence artificielle générative stratégie IA use case comparaison 2024 2025`
    );

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const prompt = buildCompetitorsPrompt(
      company.name,
      company.sector,
      competitors.map((c) => c.name),
      searchResults || "No search results available."
    );

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    // Safe content access
    const rawText = msg.content?.[0]?.type === "text" ? msg.content[0].text : "";
    console.log(`[competitors/${slug}] Claude raw (${rawText.length} chars):`, rawText.slice(0, 300));

    const parsed = extractJson(rawText);
    console.log(`[competitors/${slug}] Parsed:`, parsed ? "OK" : "FAILED");

    if (!parsed) {
      console.warn(`[competitors/${slug}] JSON extraction failed — using fallback`);
      return Response.json(fallback);
    }

    // Merge parsed with fallback for any missing fields
    const result = {
      dimensions: Array.isArray(parsed.dimensions) && (parsed.dimensions as unknown[]).length > 0
        ? parsed.dimensions
        : fallback.dimensions,
      companies: Array.isArray(parsed.companies) && (parsed.companies as unknown[]).length > 0
        ? parsed.companies
        : fallback.companies,
      insights: Array.isArray(parsed.insights) && (parsed.insights as unknown[]).length > 0
        ? parsed.insights
        : fallback.insights,
      opportunity: typeof parsed.opportunity === "string" && parsed.opportunity.length > 10
        ? parsed.opportunity
        : fallback.opportunity,
    };

    return Response.json(result);

  } catch (err) {
    console.error(`[competitors/${slug}] Unexpected error:`, err);
    return Response.json(fallback);
  }
}
