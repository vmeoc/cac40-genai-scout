"use client";
import { useState, useEffect, useRef } from "react";
import { Loader2, RefreshCw, ExternalLink } from "lucide-react";
import { renderMarkdown } from "@/lib/render-markdown";

interface Props {
  companySlug: string;
  companyName: string;
}

export default function StreamingAnalysis({ companySlug, companyName }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startAnalysis = async () => {
    if (loading) return;
    if (abortRef.current) abortRef.current.abort();

    abortRef.current = new AbortController();
    setText("");
    setLoading(true);
    setStarted(true);
    setDone(false);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: companySlug }),
        signal: abortRef.current.signal,
      });

      if (res.status === 429) {
        const data = await res.json() as { retryAfter?: number };
        setText(`_Rate limit reached. Please retry in ${data.retryAfter ?? 60} seconds._`);
        setDone(true);
        return;
      }
      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        setText((prev) => prev + decoder.decode(value, { stream: true }));
      }
      setDone(true);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setText((prev) => prev + "\n\n_Analysis error. Please check your API keys._");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bottomRef.current && loading) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [text, loading]);

  if (!started) {
    return (
      <div className="rounded-xl p-8 text-center"
        style={{ background: "rgba(30,30,53,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))", border: "1px solid rgba(124,58,237,0.3)" }}>
          <span className="text-2xl">🤖</span>
        </div>
        <h3 className="text-white font-semibold mb-2">Live AI Analysis</h3>
        <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
          Claude will analyze the latest news and communications from {companyName} to assess their GenAI positioning.
        </p>
        <button
          onClick={startAnalysis}
          className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 glow-accent"
          style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
        >
          ▶ Start Claude Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(45,45,80,0.8)" }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(30,30,53,0.8)", borderBottom: "1px solid rgba(45,45,80,0.8)" }}>
        <div className="flex items-center gap-2">
          {loading ? (
            <Loader2 size={14} className="animate-spin" style={{ color: "#7C3AED" }} />
          ) : (
            <div className="w-2 h-2 rounded-full bg-green-500" />
          )}
          <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>
            {loading ? "Claude analyzing in real-time..." : "Analysis complete"}
          </span>
        </div>
        {done && (
          <button onClick={startAnalysis} className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
            style={{ color: "#7C3AED" }}>
            <RefreshCw size={12} />
            <span>Re-run</span>
          </button>
        )}
      </div>

      {/* Sources */}
      <div className="px-4 py-2 flex items-center gap-2 flex-wrap"
        style={{ background: "rgba(15,15,26,0.5)", borderBottom: "1px solid rgba(45,45,80,0.5)" }}>
        <span className="text-xs" style={{ color: "#94A3B8" }}>Sources:</span>
        {["Recent News", "Annual Reports", "Press Releases", "LinkedIn"].map((s) => (
          <span key={s} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
            style={{ background: "rgba(45,45,80,0.5)", color: "#94A3B8" }}>
            <ExternalLink size={9} />
            {s}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 max-h-[520px] overflow-y-auto prose-dark" style={{ background: "rgba(15,15,26,0.3)" }}>
        {text ? (
          <div>
            {renderMarkdown(text)}
            {loading && (
              <span className="cursor-blink text-base font-bold ml-0.5" style={{ color: "#7C3AED" }}>▌</span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 py-4">
            <Loader2 size={16} className="animate-spin" style={{ color: "#7C3AED" }} />
            <span className="text-sm" style={{ color: "#94A3B8" }}>Searching for information...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
