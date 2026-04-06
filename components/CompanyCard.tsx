"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Company } from "@/lib/cac40-data";
import { getScoreColor, getScoreLabel } from "@/lib/utils";

interface Props {
  company: Company;
  index: number;
  rank: number;
}

export default function CompanyCard({ company, index, rank }: Props) {
  const router = useRouter();
  const scoreColor = getScoreColor(company.score);
  const label = getScoreLabel(company.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={() => router.push(`/company/${company.id}`)}
      className="card-hover cursor-pointer rounded-xl p-5 relative overflow-hidden group"
      style={{
        background: "rgba(30,30,53,0.8)",
        border: "1px solid rgba(45,45,80,0.8)",
      }}
    >
      {/* Rank badge */}
      <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ background: "rgba(45,45,80,0.8)", color: "#94A3B8" }}>
        #{rank}
      </div>

      {/* Accent glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${company.accentColor}15 0%, transparent 60%)` }} />

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="text-2xl">{company.sectorIcon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-white truncate pr-6">{company.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{ background: "rgba(45,45,80,0.8)", color: "#94A3B8" }}>
            {company.sector}
          </span>
        </div>
      </div>

      {/* Score bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold" style={{ color: scoreColor }}>{label}</span>
          <span className="text-lg font-bold text-white font-mono">{company.score}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(45,45,80,0.8)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${company.score}%` }}
            transition={{ duration: 0.8, delay: index * 0.04 + 0.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${scoreColor}99, ${scoreColor})` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1" style={{ color: company.trend > 0 ? "#10B981" : company.trend < 0 ? "#EF4444" : "#94A3B8" }}>
          {company.trend > 0 ? <TrendingUp size={12} /> : company.trend < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
          <span className="font-medium">{company.trend > 0 ? "+" : ""}{company.trend}% vs 2024</span>
        </div>
        <span style={{ color: "#94A3B8" }}>{company.useCases.length} use cases</span>
      </div>

      {/* AI Partners */}
      {company.aiPartners.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {company.aiPartners.slice(0, 3).map((p) => (
            <span key={p} className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: "rgba(124,58,237,0.15)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.2)" }}>
              {p}
            </span>
          ))}
          {company.aiPartners.length > 3 && (
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: "#94A3B8" }}>
              +{company.aiPartners.length - 3}
            </span>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: company.accentColor }}>
        <span>Analyser avec Claude</span>
        <ArrowRight size={12} />
      </div>
    </motion.div>
  );
}
