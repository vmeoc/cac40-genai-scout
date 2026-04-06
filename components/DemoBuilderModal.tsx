"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Copy, Check, Sparkles, Mail, ArrowRight, Zap } from "lucide-react";
import { Company } from "@/lib/cac40-data";
import { renderMarkdown } from "@/lib/render-markdown";

interface Props {
  company: Company;
  onClose: () => void;
}

type Tab = "demo" | "email";

export default function DemoBuilderModal({ company, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("demo");
  const [selectedUseCase, setSelectedUseCase] = useState(company.useCases[0]?.title || "");
  const [demoText, setDemoText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const currentText = tab === "demo" ? demoText : emailText;
  const setCurrentText = tab === "demo" ? setDemoText : setEmailText;

  const generate = async () => {
    if (loading) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setCurrentText("");
    setLoading(true);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: company.id,
          useCase: selectedUseCase,
          contactName: company.knownLeader,
          contactTitle: company.knownLeaderTitle,
          mode: tab,
        }),
        signal: abortRef.current.signal,
      });

      if (res.status === 429) {
        const data = await res.json() as { retryAfter?: number };
        setCurrentText(`_Rate limit reached. Please retry in ${data.retryAfter ?? 60} seconds._`);
        return;
      }
      if (!res.ok || !res.body) throw new Error("Stream failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setCurrentText((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setCurrentText("_Generation error. Please check your API keys._");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{ background: "#1A1A2E", border: "1px solid rgba(124,58,237,0.4)", boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.15)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))", borderBottom: "1px solid rgba(45,45,80,0.8)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm">Propose a Demo</h2>
                <p className="text-xs" style={{ color: "#94A3B8" }}>{company.name} · Powered by Claude</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-70"
              style={{ background: "rgba(45,45,80,0.8)" }}>
              <X size={14} style={{ color: "#94A3B8" }} />
            </button>
          </div>

          {/* Use case selector */}
          <div className="px-6 pt-4 pb-3">
            <label className="text-xs font-medium mb-2 block" style={{ color: "#94A3B8" }}>
              Target use case:
            </label>
            <div className="flex flex-wrap gap-2">
              {company.useCases.map((uc) => (
                <button
                  key={uc.title}
                  onClick={() => { setSelectedUseCase(uc.title); setDemoText(""); setEmailText(""); }}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={
                    selectedUseCase === uc.title
                      ? { background: "rgba(124,58,237,0.3)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.5)" }
                      : { background: "rgba(30,30,53,0.8)", color: "#94A3B8", border: "1px solid rgba(45,45,80,0.8)" }
                  }
                >
                  {uc.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-6 gap-2" style={{ borderBottom: "1px solid rgba(45,45,80,0.8)" }}>
            {[
              { id: "demo" as Tab, label: "Demo Proposal", Icon: Zap },
              { id: "email" as Tab, label: "Prospecting Email", Icon: Mail },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-all"
                style={{
                  borderBottomColor: tab === id ? "#7C3AED" : "transparent",
                  color: tab === id ? "#A855F7" : "#94A3B8",
                }}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="px-6 py-4">
            {!currentText ? (
              <div className="rounded-xl p-6 text-center" style={{ background: "rgba(15,15,26,0.5)", border: "1px dashed rgba(45,45,80,0.8)" }}>
                <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>
                  {tab === "demo"
                    ? `Claude will generate a personalized demo proposal for ${company.name} on "${selectedUseCase}".`
                    : `Claude will draft a personalized email to ${company.knownLeader || "the AI decision-maker"} at ${company.name}.`
                  }
                </p>
                <button
                  onClick={generate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Generate with Claude
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(45,45,80,0.8)" }}>
                <div className="flex items-center justify-between px-4 py-2"
                  style={{ background: "rgba(30,30,53,0.8)", borderBottom: "1px solid rgba(45,45,80,0.5)" }}>
                  <div className="flex items-center gap-2">
                    {loading ? (
                      <Loader2 size={12} className="animate-spin" style={{ color: "#7C3AED" }} />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                    <span className="text-xs" style={{ color: "#94A3B8" }}>
                      {loading ? "Generating..." : "Ready to use"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={generate} className="text-xs hover:opacity-70 transition-opacity" style={{ color: "#94A3B8" }}>
                      Regenerate
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all"
                      style={{ background: copied ? "rgba(16,185,129,0.2)" : "rgba(124,58,237,0.2)", color: copied ? "#10B981" : "#A855F7" }}
                    >
                      {copied ? <Check size={11} /> : <Copy size={11} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="p-4 max-h-72 overflow-y-auto prose-dark" style={{ background: "rgba(15,15,26,0.3)" }}>
                  {renderMarkdown(currentText)}
                  {loading && <span className="cursor-blink text-sm font-bold" style={{ color: "#7C3AED" }}>▌</span>}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-4 flex items-center justify-between">
            <p className="text-xs" style={{ color: "#64748B" }}>
              Generated by Claude · {new Date().toLocaleDateString("en-US")}
            </p>
            <button onClick={onClose} className="text-xs hover:opacity-70 transition-opacity" style={{ color: "#94A3B8" }}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
