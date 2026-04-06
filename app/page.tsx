import { Sparkles, TrendingUp, Brain, Target } from "lucide-react";
import Header from "@/components/Header";
import CAC40Grid from "@/components/CAC40Grid";
import { CAC40_COMPANIES } from "@/lib/cac40-data";

export default function Home() {
  const avgScore = Math.round(CAC40_COMPANIES.reduce((s, c) => s + c.score, 0) / CAC40_COMPANIES.length);
  const veryBullish = CAC40_COMPANIES.filter((c) => c.score >= 75).length;
  const avgTrend = Math.round(CAC40_COMPANIES.reduce((s, c) => s + c.trend, 0) / CAC40_COMPANIES.length);
  const totalUseCases = CAC40_COMPANIES.reduce((s, c) => s + c.useCases.length, 0);

  return (
    <div className="min-h-screen" style={{ background: "#0F0F1A" }}>
      <Header />

      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6"
              style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A855F7" }}>
              <Sparkles size={12} />
              Analyse en temps réel du potentiel GenAI du CAC40 — une proposition de Vincent Méoc — Powered by Claude Anthropic
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              <span className="gradient-text">CAC40 GenAI Scout</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#94A3B8" }}>
              Identifiez les <strong className="text-white">meilleurs prospects GenAI</strong> parmi les 40 plus grandes
              entreprises françaises. Analyses en streaming par Claude, use cases détaillés et contacts clés.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Brain, label: "Score moyen GenAI", value: `${avgScore}/100`, color: "#7C3AED" },
              { icon: TrendingUp, label: "Très bullish GenAI", value: `${veryBullish} entreprises`, color: "#10B981" },
              { icon: Sparkles, label: "Croissance IA moy.", value: `+${avgTrend}% vs 2024`, color: "#06B6D4" },
              { icon: Target, label: "Use cases identifiés", value: `${totalUseCases}+`, color: "#F59E0B" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="rounded-xl p-4 text-center"
                style={{ background: "rgba(30,30,53,0.6)", border: "1px solid rgba(45,45,80,0.8)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${color}20` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="text-xl font-bold text-white mb-1">{value}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <CAC40Grid />
      </div>

      {/* Footer */}
      <footer className="border-t py-10" style={{ borderColor: "rgba(45,45,80,0.5)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-white mb-1">CAC40 GenAI Scout</p>
              <p className="text-xs" style={{ color: "#64748B" }}>
                Une idée de{" "}
                <a href="https://whyme4anthropic.vmcloud.fr/" target="_blank" rel="noopener noreferrer"
                  className="font-medium hover:opacity-80 transition-opacity" style={{ color: "#A855F7" }}>
                  Vincent Méoc
                </a>
                {" "}— Solutions Architect, Applied AI
              </p>
            </div>
            <div className="flex items-center gap-5 text-xs" style={{ color: "#94A3B8" }}>
              <a href="https://whyme4anthropic.vmcloud.fr/" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-1">
                <span>🤖</span> Pourquoi Vincent ?
              </a>
              <a href="https://www.linkedin.com/in/vincent-meoc/" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity">
                LinkedIn
              </a>
              <a href="https://ai.vmcloud.fr/" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity">
                Blog IA
              </a>
              <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity" style={{ color: "#7C3AED" }}>
                Anthropic
              </a>
            </div>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: "#475569" }}>
            Données indicatives basées sur sources publiques · Propulsé par{" "}
            <a href="https://anthropic.com/claude" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-80" style={{ color: "#7C3AED" }}>Claude API</a>
            {" "}+{" "}
            <a href="https://tavily.com" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-80" style={{ color: "#06B6D4" }}>Tavily Search</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
