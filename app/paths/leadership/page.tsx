"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RoleSwitcher } from "@/components/shell/RoleSwitcher";
import { PathFrame } from "@/components/paths/PathFrame";
import { useT } from "@/lib/i18n";

export default function LeadershipPath() {
  const [view, setView] = useState<"before" | "after">("before");
  const { t } = useT();
  return (
    <>
      <RoleSwitcher />
      <PathFrame
        no="§03c"
        role={t("roleTitle.governance")}
        layer={t("layer.organisational")}
        title={t("ld.title")}
      >
        <p className="mt-8 max-w-2xl text-fg/75 text-base leading-relaxed">{t("ld.intro")}</p>

        {/* Two ways to close */}
        <section className="mt-12">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-4">{t("ld.framedLabel")}</div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            <div className="border-t-2 border-alarm/40 bg-bg-1/40 p-5">
              <p className="font-display text-2xl tracking-tightest text-alarm">{t("ld.framedA")}</p>
              <p className="mt-2 text-sm text-fg/70 leading-relaxed">{t("ld.framedAbody")}</p>
            </div>
            <div className="border-t-2 border-phos/40 bg-bg-1/40 p-5">
              <p className="font-display text-2xl tracking-tightest text-phos">{t("ld.framedB")}</p>
              <p className="mt-2 text-sm text-fg/70 leading-relaxed">{t("ld.framedBbody")}</p>
            </div>
          </div>
        </section>

        {/* Intervention, example figures */}
        <section className="mt-12">
          <p className="max-w-2xl text-sm text-fg/55 mb-4">{t("ld.exampleNote")}</p>
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-3">{t("ld.interventionLabel")}</div>

          <div className="flex gap-2 mb-4">
            {(["before", "after"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 border font-mono text-[11px] uppercase tracking-wider transition-all ${
                view === v ? "border-phos text-phos bg-phos/10" : "border-fg/30 text-fg/70 hover:border-insight hover:text-insight"
              }`}>
                {v === "before" ? t("ld.toggle.before") : t("ld.toggle.after")}
              </button>
            ))}
          </div>

          <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-3 gap-4 max-w-3xl">
            {view === "before" ? (
              <>
                <Stat label={t("ld.stat.compromised")} value="40" tone="alarm" />
                <Stat label={t("ld.stat.lag")} value={t("ld.stat.lag.val")} tone="alarm" />
                <Stat label={t("ld.stat.oob")} value={t("ld.stat.oob.none")} tone="alarm" />
              </>
            ) : (
              <>
                <Stat label={t("ld.stat.cost")} value="€45,000" tone="phos" />
                <Stat label={t("ld.stat.friction")} value={t("ld.stat.friction.val")} tone="amber" />
                <Stat label={t("ld.stat.oob")} value={t("ld.stat.oob.auth")} tone="phos" />
              </>
            )}
          </motion.div>
        </section>

        <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
          <Link href="/paths/analyst" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← {t("ld.navPrev")}</Link>
          <Link href="/" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">↻ {t("ld.navNext")}</Link>
        </div>
      </PathFrame>
    </>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "alarm" | "phos" | "amber" | "insight" }) {
  const toneCls = {
    alarm: "border-alarm/40 text-alarm",
    phos: "border-phos/40 text-phos",
    amber: "border-amber/40 text-amber",
    insight: "border-insight/40 text-insight",
  }[tone];
  return (
    <div className={`border-t-2 ${toneCls} bg-bg-1/40 p-5`}>
      <div className="font-mono text-[10px] uppercase tracking-widest text-fg/40 mb-2">{label}</div>
      <div className={`font-display text-4xl tracking-tightest ${toneCls.split(" ")[1]}`}>{value}</div>
    </div>
  );
}
