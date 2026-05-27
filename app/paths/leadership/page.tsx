"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RoleSwitcher } from "@/components/shell/RoleSwitcher";
import { PathFrame, ThreeColumns } from "@/components/paths/PathFrame";
import { Quote } from "@/components/primitives/Quote";
import { Q } from "@/content/dossier";

export default function LeadershipPath() {
  const [view, setView] = useState<"before" | "after">("before");
  return (
    <>
      <RoleSwitcher />
      <PathFrame
        no="§03c"
        role="GOVERNANCE — MANAGING BOARD"
        layer="ORGANISATIONAL VULNERABILITY"
        title='Did the system function? Or did the system absorb its own failure?'
      >
        <ThreeColumns
          happened={<>
            <Quote q={Q.week2Board} inline />
            <Quote q={Q.retrospective} inline />
            <Quote q={Q.response} inline />
          </>}
          reveals={<>
            <Quote q={Q.complacency} inline />
            <Quote q={Q.mintzbergShadow} inline />
            <Quote q={Q.singlePointFailure} inline />
          </>}
          changes={<>
            <Quote q={Q.problemStatement} inline />
            <Quote q={Q.methodIntervention} inline />
            <Quote q={Q.learningOrientation} inline />
          </>}
        />

        {/* Town-hall transcript */}
        <section className="mt-20">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-2">BOARDROOM TRANSCRIPT · the difficult node</div>
          <h2 className="font-display text-4xl tracking-tightest mb-6">"Functioned as designed" — interrogated.</h2>

          <div className="bordr bg-bg-1/40 p-6 max-w-3xl space-y-4 font-mono text-sm">
            <div>
              <div className="text-fg/40 text-xs uppercase tracking-widest mb-1">▸ retrospective conclusion (as filed)</div>
              <p className="text-fg/80 italic">"The system functioned as designed."</p>
            </div>
            <div>
              <div className="text-insight text-xs uppercase tracking-widest mb-1">▸ counter-claim (dossier, p.4)</div>
              <p className="text-fg/85">
                <span className="text-insight">«</span> declaring the system "functioned as designed" ignores critical gaps in detection speed,
                in employee preparedness, and in credential renewal architecture <span className="text-insight">»</span>
              </p>
            </div>
            <div>
              <div className="text-phos text-xs uppercase tracking-widest mb-1">▸ corrective principle</div>
              <p className="text-fg/85">
                <span className="text-phos">«</span> A true learning orientation must name these failures, rather than absorbing them into a narrative of institutional resilience. <span className="text-phos">»</span>
              </p>
            </div>
          </div>
        </section>

        {/* Cost breakdown */}
        <section className="mt-16">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-2">INTERVENTION · cost / friction trade-off</div>

          <div className="flex gap-2 mb-4">
            {(["before", "after"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 border font-mono text-[11px] uppercase tracking-wider ${
                view === v ? "border-phos text-phos bg-phos/10" : "border-fg/20 text-fg/60 hover:border-insight"
              }`}>
                {v === "before" ? "before · email-initiated" : "after · intranet + mobile authenticator"}
              </button>
            ))}
          </div>

          <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-4">
            {view === "before" ? (
              <>
                <Stat label="Compromised accounts" value="40" tone="alarm" />
                <Stat label="Detection lag" value="3 days" tone="alarm" />
                <Stat label="OOB verification" value="none" tone="alarm" />
              </>
            ) : (
              <>
                <Stat label="Integration cost" value="€45,000" tone="phos" />
                <Stat label="Friction / employee / cycle" value="10–15 min" tone="amber" />
                <Stat label="OOB verification" value="mobile authenticator" tone="phos" />
              </>
            )}
          </motion.div>

          <div className="mt-6 max-w-3xl">
            <Quote q={Q.cost45k} />
          </div>
        </section>

        <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
          <Link href="/paths/analyst" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← §03b detection</Link>
          <Link href="/reframing" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">§04 reframing →</Link>
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
