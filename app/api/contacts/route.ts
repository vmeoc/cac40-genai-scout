import Anthropic from "@anthropic-ai/sdk";
import { getCompanyBySlug } from "@/lib/cac40-data";
import { buildContactsPrompt } from "@/lib/prompts";
import { rateLimit, getClientIp, tooManyRequests, LIMITS } from "@/lib/rate-limit";

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
    return data.results.map((r) => `[${r.title}]\n${r.content}\nURL: ${r.url}`).join("\n\n---\n\n");
  } catch { return ""; }
}

interface Contact {
  name: string;
  title: string;
  department: string;
  confidence: string;
  source: string;
  talkingPoints: string[];
}

function buildStaticContact(company: { knownLeader?: string; knownLeaderTitle?: string; name: string }): Contact | null {
  if (!company.knownLeader) return null;
  return {
    name: company.knownLeader,
    title: company.knownLeaderTitle || "Executive",
    department: "Direction",
    confidence: "high",
    source: "Données publiques (rapport annuel / LinkedIn)",
    talkingPoints: [
      `Responsable identifié de la stratégie digitale et IA chez ${company.name}`,
      "Contact clé pour une conversation sur les initiatives GenAI du groupe",
    ],
  };
}

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const [limit, windowMs] = LIMITS.contacts;
  const rl = rateLimit(ip, "contacts", limit, windowMs);
  if (!rl.allowed) return tooManyRequests(rl.resetIn);

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ error: "Missing slug" }, { status: 400 });

  const company = getCompanyBySlug(slug);
  if (!company) return Response.json({ error: "Not found" }, { status: 404 });

  const staticContact = buildStaticContact(company);

  const [r1, r2] = await Promise.all([
    searchTavily(`${company.name} Chief Data Officer Chief AI Officer Head AI Director intelligence artificielle 2024 2025`),
    searchTavily(`"${company.name}" CDO CTO digital transformation AI leadership GenAI decision maker`),
  ]);

  const searchResults = [r1, r2].filter(Boolean).join("\n\n");

  if (!searchResults) {
    return Response.json({ contacts: staticContact ? [staticContact] : [] });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = buildContactsPrompt(company.name, company.sector, searchResults, company.knownLeader, company.knownLeaderTitle);

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content[0].type === "text" ? msg.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    return Response.json({ contacts: staticContact ? [staticContact] : [] });
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]) as { contacts: Contact[] };
    const contacts = parsed.contacts || [];

    // Ensure known leader is always included even if Claude missed them
    if (staticContact && !contacts.some((c) => c.name === staticContact.name)) {
      contacts.unshift(staticContact);
    }

    return Response.json({ contacts });
  } catch {
    return Response.json({ contacts: staticContact ? [staticContact] : [] });
  }
}
