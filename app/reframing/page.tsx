"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Quote } from "@/components/primitives/Quote";
import { GlitchText } from "@/components/primitives/GlitchText";
import { Q } from "@/content/dossier";
import { useT } from "@/lib/i18n";

export default function Reframing() {
  const { t } = useT();
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="font-mono text-[10px] uppercase tracking-widest text-insight mb-3">
          <span className="text-insight">●</span> {t("rf.label")}
        </div>

        <h1 className="font-display text-5xl md:text-7xl tracking-tightest leading-[0.95]">
          {t("rf.h1a")} <GlitchText className="text-insight">{t("rf.h1b")}</GlitchText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 font-display text-3xl md:text-5xl tracking-tightest text-fg/80 leading-tight"
        >
          {t("rf.subA")} <span className="text-insight">{t("rf.subEm1")}</span> {t("rf.subMid")}{" "}
          <span className="text-phos italic">{t("rf.subEm2")}</span>
        </motion.p>

        <div className="mt-16 space-y-8">
          <ClosingClaim n="01" body={<Quote q={Q.learningOrientation} />} />
          <ClosingClaim n="02" body={<Quote q={Q.automationBias} />} />
          <ClosingClaim n="03" body={<Quote q={Q.staffNotCareless} />} />
        </div>

        {/* Frame towards trust/innovation */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 border border-phos/30 bg-phos/[0.04] p-6"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-phos mb-3">{t("rf.closeLabel")}</div>
          <p className="font-display text-2xl tracking-tightest leading-snug text-fg">
            {t("rf.closeTitle")}
            <span className="block mt-2 text-fg/70">{t("rf.closeTitleB")} <span className="text-phos">{t("rf.closeTrust")}</span> {t("rf.closeAnd")} <span className="text-insight">{t("rf.closeInnovation")}</span> {t("rf.closeBecome")}</span>
          </p>
          <p className="mt-4 text-fg/60 text-sm leading-relaxed">
            {t("rf.closeBody")}
          </p>
        </motion.div>

        {/* Legend */}
        <div className="mt-16 pt-8 border-t border-fg/10">
          <div className="font-mono text-[10px] uppercase tracking-widest text-fg/40 mb-3">{t("rf.legendLabel")}</div>
          <ul className="grid sm:grid-cols-3 gap-3 text-sm">
            <li className="border-t-2 border-phos/40 p-3 bg-bg-1/30">
              <span className="font-mono text-[10px] text-phos">{t("rf.legend.E")}</span>
              <p className="text-fg/70 mt-1">{t("rf.legend.E.desc")}</p>
            </li>
            <li className="border-t-2 border-insight/40 p-3 bg-bg-1/30">
              <span className="font-mono text-[10px] text-insight">{t("rf.legend.I")}</span>
              <p className="text-fg/70 mt-1">{t("rf.legend.I.desc")}</p>
            </li>
            <li className="border-t-2 border-amber/40 p-3 bg-bg-1/30">
              <span className="font-mono text-[10px] text-amber">{t("rf.legend.S")}</span>
              <p className="text-fg/70 mt-1">{t("rf.legend.S.desc")}</p>
            </li>
          </ul>
        </div>

        <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
          <Link href="/paths/leadership" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">{t("rf.navPrev")}</Link>
          <Link href="/" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">{t("rf.navNext")}</Link>
        </div>
      </motion.div>
    </div>
  );
}

function ClosingClaim({ n, body }: { n: string; body: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
      className="flex gap-4"
    >
      <div className="font-mono text-xs text-fg/30 pt-2 shrink-0">[{n}]</div>
      <div className="flex-1">{body}</div>
    </motion.div>
  );
}
