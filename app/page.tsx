"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { NetworkBackground } from "@/components/three/NetworkBackground";
import { Typewriter } from "@/components/primitives/Typewriter";
import { GlitchText } from "@/components/primitives/GlitchText";
import { Q } from "@/content/dossier";

const ROLES = [
  { code: "01", title: "Operations — Europe", layer: "Social / Cultural vulnerability", href: "/paths/operations", accent: "phos" },
  { code: "02", title: "Detection — Analyst & Lead", layer: "Procedural vulnerability", href: "/paths/analyst", accent: "insight" },
  { code: "03", title: "Governance — Managing Board", layer: "Organisational vulnerability", href: "/paths/leadership", accent: "amber" },
];

export default function Landing() {
  const [intro, setIntro] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-2.5rem)]">
      <NetworkBackground />

      <section className="relative max-w-5xl mx-auto px-6 pt-24 pb-12">
        {/* Console intro */}
        <div className="bordr bg-bg-1/60 backdrop-blur-sm p-5 mb-12 max-w-2xl">
          <Typewriter
            lines={[
              "boot sequence initiated...",
              "loading: retrospective_report.txt",
              `quote extracted: "${Q.functionedAsDesigned.text}."`,
              "anomaly: source narrative // declares closure",
              "engaging interrogative protocol →",
            ]}
            onDone={() => setIntro(true)}
          />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: intro ? 1 : 0, y: intro ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="font-mono text-[11px] uppercase tracking-widest text-phos/70 mb-3">
            <span className="text-phos">●</span> Group 5 / Semiconductors · annual compliance cycle · phishing campaign
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tightest text-fg">
            Functioning as Designed
            <GlitchText className="text-phos">?</GlitchText>
          </h1>
          <p className="mt-6 max-w-2xl text-fg/70 text-lg leading-relaxed">
            An organisational learning microsite. We re-open a retrospective that closed too cleanly —
            and ask what <em className="text-insight not-italic">"as designed"</em> chose not to name.
          </p>

          {/* Disclaimer */}
          <div className="mt-8 max-w-2xl border-l-2 border-phos/60 pl-4 py-3 bg-phos/[0.04]">
            <p className="text-sm text-fg/80 leading-relaxed">
              <span className="font-mono text-[11px] text-phos uppercase tracking-wider block mb-1">PRINCIPLE</span>
              This is <strong className="text-fg">not</strong> a module about inattention. <span className="text-insight">«&nbsp;{Q.staffNotCareless.text}&nbsp;»</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Role selector */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: intro ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative max-w-6xl mx-auto px-6 pb-24"
      >
        <div className="font-mono text-[11px] uppercase tracking-widest text-fg/40 mb-4">
          → SELECT A VANTAGE POINT  // <span className="text-fg/60">or proceed linearly through §01 → §04</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {ROLES.map((r, i) => (
            <motion.div
              key={r.code}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <Link href={r.href} className="group block relative overflow-hidden bordr bg-bg-1/40 backdrop-blur-sm p-6 hover:border-phos/60 transition-all hover:bg-bg-1/80">
                <div className="font-mono text-xs text-fg/40 mb-2">[{r.code}]</div>
                <div className="font-display text-2xl tracking-tightest mb-2 group-hover:text-phos transition-colors">{r.title}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-insight">{r.layer}</div>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-fg/40 group-hover:text-phos">
                  ENTER PATH <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{
                  background: "radial-gradient(circle at 50% 100%, rgba(0,255,156,0.08), transparent 70%)"
                }}/>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/reconstruction" className="px-4 py-2 bordr-phos font-mono text-xs uppercase tracking-wider text-phos hover:bg-phos/10 transition-colors">
            → §01 Begin reconstruction
          </Link>
          <Link href="/mechanisms" className="px-4 py-2 bordr font-mono text-xs uppercase tracking-wider text-fg/70 hover:border-insight hover:text-insight transition-colors">
            → §02 Mechanisms unpacked
          </Link>
          <Link href="/reframing" className="px-4 py-2 bordr font-mono text-xs uppercase tracking-wider text-fg/70 hover:border-insight hover:text-insight transition-colors">
            → §04 Reframe
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
