"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionBanner } from "@/components/shell/SectionBanner";
import { ReflectionPoint } from "@/components/mechanism/ReflectionPoint";
import { IconRoutine, IconSocialProof, IconShadow } from "@/components/mechanism/MechanismIcon";
import { useT } from "@/lib/i18n";

const RULES = [
  { tk: "rule1", no: "R·01", icon: <IconRoutine /> },
  { tk: "rule2", no: "R·02", icon: <IconSocialProof /> },
  { tk: "rule3", no: "R·03", icon: <IconShadow /> },
] as const;

export default function Rules() {
  const { t } = useT();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SectionBanner mode="interpretation" no="§02" title={t("rules.title")} />

      <p className="max-w-2xl text-fg/70 text-base leading-relaxed mb-12">
        {t("rules.intro")} <span className="text-insight">{t("rules.introEm")}</span> {t("rules.introB")}
      </p>

      <div className="space-y-8">
        {RULES.map((r, i) => (
          <motion.section
            key={r.tk}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.05 }}
            className="bordr bg-bg-1/40 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0">{r.icon}</div>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-fg/40">{r.no}</div>
                <h2 className="font-display text-3xl tracking-tightest mt-1 leading-tight">{t(`${r.tk}.t` as any)}</h2>
              </div>
            </div>

            <div className="mt-4 border-l-2 border-phos/50 bg-phos/[0.04] pl-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-phos block mb-1">{t("rules.ruleLabel")}</span>
              <p className="text-fg/85 text-sm leading-relaxed">{t(`${r.tk}.rule` as any)}</p>
            </div>

            <div className="mt-3 flex items-start gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-insight shrink-0 mt-1">{t("rules.exampleLabel")}</span>
              <p className="text-[13px] text-fg/65 leading-snug">{t(`${r.tk}.ex` as any)}</p>
            </div>

            <ReflectionPoint
              prompt={t(`${r.tk}.prompt` as any)}
              options={[
                { text: t(`${r.tk}.o1` as any), feedback: t(`${r.tk}.f1` as any) },
                { text: t(`${r.tk}.o2` as any), feedback: t(`${r.tk}.f2` as any) },
                { text: t(`${r.tk}.o3` as any), feedback: t(`${r.tk}.f3` as any) },
              ]}
            />
          </motion.section>
        ))}
      </div>

      {/* A norm that worked */}
      <section className="mt-10 border border-phos/30 bg-phos/[0.04] p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-phos mb-2">{t("rules.positiveLabel")}</div>
        <p className="text-fg/85 text-sm leading-relaxed">{t("rules.positiveBody")}</p>
      </section>

      <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
        <Link href="/reconstruction" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← {t("rules.navPrev")}</Link>
        <Link href="/paths/operations" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">{t("rules.navNext")} →</Link>
      </div>
    </div>
  );
}
