"use client";
import Link from "next/link";
import { Brain, Zap, ExternalLink } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b" style={{ borderColor: "rgba(45,45,80,0.8)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center glow-accent"
              style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
              <Brain size={18} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight">CAC40 GenAI Scout</span>
              <span className="hidden sm:block text-xs" style={{ color: "#94A3B8" }}>
                Powered by Claude · Anthropic
              </span>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Made by badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs" style={{ color: "#64748B" }}>
              <span>by</span>
              <a
                href="https://whyme4anthropic.vmcloud.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#A855F7" }}
              >
                Vincent Méoc
                <ExternalLink size={10} />
              </a>
              <span className="mx-1" style={{ color: "rgba(45,45,80,0.8)" }}>|</span>
              <a href="https://www.linkedin.com/in/vincent-meoc/" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity" style={{ color: "#94A3B8" }}>
                LinkedIn
              </a>
              <span>·</span>
              <a href="https://ai.vmcloud.fr/" target="_blank" rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity" style={{ color: "#94A3B8" }}>
                Blog IA
              </a>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06B6D4" }}>
              <Zap size={12} className="fill-current" />
              <span>40 companies analyzed</span>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
