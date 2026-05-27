"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Quote } from "@/components/primitives/Quote";
import { GlitchText } from "@/components/primitives/GlitchText";
import { Q } from "@/content/dossier";

export default function Reframing() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="font-mono text-[10px] uppercase tracking-widest text-insight mb-3">
          <span className="text-insight">●</span> §04 · REFRAMING
        </div>

        <h1 className="font-display text-5xl md:text-7xl tracking-tightest leading-[0.95]">
          The system functioned <GlitchText className="text-insight">as designed.</GlitchText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 font-display text-3xl md:text-5xl tracking-tightest text-fg/80 leading-tight"
        >
          But <span className="text-insight">"as designed"</span> is not the same as{" "}
          <span className="text-phos italic">"as it should be."</span>
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
          <div className="font-mono text-[10px] uppercase tracking-widest text-phos mb-3">CLOSING FRAME</div>
          <p className="font-display text-2xl tracking-tightest leading-snug text-fg">
            Cybersecurity is not a culture of suspicion.
            <span className="block mt-2 text-fg/70">It is the operational floor on which <span className="text-phos">trust</span> and <span className="text-insight">innovation</span> become possible.</span>
          </p>
          <p className="mt-4 text-fg/60 text-sm leading-relaxed">
            Systemic responsibility, not individual blame. Routines made legible, not just efficient.
            The intervention (§03c) — eliminating email-initiated credential links and requiring an independent mobile authenticator —
            is a structural answer to a structural attack.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="mt-16 pt-8 border-t border-fg/10">
          <div className="font-mono text-[10px] uppercase tracking-widest text-fg/40 mb-3">LEGEND · evidence taxonomy (dossier, p.7)</div>
          <ul className="grid sm:grid-cols-3 gap-3 text-sm">
            <li className="border-t-2 border-phos/40 p-3 bg-bg-1/30">
              <span className="font-mono text-[10px] text-phos">[E] EVIDENCE</span>
              <p className="text-fg/70 mt-1">Direct factual elements of the case (e.g. 70% line, coffee break endorsement).</p>
            </li>
            <li className="border-t-2 border-insight/40 p-3 bg-bg-1/30">
              <span className="font-mono text-[10px] text-insight">[I] INFERENCE</span>
              <p className="text-fg/70 mt-1">Analytical readings (procedural inadequacy, standardisation paradox, structural shadow).</p>
            </li>
            <li className="border-t-2 border-amber/40 p-3 bg-bg-1/30">
              <span className="font-mono text-[10px] text-amber">[S] SIMULATION</span>
              <p className="text-fg/70 mt-1">Modelled figures (40 accounts, €45K, 10–15 min friction).</p>
            </li>
          </ul>
        </div>

        <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
          <Link href="/paths/leadership" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← §03c governance</Link>
          <Link href="/" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">↻ return to §00 →</Link>
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
