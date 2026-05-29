"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useT } from "@/lib/i18n";

export function PathFrame({ no, role, layer, title, children }: { no: string; role: string; layer: string; title: string; children: ReactNode }) {
  const { t } = useT();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="font-mono text-[10px] uppercase tracking-widest text-phos/80 mb-2">
          <span className="text-phos">●</span> {no} · {t("path.rolePath")} · {role}
        </div>
        <h1 className="font-display text-5xl md:text-7xl tracking-tightest leading-[0.95]">{title}</h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-insight">{layer}</p>
      </motion.div>
      {children}
    </div>
  );
}

export function ThreeColumns({ happened, reveals, changes }: { happened: ReactNode; reveals: ReactNode; changes: ReactNode }) {
  const { t } = useT();
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      {[
        { label: t("col.happened"), body: happened, color: "border-fg/30 text-fg/60" },
        { label: t("col.reveals"), body: reveals, color: "border-insight/40 text-insight" },
        { label: t("col.changes"), body: changes, color: "border-phos/40 text-phos" },
      ].map((c) => (
        <div key={c.label} className={`border-t-2 ${c.color.split(" ")[0]} bg-bg-1/40 p-5`}>
          <div className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${c.color.split(" ")[1]}`}>{c.label}</div>
          <div className="space-y-3 text-fg/85 text-sm leading-relaxed">{c.body}</div>
        </div>
      ))}
    </div>
  );
}
