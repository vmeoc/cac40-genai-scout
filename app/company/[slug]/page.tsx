"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Star, TrendingUp, TrendingDown, Sparkles, Brain, Users, BarChart3, Info } from "lucide-react";
import Header from "@/components/Header";
import StreamingAnalysis from "@/components/StreamingAnalysis";
import UseCaseCards from "@/components/UseCaseCards";
import ContactFinder from "@/components/ContactFinder";
import CompetitorMatrix from "@/components/CompetitorMatrix";
import DemoBuilderModal from "@/components/DemoBuilderModal";
import { getCompanyBySlug } from "@/lib/cac40-data";
import { getScoreColor, getScoreLabel } from "@/lib/utils";

type Tab = "analyse" | "use-cases" | "contacts" | "concurrents";

const SCORE_DIMS: { label: string; tooltip: string }[] = [
  {
    label: "Budget IA",
    tooltip: "Niveau d'investissement IA annoncé publiquement : budget R&D, acquisitions de startups IA, montants publiés dans les rapports annuels et communiqués de presse.",
  },
  {
    label: "Use cases prod",
    tooltip: "Nombre de cas d'usage GenAI réellement déployés en production (vs pilotes ou annonces). Source : rapports annuels, interviews dirigeants, presse spécialisée.",
  },
  {
    label: "Partenariats",
    tooltip: "Profondeur des partenariats avec les éditeurs IA (OpenAI, Anthropic, Mistral, Google, AWS...). Un partenariat signé = 1 point, intégration produit = 2 points, co-développement = 3+ points.",
  },
  {
    label: "Recrutement",
    tooltip: "Vélocité de recrutement IA : croissance des offres d'emploi ML/AI sur LinkedIn et Indeed, annonces de création d'équipes dédiées, embauches de profils AI executives.",
  },
  {
    label: "Communication",
    tooltip: "Fréquence et profondeur de la communication publique GenAI : mentions dans les earnings calls, keynotes, articles de blog techniques, annonces de produits IA.",
  },
];

