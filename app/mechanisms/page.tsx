"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionBanner } from "@/components/shell/SectionBanner";
import { Quote } from "@/components/primitives/Quote";
import { ReflectionPoint } from "@/components/mechanism/ReflectionPoint";
import { IconRoutine, IconSocialProof, IconParadox, IconShadow } from "@/components/mechanism/MechanismIcon";
import { Q } from "@/content/dossier";

const MECHS = [
  {
    id: "routine",
    no: "M·01",
    theorist: "Nelson & Winter",
    title: "Temporal & contextual alignment",
    icon: <IconRoutine />,
    accent: "insight",
    quotes: ["temporalAlignment", "nelsonWinter"] as const,
    prompt: "Why did the timing of the attack work?",
    options: [
      { text: "The attacker got lucky with the compliance window.", feedback: "Partial. Luck is the wrong frame. The compliance routine is annual and predictable — it's a documentable surface, not a coincidence." },
      { text: "The routine was so well-rehearsed that it ran without scepticism.", feedback: "Yes — Nelson & Winter: standardised routines are operationally efficient and socially exploitable simultaneously. The very thing that makes them work made them attackable." },
      { text: "Training would have caught the inconsistency.", feedback: "Partial. The email mimicked tone perfectly (p.6: « flawlessly mimicked the formal corporate tone »). Training on anomalies misses attacks that look like routine." },
    ],
  },
  {
    id: "social-proof",
    no: "M·02",
    theorist: "Cialdini + diffusion of responsibility",
    title: "Two-level social proof",
    icon: <IconSocialProof />,
    accent: "phos",
    quotes: ["socialProofFact", "diffusion"] as const,
    prompt: "What did the \"70% completed\" line actually do?",
    options: [
      { text: "It created urgency through a deadline.", feedback: "Partial. The dossier explicitly notes the message lacked dramatic urgency. The trick is subtler: it reframed inaction as deviance from the norm." },
      { text: "It made non-completion feel like outlier behaviour.", feedback: "Yes — this is social proof functioning as a *social fact*. Conformity pressure activates without the email having to threaten." },
      { text: "The real damage came at the coffee break.", feedback: "Also yes. The peer endorsement was a secondary social proof — and a predictable structural outcome, not an accident." },
    ],
  },
  {
    id: "paradox",
    no: "M·03",
    theorist: "Goffman — impression management",
    title: "Standardisation paradox",
    icon: <IconParadox />,
    accent: "alarm",
    quotes: ["standardisationParadox", "goffman", "staffNotCareless"] as const,
    prompt: "Why didn't staff spot the email as suspicious?",
    options: [
      { text: "They didn't read it carefully enough.", feedback: "No. The dossier is explicit: the email was indistinguishable from legitimate ones. Attention wouldn't have helped." },
      { text: "The formal tone is exactly what the system rewards.", feedback: "Yes — Goffman's impression management. The attacker performed the identity of the compliance infrastructure. Staff acted as the system expected them to." },
      { text: "OOB verification was the missing technical control.", feedback: "True at the technical layer. But even with OOB, the symbolic legitimacy of the email would still nudge people to proceed. The problem is sociotechnical, not purely technical." },
    ],
  },
  {
    id: "shadow",
    no: "M·04",
    theorist: "Mintzberg — structural shadow",
    title: "Operational periphery as blind spot",
    icon: <IconShadow />,
    accent: "amber",
    quotes: ["mintzbergShadow", "twoTier"] as const,
    prompt: "Where did the verification fail?",
    options: [
      { text: "At the individual decision to click.", feedback: "Partial. Individual scrutiny matters, but the dossier names a *structural* gap: no in-line verification mechanism between staff and the credential portal." },
      { text: "At the architecture: centralised authority leaves the periphery exposed.", feedback: "Yes. Mintzberg's structural shadow — strategic authority concentrated at the top, operational autonomy at the periphery with no verification." },
      { text: "At the AI tool's risk rating.", feedback: "Partial — but the AI tool actually behaved correctly (medium-risk, escalated). The real shadow was upstream: the credential flow itself had no checkpoint." },
    ],
  },
] as const;

export default function Mechanisms() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionBanner mode="interpretation" no="§02" title="Mechanism unpacked." />

      <p className="max-w-3xl text-fg/70 text-lg leading-relaxed mb-12">
        Four mechanisms that compounded. Each has a theorist, a verbatim claim from the dossier, and a
        reflection point. <span className="text-insight">There is no right answer.</span> Every option is partially
        true; the feedback explains the mechanism — not who was wrong.
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
                <h2 className="font-display text-3xl tracking-tightest mt-1 leading-tight">{m.title}</h2>
              </div>
            </div>
            <div className="space-y-4">
              {m.quotes.map((k) => (
                <Quote key={k} q={Q[k]} />
              ))}
            </div>
            <ReflectionPoint prompt={m.prompt} options={[...m.options]} />
          </motion.section>
        ))}
      </div>

      {/* Positive mechanism callout */}
      <section className="mt-16 border border-phos/30 bg-phos/[0.04] p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-phos mb-2">M·05 · POSITIVE MECHANISM</div>
        <h3 className="font-display text-3xl tracking-tightest mb-4">AI-in-the-loop worked.</h3>
        <Quote q={Q.automationBias} />
        <div className="mt-3">
          <Quote q={Q.automationAccepting} />
        </div>
      </section>

      <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
        <Link href="/reconstruction" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← §01 reconstruction</Link>
        <Link href="/paths/operations" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">§03 role paths →</Link>
      </div>
    </div>
  );
}
