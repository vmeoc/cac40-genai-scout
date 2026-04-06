"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, TrendingUp, X } from "lucide-react";
import { CAC40_COMPANIES, SECTORS } from "@/lib/cac40-data";
import CompanyCard from "./CompanyCard";

type SortKey = "score" | "trend" | "name";

export default function CAC40Grid() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [sort, setSort] = useState<SortKey>("score");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let list = [...CAC40_COMPANIES];
    if (sector !== "All") list = list.filter((c) => c.sector === sector);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q));
    }
    if (sort === "score") list.sort((a, b) => b.score - a.score);
    else if (sort === "trend") list.sort((a, b) => b.trend - a.trend);
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, sector, sort]);

  const displayed = showAll ? filtered : filtered.slice(0, 12);
  const topCount = CAC40_COMPANIES.filter((c) => c.score >= 75).length;

  return (
    <div>
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
          <span className="font-bold text-white">{CAC40_COMPANIES.length}</span> companies
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: "#10B981" }}>
          <TrendingUp size={14} />
          <span className="font-bold">{topCount}</span> highly bullish on GenAI
        </div>
        <div className="ml-auto text-xs" style={{ color: "#94A3B8" }}>
          Last updated · Apr 2025
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a company..."
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none focus:ring-1 transition-all"
            style={{
              background: "rgba(30,30,53,0.8)",
              border: "1px solid rgba(45,45,80,0.8)",
              color: "#F1F5F9",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={12} style={{ color: "#94A3B8" }} />
            </button>
          )}
        </div>

        {/* Sector filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} style={{ color: "#94A3B8" }} />
          <div className="flex flex-wrap gap-2">
            {["All", ...SECTORS].map((s) => (
              <button
                key={s}
                onClick={() => setSector(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={
                  sector === s
                    ? { background: "rgba(124,58,237,0.3)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.5)" }
                    : { background: "rgba(30,30,53,0.8)", color: "#94A3B8", border: "1px solid rgba(45,45,80,0.8)" }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="px-3 py-1.5 rounded-lg text-xs outline-none"
          style={{
            background: "rgba(30,30,53,0.8)",
            border: "1px solid rgba(45,45,80,0.8)",
            color: "#F1F5F9",
          }}
        >
          <option value="score">Sort by Score</option>
          <option value="trend">Sort by Trend</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Results count */}
      {filtered.length !== CAC40_COMPANIES.length && (
        <p className="text-xs mb-4" style={{ color: "#94A3B8" }}>
          {filtered.length} result{filtered.length > 1 ? "s" : ""} for these criteria
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayed.map((company, i) => {
          const rank = filtered.indexOf(company) + 1;
          return <CompanyCard key={company.id} company={company} index={i} rank={rank} />;
        })}
      </div>

      {/* Show more */}
      {!showAll && filtered.length > 12 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: "rgba(30,30,53,0.8)",
              border: "1px solid rgba(45,45,80,0.8)",
              color: "#F1F5F9",
            }}
          >
            Show {filtered.length - 12} more companies →
          </button>
        </div>
      )}
    </div>
  );
}
