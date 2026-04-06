"use client";
import { motion } from "framer-motion";
import { UseCase } from "@/lib/cac40-data";
import { CheckCircle, Clock, Megaphone } from "lucide-react";

const STATUS_CONFIG = {
  production: { label: "EN PROD", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", Icon: CheckCircle },
  pilot: { label: "PILOTE", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", Icon: Clock },
  announced: { label: "ANNONCÉ", color: "#06B6D4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.3)", Icon: Megaphone },
};

interface Props {
  useCases: UseCase[];
  companyName: string;
}

export default function UseCaseCards({ useCases, companyName }: Props) {
  const byStatus = {
    production: useCases.filter((u) => u.status === "production"),
    pilot: useCases.filter((u) => u.status === "pilot"),
    announced: useCases.filter((u) => u.status === "announced"),
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {Object.entries(byStatus).map(([status, items]) => {
          const { label, color } = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
          return items.length > 0 ? (
            <div key={status} className="flex items-center gap-1.5 text-xs">
              <span className="font-bold" style={{ color }}>{items.length}</span>
              <span style={{ color: "#94A3B8" }}>{label}</span>
            </div>
          ) : null;
        })}
        <span className="ml-auto text-xs" style={{ color: "#94A3B8" }}>
          Basé sur sources publiques · {companyName}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {useCases.map((uc, i) => {
          const { label, color, bg, border, Icon } = STATUS_CONFIG[uc.status];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-lg p-4"
              style={{ background: "rgba(30,30,53,0.6)", border: "1px solid rgba(45,45,80,0.8)" }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-semibold text-white leading-tight">{uc.title}</h4>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: bg, color, border: `1px solid ${border}` }}>
                  <Icon size={9} />
                  {label}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#94A3B8" }}>{uc.description}</p>
              <span className="text-xs px-2 py-0.5 rounded"
                style={{ background: "rgba(45,45,80,0.6)", color: "#64748B" }}>
                {uc.department}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
