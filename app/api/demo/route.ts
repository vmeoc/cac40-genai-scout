import Anthropic from "@anthropic-ai/sdk";
import { getCompanyBySlug } from "@/lib/cac40-data";
import { buildDemoPrompt, buildEmailPrompt } from "@/lib/prompts";
import { rateLimit, getClientIp, tooManyRequests, LIMITS } from "@/lib/rate-limit";

export const maxDuration = 60;

export async function POST(req: Request) {
  // Rate limiting
  const ip = getClientIp(req);
  const [limit, windowMs] = LIMITS.demo;
  const rl = rateLimit(ip, "demo", limit, windowMs);
  if (!rl.allowed) return tooManyRequests(rl.resetIn);

  const body = await req.json() as {
    slug?: unknown;
    useCase?: unknown;
    contactName?: unknown;
    contactTitle?: unknown;
    mode?: unknown;
  };

  const slug = typeof body.slug === "string" ? body.slug.slice(0, 60) : "";
  const useCase = typeof body.useCase === "string" ? body.useCase.slice(0, 200) : "";
  const contactName = typeof body.contactName === "string" ? body.contactName.slice(0, 100) : undefined;
  const contactTitle = typeof body.contactTitle === "string" ? body.contactTitle.slice(0, 100) : undefined;
  const mode = body.mode === "email" ? "email" : "demo";

  const company = getCompanyBySlug(slug);
  if (!company) return new Response("Not found", { status: 404 });

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let prompt: string;
  if (mode === "email") {
    prompt = buildEmailPrompt(
      company.name,
      contactName || company.knownLeader || "Directeur IA",
      contactTitle || company.knownLeaderTitle || "Executive",
      useCase,
      "Démo Claude personnalisée"
    );
  } else {
    prompt = buildDemoPrompt(
      company.name,
      company.sector,
      useCase,
      contactName || company.knownLeader || "Décideur IA"
    );
  }

  const stream = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1200,
    stream: true,
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-RateLimit-Remaining": String(rl.remaining),
    },
  });
}