export default function CompanyPage() {
  const params = useParams() as { slug: string };
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("analyse");
  const [showModal, setShowModal] = useState(false);
  const [hoveredDim, setHoveredDim] = useState<number | null>(null);

  const company = getCompanyBySlug(params.slug);
  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F0F1A" }}>
        <div className="text-center">
          <p className="text-white mb-4">Entreprise introuvable</p>
          <button onClick={() => router.push("/")} className="text-sm" style={{ color: "#7C3AED" }}>← Retour</button>
        </div>
      </div>
    );
  }

  const scoreColor = getScoreColor(company.score);
  const label = getScoreLabel(company.score);

  const dimScores = [
    Math.round(company.score / 20),
    Math.min(5, company.useCases.length),
    Math.min(5, company.aiPartners.length),
    Math.round(company.score / 25),
    Math.max(1, Math.min(5, Math.round(company.trend / 8))),
  ];

  const tabs: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: "analyse", label: "Analyse IA", Icon: Brain },
    { id: "use-cases", label: "Use Cases", Icon: Sparkles },
    { id: "contacts", label: "Contacts", Icon: Users },
    { id: "concurrents", label: "Concurrents", Icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0F0F1A" }}>
      <Header />

      <div className="fixed top-0 left-0 right-0 h-64 pointer-events-none opacity-5"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${company.accentColor}, transparent)` }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70"
          style={{ color: "#94A3B8" }}
        >
          <ArrowLeft size={16} />
          Retour au dashboard
        </button>

        {/* Company header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(30,30,53,0.6)", border: "1px solid rgba(45,45,80,0.8)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{company.sectorIcon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-white">{company.name}</h1>
                  <span className="text-sm px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(45,45,80,0.8)", color: "#94A3B8" }}>
                    {company.sector}
                  </span>
                </div>
              </div>

              {/* Description + sources */}
              <div className="mb-4 rounded-lg p-3" style={{ background: "rgba(15,15,26,0.4)", border: "1px solid rgba(45,45,80,0.5)" }}>
                <p className="text-sm leading-relaxed mb-2" style={{ color: "#CBD5E1" }}>{company.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs" style={{ color: "#64748B" }}>Sources :</span>
                  {["Rapport annuel 2024", "Presse spécialisée", "Communiqués IR", "LinkedIn"].map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded"
                      style={{ background: "rgba(45,45,80,0.5)", color: "#94A3B8" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Score bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold" style={{ color: scoreColor }}>Score GenAI · {label}</span>
                    <div className="relative group">
                      <Info size={12} style={{ color: "#64748B" }} className="cursor-help" />
                      <div className="absolute left-0 bottom-6 z-10 hidden group-hover:block w-64 rounded-lg p-3 text-xs shadow-xl pointer-events-none"
                        style={{ background: "#1A1A2E", border: "1px solid rgba(124,58,237,0.3)", color: "#CBD5E1" }}>
                        Score composite 0-100 calculé à partir de 5 dimensions : budget IA, use cases en production, partenariats éditeurs, vélocité de recrutement et communication publique. Basé sur des données publiques 2024-2025.
                      </div>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-white font-mono">{company.score}<span className="text-sm text-gray-500">/100</span></span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(45,45,80,0.8)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${company.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${scoreColor}99, ${scoreColor})` }}
                  />
                </div>
              </div>

              {/* Dimension scores with tooltips */}
              <div className="grid grid-cols-5 gap-2">
                {SCORE_DIMS.map((dim, i) => (
                  <div
                    key={dim.label}
                    className="text-center relative cursor-help"
                    onMouseEnter={() => setHoveredDim(i)}
                    onMouseLeave={() => setHoveredDim(null)}
                  >
                    <div className="flex justify-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, si) => (
                        <div key={si} className="w-1.5 h-1.5 rounded-full transition-all"
                          style={{ background: si < dimScores[i] ? scoreColor : "rgba(45,45,80,0.8)" }} />
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="text-xs" style={{ color: "#64748B" }}>{dim.label}</span>
                      <Info size={9} style={{ color: "#475569" }} />
                    </div>
                    {hoveredDim === i && (
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-52 rounded-lg p-2.5 text-xs shadow-xl pointer-events-none"
                        style={{ background: "#1A1A2E", border: "1px solid rgba(124,58,237,0.3)", color: "#CBD5E1" }}>
                        <strong className="text-white block mb-1">{dim.label} : {dimScores[i]}/5</strong>
                        {dim.tooltip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stats + CTA */}
            <div className="lg:w-72 space-y-3">
              <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(15,15,26,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span style={{ color: "#94A3B8" }}>Tendance</span>
                    <div className="relative group">
                      <Info size={11} style={{ color: "#475569" }} className="cursor-help" />
                      <div className="absolute right-0 bottom-5 z-10 hidden group-hover:block w-56 rounded-lg p-2.5 text-xs shadow-xl pointer-events-none"
                        style={{ background: "#1A1A2E", border: "1px solid rgba(124,58,237,0.3)", color: "#CBD5E1" }}>
                        Variation estimée du score GenAI entre 2024 et 2025 (en %). Basé sur le rythme des annonces publiques, embauches et partenariats sur 12 mois glissants.
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 font-medium"
                    style={{ color: company.trend > 0 ? "#10B981" : "#EF4444" }}>
                    {company.trend > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    {company.trend > 0 ? "+" : ""}{company.trend}% vs 2024
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#94A3B8" }}>Use cases</span>
                  <span className="text-white font-medium">{company.useCases.length}</span>
                </div>
                {company.knownLeader && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#94A3B8" }}>Décideur IA</span>
                    <span className="text-white font-medium text-right text-xs">{company.knownLeader}</span>
                  </div>
                )}
                {company.aiPartners.length > 0 && (
                  <div>
                    <span className="text-sm block mb-1.5" style={{ color: "#94A3B8" }}>Partenaires IA</span>
                    <div className="flex flex-wrap gap-1">
                      {company.aiPartners.map((p) => (
                        <span key={p} className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(124,58,237,0.15)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.2)" }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 glow-accent"
                style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
              >
                <Star size={15} />
                Proposer une démo Claude
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "rgba(30,30,53,0.6)", border: "1px solid rgba(45,45,80,0.8)" }}>
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={
                tab === id
                  ? { background: "rgba(124,58,237,0.25)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.3)" }
                  : { color: "#94A3B8" }
              }
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content — always mounted to preserve state across tab switches */}
        <div style={{ display: tab === "analyse" ? "block" : "none" }}>
          <StreamingAnalysis companySlug={company.id} companyName={company.name} />
        </div>
        <div style={{ display: tab === "use-cases" ? "block" : "none" }}>
          <UseCaseCards useCases={company.useCases} companyName={company.name} />
        </div>
        <div style={{ display: tab === "contacts" ? "block" : "none" }}>
          <ContactFinder companySlug={company.id} companyName={company.name} knownLeader={company.knownLeader} knownLeaderTitle={company.knownLeaderTitle} />
        </div>
        <div style={{ display: tab === "concurrents" ? "block" : "none" }}>
          <CompetitorMatrix companySlug={company.id} companyName={company.name} />
        </div>
      </div>

      {showModal && (
        <DemoBuilderModal company={company} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
