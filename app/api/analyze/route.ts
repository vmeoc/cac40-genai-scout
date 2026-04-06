import Anthropic from "@anthropic-ai/sdk";
import { getCompanyBySlug } from "@/lib/cac40-data";
import { buildAnalysisPrompt } from "@/lib/prompts";
import { rateLimit, getClientIp, tooManyRequests, LIMITS } from "@/lib/rate-limit";

export const maxDuration = 60;

async function searchTavily(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return "No search results available (Tavily API key not configured).";

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: "basic",
        max_results: 5,
        include_answer: true,
      }),
    });
    if (!res.ok) return "Search unavailable.";
    const data = await res.json() as {
      answer?: string;
      results: { title: string; content: string; url: string }[];
    };
    const snippets = data.results
      .map((r) => `[${r.title}] ${r.content}\nSource: ${r.url}`)
      .join("\n\n");
    return data.answer ? `Summary: ${data.answer}\n\n${snippets}` : snippets;
  } catch {
    return "Search temporarily unavailable.";
  }
}

export async function POST(req: Request) {
  // Rate limiting
  const ip = getClientIp(req);
  const [limit, windowMs] = LIMITS.analyze;
  const rl = rateLimit(ip, "analyze", limit, windowMs);
  if (!rl.allowed) return tooManyRequests(rl.resetIn);

  const body = await req.json() as { slug?: unknown };
  const slug = typeof body.slug === "string" ? body.slug.slice(0, 60) : "";
  const company = getCompanyBySlug(slug);
  if (!company) {
    return new Response("Company not found", { status: 404 });
  }

  const [results1, results2] = await Promise.all([
    searchTavily(`${company.name} intelligence artificielle générative stratégie IA 2024 2025`),
    searchTavily(`${company.name} AI investment GenAI use case deployment 2024 2025`),
  ]);

  const searchResults = `=== FR ===\n${results1}\n\n=== EN ===\n${results2}`;
  const prompt = buildAnalysisPrompt(company.name, company.sector, searchResults);

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1500,
    stream: true,
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-RateLimit-Remaining": String(rl.remaining),
    },
  });
}
