"use client";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

type Mode = "reconstruction" | "interpretation" | "scenario" | "reframe";

const MODES: Record<Mode, { labelKey: any; subKey: any; color: string }> = {
  reconstruction: { labelKey: "banner.reconstruction.label", subKey: "banner.reconstruction.sub", color: "phos" },
  interpretation: { labelKey: "banner.interpretation.label", subKey: "banner.interpretation.sub", color: "insight" },
  scenario: { labelKey: "banner.scenario.label", subKey: "banner.scenario.sub", color: "amber" },
  reframe: { labelKey: "banner.reframe.label", subKey: "banner.reframe.sub", color: "insight" },
};

export function SectionBanner({ mode, title, no }: { mode: Mode; title: string; no: string }) {
  const { t } = useT();
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
        {t(m.labelKey)}
      </div>
      <h1 className="font-display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tightest">
        <span className="text-fg/30 font-mono text-2xl md:text-3xl align-top">{no}</span>{" "}
        {title}
      </h1>
      <p className="mt-3 text-fg/50 font-mono text-xs uppercase tracking-wider">{t(m.subKey)}</p>
    </div>
  );
}
