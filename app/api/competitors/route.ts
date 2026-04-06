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
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content[0].type === "text" ? msg.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return Response.json({
      dimensions: ["Budget IA", "Use cases prod", "Partenariats", "Recrutement", "Communication"],
      companies: [company, ...competitors].map((c) => ({
        name: c.name,
        scores: [
          Math.round(c.score / 20),
          Math.min(5, c.useCaseCount),
          Math.min(5, c.aiPartners.length),
          Math.round(c.score / 25),
          Math.round(c.trend / 10),
        ],
        topUseCase: c.useCases[0]?.title || "N/A",
        aiPartner: c.aiPartners[0] || "N/A",
      })),
      insights: ["Données basées sur les informations statiques."],
      opportunity: `Opportunité identifiée pour Anthropic chez ${company.name}.`,
    });
  }

  try {
    return Response.json(JSON.parse(jsonMatch[0]));
  } catch {
    return Response.json({ error: "Parse error" }, { status: 500 });
  }
}
