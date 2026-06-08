"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { NetworkBackground } from "@/components/three/NetworkBackground";
import { GlitchText } from "@/components/primitives/GlitchText";
import { useT } from "@/lib/i18n";

const ROLES = [
  { code: "03a", titleKey: "roleTitle.operations", layerKey: "layer.social", href: "/paths/operations" },
  { code: "03b", titleKey: "roleTitle.detection", layerKey: "layer.procedural", href: "/paths/analyst" },
  { code: "03c", titleKey: "roleTitle.governance", layerKey: "layer.organisational", href: "/paths/leadership" },
] as const;

const ITINERARY = [
  { no: "01", href: "/reconstruction", labelKey: "it01.label", descKey: "it01.desc" },
  { no: "02", href: "/mechanisms", labelKey: "it02.label", descKey: "it02.desc" },
  { no: "03", href: "/paths/operations", labelKey: "it03.label", descKey: "it03.desc" },
] as const;

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Landing() {
  const { t } = useT();
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <NetworkBackground />

      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <div className="font-mono text-[11px] uppercase tracking-widest text-phos/80 mb-4">
            <span className="text-phos">●</span> {t("landing.eyebrow")}
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tightest text-fg">
            Functioning as Designed
            <GlitchText className="text-phos">?</GlitchText>
          </h1>
          <p className="mt-6 max-w-2xl text-fg/70 text-lg leading-relaxed">
            {t("landing.leadA")} <em className="text-insight not-italic">{t("landing.leadEm")}</em> {t("landing.leadB")}
          </p>

          {/* Disclaimer */}
          <div className="mt-8 max-w-2xl border-l-2 border-phos/60 pl-4 py-3 bg-phos/[0.04]">
            <span className="font-mono text-[11px] text-phos uppercase tracking-wider block mb-1">{t("landing.principleLabel")}</span>
            <p className="text-sm text-fg/80 leading-relaxed">
              {t("landing.principleA")} <strong className="text-fg">{t("landing.principleNot")}</strong> {t("landing.principleB")}
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/reconstruction" className="px-5 py-3 bordr-phos bg-phos/10 text-phos font-mono text-xs uppercase tracking-wider hover:bg-phos/20 transition-colors flex items-center gap-2">
              {t("landing.ctaStart")} <span aria-hidden>→</span>
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-wider text-fg/40">
              {t("landing.ctaMeta")}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ITINERARY — makes the linear flow explicit */}
      <section className="relative max-w-5xl mx-auto px-6 pb-16">
        <div className="font-mono text-[11px] uppercase tracking-widest text-fg/40 mb-4">{t("landing.walkLabel")}</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ITINERARY.map((s, i) => (
            <motion.div key={s.no} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>
              <Link href={s.href} className="group block h-full bordr bg-bg-1/40 backdrop-blur-sm p-4 hover:border-phos/50 hover:bg-bg-1/70 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="grid place-items-center w-7 h-7 rounded-full border border-fg/25 font-mono text-[11px] text-fg/60 group-hover:border-phos group-hover:text-phos transition-colors">{s.no}</span>
                  <span className="font-mono text-fg/30 group-hover:text-phos group-hover:translate-x-1 transition-all">→</span>
                </div>
                <div className="font-display text-xl tracking-tightest group-hover:text-phos transition-colors">{t(s.labelKey)}</div>
                <p className="mt-1.5 text-[13px] text-fg/55 leading-snug">{t(s.descKey)}</p>
                <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-fg/35 group-hover:text-phos transition-colors">
                  <span className="grid place-items-center w-4 h-4 rounded-full border border-current">›</span> {t("landing.clickHint")}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROLE SHORTCUTS */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="font-mono text-[11px] uppercase tracking-widest text-fg/40 mb-4">
          {t("landing.roleLabel")}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ROLES.map((r, i) => (
            <motion.div key={r.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.07 }}>
              <Link href={r.href} className="group block relative overflow-hidden bordr bg-bg-1/40 backdrop-blur-sm p-6 hover:border-insight/60 transition-all hover:bg-bg-1/80">
                <div className="font-mono text-xs text-fg/40 mb-2">[{r.code}]</div>
                <div className="font-display text-2xl tracking-tightest mb-2 group-hover:text-insight transition-colors">{t(r.titleKey)}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-insight">{t(r.layerKey)}</div>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-fg/40 group-hover:text-insight">
                  {t("landing.enterPath")} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{
                  background: "radial-gradient(circle at 50% 100%, rgba(124,156,255,0.08), transparent 70%)"
                }}/>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
