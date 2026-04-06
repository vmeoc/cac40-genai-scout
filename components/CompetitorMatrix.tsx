"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, BarChart3, Lightbulb } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { renderMarkdown } from "@/lib/render-markdown";

interface CompetitorData {
  dimensions: string[];
  companies: { name: string; scores: number[]; topUseCase: string; aiPartner: string }[];
  insights: string[];
  opportunity: string;
}

interface Props {
  companySlug: string;
  companyName: string;
}

const COLORS = ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

export default function CompetitorMatrix({ companySlug, companyName }: Props) {
  const [data, setData] = useState<CompetitorData | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/competitors?slug=${companySlug}`);
      if (res.status === 429) {
        const body = await res.json() as { retryAfter?: number };
        setError(`Limite de requêtes atteinte. Réessayez dans ${body.retryAfter ?? 60}s.`);
        setDone(true);
        return;
      }
      if (!res.ok) {
        setError("Erreur serveur. Veuillez réessayer.");
        setDone(true);
        return;
      }
      const json = await res.json() as CompetitorData;
      setData(json);
      setDone(true);
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  if (!done && !loading) {
    return (
      <div className="rounded-xl p-8 text-center"
        style={{ background: "rgba(30,30,53,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <BarChart3 size={32} className="mx-auto mb-3" style={{ color: "#06B6D4" }} />
        <h3 className="text-white font-semibold mb-2">Analyse concurrentielle</h3>
        <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
          Comparez {companyName} à ses concurrents sectoriels sur 5 dimensions GenAI.
        </p>
        <button
          onClick={analyze}
          className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0E7490, #06B6D4)" }}
        >
          Analyser les concurrents →
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl p-8 flex items-center justify-center gap-3"
        style={{ background: "rgba(30,30,53,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <Loader2 size={20} className="animate-spin" style={{ color: "#06B6D4" }} />
        <span style={{ color: "#94A3B8" }}>Analyse concurrentielle en cours...</span>
      </div>
    );
  }

  if (error || !data || !Array.isArray(data.dimensions) || !Array.isArray(data.companies)) {
    return (
      <div className="rounded-xl p-6 text-center"
        style={{ background: "rgba(30,30,53,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>
          {error || "Données incomplètes reçues. Veuillez relancer l'analyse."}
        </p>
        <button onClick={() => { setDone(false); setData(null); setError(""); }}
          className="text-sm px-4 py-2 rounded-lg" style={{ background: "rgba(124,58,237,0.2)", color: "#A855F7" }}>
          Réessayer →
        </button>
      </div>
    );
  }

  const radarData = data.dimensions.map((dim, i) => {
    const point: Record<string, string | number> = { dimension: dim };
    data.companies.forEach((c) => { point[c.name] = c.scores[i] ?? 0; });
    return point;
  });

  return (
    <div className="space-y-5">
      {/* Radar chart */}
      <div className="rounded-xl p-4" style={{ background: "rgba(30,30,53,0.6)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <h4 className="text-sm font-semibold text-white mb-1">Radar comparatif — 5 dimensions GenAI</h4>
        <p className="text-xs mb-4" style={{ color: "#64748B" }}>
          Budget IA · Use cases prod · Partenariats · Recrutement · Communication publique (score 0-5)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(45,45,80,0.8)" />
            <PolarAngleAxis dataKey="dimension" tick={{ fill: "#94A3B8", fontSize: 11 }} />
            {data.companies.map((c, i) => (
              <Radar
                key={c.name}
                name={c.name}
                dataKey={c.name}
                stroke={COLORS[i % COLORS.length]}
                fill={COLORS[i % COLORS.length]}
                fillOpacity={i === 0 ? 0.15 : 0.07}
                strokeWidth={i === 0 ? 2.5 : 1.5}
              />
            ))}
            <Legend wrapperStyle={{ fontSize: "11px", color: "#94A3B8" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Companies table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(45,45,80,0.8)" }}>
        <div className="grid text-xs font-semibold px-4 py-2"
          style={{ gridTemplateColumns: "1fr 1.4fr 1fr", background: "rgba(30,30,53,0.8)", color: "#64748B" }}>
          <span>Entreprise</span>
          <span>Use case phare</span>
          <span>Partenaire IA</span>
        </div>
        {data.companies.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="grid items-center px-4 py-3 text-sm"
            style={{
              gridTemplateColumns: "1fr 1.4fr 1fr",
              background: i === 0 ? "rgba(124,58,237,0.07)" : "transparent",
              borderTop: "1px solid rgba(45,45,80,0.5)",
            }}
          >
            <span className="font-medium" style={{ color: i === 0 ? "#A855F7" : "#CBD5E1" }}>
              {i === 0 ? "★ " : ""}{c.name}
            </span>
            <span className="text-xs" style={{ color: "#94A3B8" }}>{c.topUseCase}</span>
            <span className="text-xs px-2 py-0.5 rounded w-fit"
              style={{ background: "rgba(45,45,80,0.5)", color: "#94A3B8" }}>{c.aiPartner}</span>
          </motion.div>
        ))}
      </div>

      {/* Insights */}
      {data.insights?.length > 0 && (
        <div className="rounded-xl p-4" style={{ background: "rgba(30,30,53,0.6)", border: "1px solid rgba(45,45,80,0.8)" }}>
          <h4 className="text-sm font-semibold text-white mb-3">Insights clés concurrentiels</h4>
          {data.insights.map((ins, i) => (
            <div key={i} className="flex gap-2.5 py-1.5 text-sm">
              <span className="mt-0.5 shrink-0" style={{ color: "#06B6D4" }}>▸</span>
              <span style={{ color: "#CBD5E1" }}>{ins}</span>
            </div>
          ))}
        </div>
      )}

      {/* Anthropic opportunity — rendered as markdown */}
      {data.opportunity && (
        <div className="rounded-xl overflow-hidden"
          style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.3)" }}>
          <div className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.1)" }}>
            <Lightbulb size={15} style={{ color: "#A855F7" }} />
            <h4 className="text-sm font-bold" style={{ color: "#A855F7" }}>
              Opportunité Anthropic pour {companyName}
            </h4>
          </div>
          <div className="p-4 space-y-1">
            {renderMarkdown(data.opportunity)}
          </div>
        </div>
      )}
    </div>
  );
}
