import Anthropic from "@anthropic-ai/sdk";
import { getCompanyBySlug } from "@/lib/cac40-data";
import { buildDemoPrompt, buildEmailPrompt } from "@/lib/prompts";

export const runtime = "edge";
export const maxDuration = 60;

export async function POST(req: Request) {
  const { slug, useCase, contactName, contactTitle, mode } = await req.json() as {
    slug: string;
    useCase: string;
    contactName?: string;
    contactTitle?: string;
    mode: "demo" | "email";
  };

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
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
