"use client";
import { cn } from "@/lib/utils";

const styles = {
  E: { label: "EVIDENCE", cls: "text-phos border-phos/40 bg-phos/5" },
  I: { label: "INFERENCE", cls: "text-insight border-insight/40 bg-insight/5" },
  S: { label: "SIMULATION", cls: "text-amber border-amber/40 bg-amber/5" },
};

export function EvidenceTag({ type, source }: { type: "E" | "I" | "S"; source?: string }) {
  const s = styles[type];
  return (
    <span
      title={source ? `${s.label} — ${source}` : s.label}
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider border rounded-sm",
        s.cls
      )}
    >
      <span className="opacity-60">[</span>
      {type}
      <span className="opacity-60">]</span>
    </span>
  );
}
