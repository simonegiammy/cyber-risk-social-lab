"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { NetworkBackground } from "@/components/three/NetworkBackground";
import { GlitchText } from "@/components/primitives/GlitchText";
import { Q } from "@/content/dossier";

const ROLES = [
  { code: "03a", title: "Operations — Europe", layer: "Social / Cultural vulnerability", href: "/paths/operations" },
  { code: "03b", title: "Detection — Analyst & Lead", layer: "Procedural vulnerability", href: "/paths/analyst" },
  { code: "03c", title: "Governance — Managing Board", layer: "Organisational vulnerability", href: "/paths/leadership" },
];

const ITINERARY = [
  { no: "01", href: "/reconstruction", label: "Reconstruction", desc: "The three days, fact by fact. No interpretation yet." },
  { no: "02", href: "/mechanisms", label: "Mechanisms", desc: "Why it worked — Nelson & Winter, Cialdini, Goffman, Mintzberg." },
  { no: "03", href: "/paths/operations", label: "Perspectives", desc: "The same incident from three roles. Pick yours." },
  { no: "04", href: "/reframing", label: "Reframing", desc: 'What "functioned as designed" left unnamed.' },
];

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Landing() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <NetworkBackground />

      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <div className="font-mono text-[11px] uppercase tracking-widest text-phos/80 mb-4">
            <span className="text-phos">●</span> Group 5 / Semiconductors · annual compliance cycle · phishing campaign
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tightest text-fg">
            Functioning as Designed
            <GlitchText className="text-phos">?</GlitchText>
          </h1>
          <p className="mt-6 max-w-2xl text-fg/70 text-lg leading-relaxed">
            An organisational learning microsite. We re-open a retrospective that closed too cleanly —
            and ask what <em className="text-insight not-italic">"as designed"</em> chose not to name.
          </p>

          {/* Disclaimer */}
          <div className="mt-8 max-w-2xl border-l-2 border-phos/60 pl-4 py-3 bg-phos/[0.04]">
            <span className="font-mono text-[11px] text-phos uppercase tracking-wider block mb-1">PRINCIPLE</span>
            <p className="text-sm text-fg/80 leading-relaxed">
              This is <strong className="text-fg">not</strong> a module about inattention.{" "}
              <span className="text-insight">«&nbsp;{Q.staffNotCareless.text}&nbsp;»</span>
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/reconstruction" className="px-5 py-3 bordr-phos bg-phos/10 text-phos font-mono text-xs uppercase tracking-wider hover:bg-phos/20 transition-colors flex items-center gap-2">
              Start the walkthrough <span aria-hidden>→</span>
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-wider text-fg/40">
              4 sections · ~10 min · or jump to a role below
            </span>
          </div>
        </motion.div>
      </section>

      {/* ITINERARY — makes the linear flow explicit */}
      <section className="relative max-w-5xl mx-auto px-6 pb-16">
        <div className="font-mono text-[11px] uppercase tracking-widest text-fg/40 mb-4">THE WALKTHROUGH · §01 → §04</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ITINERARY.map((s, i) => (
            <motion.div key={s.no} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>
              <Link href={s.href} className="group block h-full bordr bg-bg-1/40 backdrop-blur-sm p-4 hover:border-phos/50 hover:bg-bg-1/70 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="grid place-items-center w-7 h-7 rounded-full border border-fg/25 font-mono text-[11px] text-fg/60 group-hover:border-phos group-hover:text-phos transition-colors">{s.no}</span>
                  <span className="font-mono text-fg/30 group-hover:text-phos group-hover:translate-x-1 transition-all">→</span>
                </div>
                <div className="font-display text-xl tracking-tightest group-hover:text-phos transition-colors">{s.label}</div>
                <p className="mt-1.5 text-[13px] text-fg/55 leading-snug">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROLE SHORTCUTS */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="font-mono text-[11px] uppercase tracking-widest text-fg/40 mb-4">
          OR ENTER BY ROLE · §03 PERSPECTIVES
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ROLES.map((r, i) => (
            <motion.div key={r.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.07 }}>
              <Link href={r.href} className="group block relative overflow-hidden bordr bg-bg-1/40 backdrop-blur-sm p-6 hover:border-insight/60 transition-all hover:bg-bg-1/80">
                <div className="font-mono text-xs text-fg/40 mb-2">[{r.code}]</div>
                <div className="font-display text-2xl tracking-tightest mb-2 group-hover:text-insight transition-colors">{r.title}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-insight">{r.layer}</div>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-fg/40 group-hover:text-insight">
                  ENTER PATH <span className="group-hover:translate-x-1 transition-transform">→</span>
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
