"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RoleSwitcher } from "@/components/shell/RoleSwitcher";
import { PathFrame, ThreeColumns } from "@/components/paths/PathFrame";
import { Bullets } from "@/components/paths/Bullets";
import { useT } from "@/lib/i18n";

export default function AnalystPath() {
  const [risk, setRisk] = useState(50);
  const { t } = useT();

  const outcome = risk < 35
    ? { label: t("an.out.low.label"), color: "alarm", body: t("an.out.low.body") }
    : risk < 65
    ? { label: t("an.out.mid.label"), color: "phos", body: t("an.out.mid.body") }
    : { label: t("an.out.high.label"), color: "insight", body: t("an.out.high.body") };

  return (
    <>
      <RoleSwitcher />
      <PathFrame
        no="§03b"
        role={t("roleTitle.detection")}
        layer={t("layer.procedural")}
        title={t("an.title")}
      >
        <ThreeColumns
          happened={<Bullets items={[t("an.happened1"), t("an.happened2"), t("an.happened3")]} />}
          reveals={<Bullets items={[t("an.reveals1"), t("an.reveals2"), t("an.reveals3")]} tone="insight" />}
          changes={<Bullets items={[t("an.changes1")]} tone="phos" />}
        />

        {/* What-if slider */}
        <section className="mt-20">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-2">{t("an.cfLabel")}</div>
          <h2 className="font-display text-4xl tracking-tightest mb-2">{t("an.cfTitle")}</h2>
          <p className="text-sm text-fg/55 mb-6">{t("an.cfHint")}</p>

          <div className="bordr bg-bg-0 p-5 font-mono text-xs space-y-1 max-w-3xl">
            <div className="text-fg/40">{">"} ai_threat_analyser --analyse phishing_renewal.eml</div>
            <div className="text-fg/40">{">"} parsing headers... corporate_tone=match, urgency=low, ssl=valid</div>
            <div className="text-phos">{">"} risk_score = <span className="text-3xl font-display align-middle">{risk}</span> / 100</div>
            <div className="text-fg/40">{">"} {t("an.verdict")} {outcome.label}</div>
          </div>

          <div className="mt-4 max-w-3xl">
            <input
              type="range"
              min={0} max={100} value={risk}
              onChange={(e) => setRisk(Number(e.target.value))}
              className="w-full accent-phos cursor-pointer h-2"
            />
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-fg/40 mt-1">
              <span>{t("an.range.low")}</span><span>{t("an.range.mid")}</span><span>{t("an.range.high")}</span>
            </div>
          </div>

          <motion.div
            key={outcome.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 border-l-2 p-5 max-w-3xl ${
              outcome.color === "alarm" ? "border-alarm bg-alarm/5"
              : outcome.color === "phos" ? "border-phos bg-phos/5"
              : "border-insight bg-insight/5"
            }`}
          >
            <p className="text-fg/85 leading-relaxed">{outcome.body}</p>
          </motion.div>
        </section>

        <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
          <Link href="/paths/operations" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← {t("an.navPrev")}</Link>
          <Link href="/paths/leadership" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">{t("an.navNext")} →</Link>
        </div>
      </PathFrame>
    </>
  );
}
