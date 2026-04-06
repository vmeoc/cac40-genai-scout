"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Loader2, Shield, Star, ExternalLink } from "lucide-react";

interface Contact {
  name: string;
  title: string;
  department: string;
  confidence: "high" | "medium" | "low";
  source: string;
  talkingPoints: string[];
}

interface Props {
  companySlug: string;
  companyName: string;
  knownLeader?: string;
  knownLeaderTitle?: string;
}

const CONFIDENCE_CONFIG = {
  high: { label: "Reliable", color: "#10B981", stars: 3 },
  medium: { label: "Likely", color: "#F59E0B", stars: 2 },
  low: { label: "Uncertain", color: "#94A3B8", stars: 1 },
};

export default function ContactFinder({ companySlug, companyName }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const findContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts?slug=${companySlug}`);
      const data = await res.json() as { contacts: Contact[] };
      setContacts(data.contacts || []);
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  if (!done && !loading) {
    return (
      <div className="rounded-xl p-8 text-center"
        style={{ background: "rgba(30,30,53,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <Users size={32} className="mx-auto mb-3" style={{ color: "#7C3AED" }} />
        <h3 className="text-white font-semibold mb-2">Find AI Contacts</h3>
        <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
          Search for CDOs, Chief AI Officers, VP Digital at {companyName} via public sources.
        </p>
        <div className="flex items-center gap-2 text-xs justify-center mb-4" style={{ color: "#64748B" }}>
          <Shield size={12} />
          <span>Public information only · GDPR compliant</span>
        </div>
        <button
          onClick={findContacts}
          className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
        >
          Search for contacts →
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl p-8 flex items-center justify-center gap-3"
        style={{ background: "rgba(30,30,53,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <Loader2 size={20} className="animate-spin" style={{ color: "#7C3AED" }} />
        <span style={{ color: "#94A3B8" }}>Searching...</span>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="rounded-xl p-6 text-center"
        style={{ background: "rgba(30,30,53,0.5)", border: "1px solid rgba(45,45,80,0.8)" }}>
        <p className="text-sm" style={{ color: "#94A3B8" }}>
          No contacts found in public sources for {companyName}.
        </p>
        <button onClick={findContacts} className="mt-4 text-sm" style={{ color: "#7C3AED" }}>
          Retry →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "#94A3B8" }}>
          {contacts.length} contact{contacts.length > 1 ? "s" : ""} identified
        </span>
        <div className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}>
          <Shield size={11} />
          Public sources only
        </div>
      </div>

      {contacts.map((c, i) => {
        const conf = CONFIDENCE_CONFIG[c.confidence] || CONFIDENCE_CONFIG.low;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl p-4"
            style={{ background: "rgba(30,30,53,0.6)", border: "1px solid rgba(45,45,80,0.8)" }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-white font-semibold text-sm">{c.name}</h4>
                <p className="text-xs mt-0.5" style={{ color: "#A855F7" }}>{c.title}</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>{c.department}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, si) => (
                    <Star key={si} size={10} fill={si < conf.stars ? conf.color : "transparent"}
                      style={{ color: conf.color }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: conf.color }}>{conf.label}</span>
              </div>
            </div>

            {c.talkingPoints?.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium mb-1" style={{ color: "#94A3B8" }}>Talking points:</p>
                {c.talkingPoints.map((tp, j) => (
                  <div key={j} className="flex gap-2 text-xs py-0.5">
                    <span style={{ color: "#7C3AED" }}>▸</span>
                    <span style={{ color: "#CBD5E1" }}>{tp}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}>
              <ExternalLink size={10} />
              <span>{c.source}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
