"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionBanner } from "@/components/shell/SectionBanner";
import { Quote } from "@/components/primitives/Quote";
import { ReflectionPoint } from "@/components/mechanism/ReflectionPoint";
import { IconRoutine, IconSocialProof, IconParadox, IconShadow } from "@/components/mechanism/MechanismIcon";
import { Q } from "@/content/dossier";
import { useT } from "@/lib/i18n";

const MECHS = [
  {
    id: "routine",
    tk: "m1",
    no: "M·01",
    theorist: "Nelson & Winter",
    icon: <IconRoutine />,
    accent: "insight",
    quotes: ["temporalAlignment", "nelsonWinter"] as const,
  },
  {
    id: "social-proof",
    tk: "m2",
    no: "M·02",
    theorist: "Cialdini + diffusion of responsibility",
    icon: <IconSocialProof />,
    accent: "phos",
    quotes: ["socialProofFact", "diffusion"] as const,
  },
  {
    id: "paradox",
    tk: "m3",
    no: "M·03",
    theorist: "Goffman — impression management",
    icon: <IconParadox />,
    accent: "alarm",
    quotes: ["standardisationParadox", "goffman", "staffNotCareless"] as const,
  },
  {
    id: "shadow",
    tk: "m4",
    no: "M·04",
    theorist: "Mintzberg — structural shadow",
    icon: <IconShadow />,
    accent: "amber",
    quotes: ["mintzbergShadow", "twoTier"] as const,
  },
] as const;

export default function Mechanisms() {
  const { t } = useT();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionBanner mode="interpretation" no="§02" title={t("mech.title")} />

      <p className="max-w-3xl text-fg/70 text-lg leading-relaxed mb-12">
        {t("mech.intro")} <span className="text-insight">{t("mech.introEm")}</span> {t("mech.introB")}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {MECHS.map((m, i) => (
          <motion.section
            key={m.id}
            id={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: (i % 2) * 0.1 }}
            className="bordr bg-bg-1/40 p-6 hover:border-insight/40 transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0">{m.icon}</div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-fg/40">{m.no} · {m.theorist}</div>
                <h2 className="font-display text-3xl tracking-tightest mt-1 leading-tight">{t(`mech.${m.tk}.title` as any)}</h2>
              </div>
            </div>
            <div className="space-y-4">
              {m.quotes.map((k) => (
                <Quote key={k} q={Q[k]} />
              ))}
            </div>
            <ReflectionPoint
              prompt={t(`mech.${m.tk}.prompt` as any)}
              options={[
                { text: t(`mech.${m.tk}.o1` as any), feedback: t(`mech.${m.tk}.f1` as any) },
                { text: t(`mech.${m.tk}.o2` as any), feedback: t(`mech.${m.tk}.f2` as any) },
                { text: t(`mech.${m.tk}.o3` as any), feedback: t(`mech.${m.tk}.f3` as any) },
              ]}
            />
          </motion.section>
        ))}
      </div>

      {/* Positive mechanism callout */}
      <section className="mt-16 border border-phos/30 bg-phos/[0.04] p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-phos mb-2">{t("mech.positiveLabel")}</div>
        <h3 className="font-display text-3xl tracking-tightest mb-4">{t("mech.positiveTitle")}</h3>
        <Quote q={Q.automationBias} />
        <div className="mt-3">
          <Quote q={Q.automationAccepting} />
        </div>
      </section>

      <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
        <Link href="/reconstruction" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">{t("mech.navPrev")}</Link>
        <Link href="/paths/operations" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">{t("mech.navNext")}</Link>
      </div>
    </div>
  );
}
