"use client";
import { cn } from "@/lib/utils";

type Mode = "reconstruction" | "interpretation" | "scenario" | "reframe";

const MODES: Record<Mode, { label: string; color: string; sub: string }> = {
  reconstruction: { label: "MODE: RECONSTRUCTION", color: "phos", sub: "facts only — interpretation begins in §02" },
  interpretation: { label: "MODE: INTERPRETATION", color: "insight", sub: "Nelson & Winter · Cialdini · Goffman · Mintzberg" },
  scenario: { label: "MODE: SCENARIO", color: "amber", sub: "no game over — every branch reveals a mechanism" },
  reframe: { label: "MODE: REFRAME", color: "insight", sub: "naming what \"functioned as designed\" left unnamed" },
};

export function SectionBanner({ mode, title, no }: { mode: Mode; title: string; no: string }) {
  const m = MODES[mode];
  const colorCls: Record<string, string> = {
    phos: "text-phos border-phos/40",
    insight: "text-insight border-insight/40",
    amber: "text-amber border-amber/40",
  };
  return (
    <div className="border-b border-fg/10 pb-6 mb-10">
      <div className={cn("inline-flex items-center gap-2 px-2 py-1 border font-mono text-[10px] uppercase tracking-widest", colorCls[m.color])}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        {m.label}
      </div>
      <h1 className="font-display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tightest">
        <span className="text-fg/30 font-mono text-2xl md:text-3xl align-top">{no}</span>{" "}
        {title}
      </h1>
      <p className="mt-3 text-fg/50 font-mono text-xs uppercase tracking-wider">{m.sub}</p>
    </div>
  );
}
