"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RoleSwitcher } from "@/components/shell/RoleSwitcher";
import { PathFrame, ThreeColumns } from "@/components/paths/PathFrame";
import { Quote } from "@/components/primitives/Quote";
import { Q } from "@/content/dossier";

type Branch = "click" | "defer" | "verify" | null;

const BRANCHES: Record<Exclude<Branch, null>, { title: string; body: React.ReactNode; quote: keyof typeof Q; link: string }> = {
  click: {
    title: "You clicked immediately.",
    body: (
      <p>
        The first wave. You're in the bucket of staff that the dossier classifies as <em>"completed the process immediately."</em>{" "}
        At this point, the social proof statistic doesn't even need to fire — you're <em>generating</em> it. The mechanism active is{" "}
        <strong className="text-insight">temporal alignment</strong>: the email arrived inside an annual routine you've performed before.
      </p>
    ),
    quote: "temporalAlignment",
    link: "/mechanisms#routine",
  },
  defer: {
    title: "You waited. A colleague mentioned it at the coffee break.",
    body: (
      <p>
        This is the dangerous branch — and the one the dossier names as a <strong className="text-insight">predictable structural outcome</strong>.
        Peer endorsement removes perceived risk; diffusion of responsibility shifts the verification burden onto the collective.
        The formal channel could not have produced this credibility. The informal one did, automatically.
      </p>
    ),
    quote: "coffeeBreak",
    link: "/mechanisms#social-proof",
  },
  verify: {
    title: "You opened the intranet to verify.",
    body: (
      <p>
        This is the reflex the new system requires (§04). But here is the uncomfortable systemic point:
        <strong className="text-fg"> your single act would not have stopped the campaign.</strong> Forty colleagues compromised credentials.
        Individual vigilance is necessary but not sufficient — the fix is structural (no email links, OOB verification).
      </p>
    ),
    quote: "technicalMitigation",
    link: "/mechanisms#paradox",
  },
};

export default function OperationsPath() {
  const [branch, setBranch] = useState<Branch>(null);

  return (
    <>
      <RoleSwitcher />
      <PathFrame
        no="§03a"
        role="OPERATIONS — EUROPE"
        layer="SOCIAL / CULTURAL VULNERABILITY"
        title="The email arrives. What do you do?"
      >
        <ThreeColumns
          happened={<>
            <Quote q={Q.monPhishing} inline />
            <Quote q={Q.wedSeventy} inline />
            <Quote q={Q.coffeeBreak} inline />
            <Quote q={Q.thuForty} inline />
          </>}
          reveals={<>
            <Quote q={Q.standardisationParadox} inline />
            <Quote q={Q.measuredTone} inline />
          </>}
          changes={<>
            <Quote q={Q.technicalMitigation} inline />
            <Quote q={Q.methodIntervention} inline />
            <Quote q={Q.socialMitigation} inline />
          </>}
        />

        {/* Branching scenario */}
        <section className="mt-20">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-2">SCENARIO · NO GAME OVER · EVERY BRANCH REVEALS A MECHANISM</div>
          <h2 className="font-display text-4xl tracking-tightest mb-6">Wednesday, 10:31 AM. Inbox.</h2>

          {/* Email mock */}
          <div className="bordr bg-bg-1 p-6 max-w-2xl font-mono text-sm">
            <div className="border-b border-fg/10 pb-3 mb-3 space-y-1 text-xs">
              <div><span className="text-fg/40">From:</span> compliance@group5-corp.intra</div>
              <div><span className="text-fg/40">Subject:</span> Annual SSO credential renewal — completion reminder</div>
              <div><span className="text-fg/40">SSL:</span> <span className="text-phos">●</span> valid certificate</div>
            </div>
            <p className="text-fg/80 mb-2">Dear colleague,</p>
            <p className="text-fg/80 mb-2">
              Approximately <span className="text-insight">70%</span> of your department has already completed the annual SSO renewal.
              Please complete the process by end of week to avoid administrative action.
            </p>
            <p className="text-insight underline cursor-pointer">→ Renew credentials [sso.group5-corp.intra/renewal]</p>
            <p className="text-fg/60 mt-3 text-xs">— Group 5 Compliance Team</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {(["click", "defer", "verify"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                className={`px-4 py-3 border font-mono text-xs uppercase tracking-wider transition-all ${
                  branch === b ? "border-phos text-phos bg-phos/10" : "border-fg/20 text-fg/70 hover:border-insight hover:text-insight"
                }`}
              >
                {b === "click" && "→ [A] Click & complete"}
                {b === "defer" && "→ [B] Defer — read it later"}
                {b === "verify" && "→ [C] Open intranet to verify"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {branch && (
              <motion.div
                key={branch}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-6 border-l-2 border-insight bg-insight/[0.04] p-5 max-w-3xl"
              >
                <h3 className="font-display text-2xl tracking-tightest mb-3">{BRANCHES[branch].title}</h3>
                <div className="text-fg/80 text-sm leading-relaxed mb-4">{BRANCHES[branch].body}</div>
                <Quote q={Q[BRANCHES[branch].quote]} />
                <Link href={BRANCHES[branch].link} className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-phos hover:underline">
                  → see this mechanism in §02
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
          <Link href="/mechanisms" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← §02 mechanisms</Link>
          <Link href="/paths/analyst" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">§03b detection →</Link>
        </div>
      </PathFrame>
    </>
  );
}
