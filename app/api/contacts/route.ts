import Anthropic from "@anthropic-ai/sdk";
import { getCompanyBySlug } from "@/lib/cac40-data";
import { buildContactsPrompt } from "@/lib/prompts";

export const maxDuration = 30;

async function searchTavily(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return "";
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, query, search_depth: "basic", max_results: 5 }),
    });
    if (!res.ok) return "";
    const data = await res.json() as { results: { title: string; content: string; url: string }[] };
    return data.results.map((r) => `[${r.title}] ${r.content}\nSource: ${r.url}`).join("\n\n");
  } catch { return ""; }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ error: "Missing slug" }, { status: 400 });

  const company = getCompanyBySlug(slug);
  if (!company) return Response.json({ error: "Not found" }, { status: 404 });

  const [r1, r2] = await Promise.all([
    searchTavily(`${company.name} Chief Data Officer Chief AI Officer Head AI Director intelligence artificielle 2024 2025`),
    searchTavily(`${company.name} CDO CTO digital transformation AI leadership interview`),
  ]);

  const searchResults = [r1, r2].filter(Boolean).join("\n\n");

  if (!searchResults) {
    return Response.json({
      contacts: company.knownLeader ? [{
        name: company.knownLeader,
        title: company.knownLeaderTitle || "Executive",
        department: "Direction",
        confidence: "high",
        source: "Données statiques",
        talkingPoints: [`Responsable de la stratégie digitale et IA chez ${company.name}`],
      }] : [],
    });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = buildContactsPrompt(company.name, company.sector, searchResults);

  const msg = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 800,
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content[0].type === "text" ? msg.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return Response.json({ contacts: [] });
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]) as { contacts: unknown[] };
    return Response.json(parsed);
  } catch {
    return Response.json({ contacts: [] });
  }
}
