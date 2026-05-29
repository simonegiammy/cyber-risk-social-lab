"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionBanner } from "@/components/shell/SectionBanner";
import { Quote } from "@/components/primitives/Quote";
import { EvidenceTag } from "@/components/primitives/EvidenceTag";
import { Q } from "@/content/dossier";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import Link from "next/link";

type Node = {
  id: string;
  day: string;
  time: string;
  title: string;
  quote: keyof typeof Q;
  highlight?: "coffee" | "detection" | "response" | "attack";
  mechanismLink?: string;
  notes?: string;
};

const NODES: Node[] = [
  { id: "n1", day: "MON · W1", time: "09:00", title: "Phishing emails distributed", quote: "monPhishing", highlight: "attack" },
  { id: "n2", day: "MON · W1", time: "09:01", title: "Replica SSO portal — valid TLS", quote: "trustParadox", highlight: "attack", mechanismLink: "/mechanisms#paradox" },
  { id: "n3", day: "MON · W1", time: "day", title: "Some complete, others defer", quote: "monDeferred" },
  { id: "n4", day: "WED · W1", time: "10:30", title: 'Follow-up: "≈70% completed"', quote: "wedSeventy", mechanismLink: "/mechanisms#social-proof" },
  { id: "n5", day: "WED · W1", time: "10:31", title: "Reframed as outlier behavior", quote: "wedReframing", mechanismLink: "/mechanisms#social-proof" },
  { id: "n6", day: "WED · W1", time: "≈11:15", title: "☕ Coffee break endorsement", quote: "coffeeBreak", highlight: "coffee", mechanismLink: "/mechanisms#social-proof" },
  { id: "n6b", day: "WED · W1", time: "—", title: "Predictable structural outcome", quote: "coffeePredictable", highlight: "coffee" },
  { id: "n7", day: "THU · W1", time: "EOD", title: "≈40 credentials submitted", quote: "thuForty", highlight: "attack" },
  { id: "n8", day: "THU · W1", time: "morning", title: "Gateway log anomaly flagged", quote: "thuLogAnomaly", highlight: "detection" },
  { id: "n9", day: "THU · W1", time: "stand-up", title: "Speak-up culture activates", quote: "speakUp", highlight: "detection" },
  { id: "n10", day: "THU · W1", time: "day", title: "Junior analyst → AI tool → escalation", quote: "juniorAnalyst", highlight: "detection", mechanismLink: "/mechanisms#shadow" },
  { id: "n11", day: "FRI · W1", time: "—", title: "IT confirms: different URL, no email links", quote: "friConfirm", highlight: "detection" },
  { id: "n12", day: "FRI · W1", time: "—", title: "CSIRT activation · advisory · forced reset", quote: "response", highlight: "response" },
  { id: "n13", day: "WEEK 2", time: "—", title: "Compromised accounts accessed critical files", quote: "week2Logs", highlight: "response" },
  { id: "n14", day: "WEEK 2", time: "—", title: "Managing Board session", quote: "week2Board", highlight: "response" },
  { id: "n15", day: "WEEK 2", time: "—", title: "Systems-level retrospective initiated", quote: "retrospective", highlight: "response" },
];

const colorFor = (h?: string) => {
  switch (h) {
    case "attack": return "bg-alarm border-alarm/60 text-alarm";
    case "coffee": return "bg-insight border-insight/60 text-insight";
    case "detection": return "bg-phos border-phos/60 text-phos";
    case "response": return "bg-amber border-amber/60 text-amber";
    default: return "bg-fg/30 border-fg/30 text-fg/60";
  }
};

export default function Reconstruction() {
  const [open, setOpen] = useState<string | null>(null);
  const node = NODES.find(n => n.id === open);
  const { t } = useT();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionBanner mode="reconstruction" no="§01" title={t("recon.title")} />

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-10 text-[10px] font-mono uppercase tracking-wider text-fg/60">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-alarm rounded-full" /> {t("recon.legend.attack")}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-insight rounded-full" /> {t("recon.legend.social")}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-phos rounded-full" /> {t("recon.legend.detection")}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber rounded-full" /> {t("recon.legend.response")}</span>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[7.5rem] top-2 bottom-2 w-px bg-gradient-to-b from-alarm via-insight to-amber/60" />

        <ol className="space-y-3">
          {NODES.map((n, i) => {
            const q = Q[n.quote];
            return (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: Math.min(i * 0.04, 0.5) }}
                className={cn("flex items-stretch gap-4", n.highlight === "coffee" && "translate-x-4")}
              >
                {/* Day label */}
                <div className="w-28 shrink-0 text-right pt-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-fg/60">{n.day}</div>
                  <div className="font-mono text-[10px] text-fg/30">{n.time}</div>
                </div>

                {/* Dot */}
                <div className="relative shrink-0 pt-3">
                  <div className={cn("w-3 h-3 rounded-full border-2", colorFor(n.highlight))} />
                  {n.highlight === "coffee" && (
                    <div className="absolute -inset-2 rounded-full border border-insight/40 animate-pulse" />
                  )}
                </div>

                {/* Card */}
                <button
                  onClick={() => setOpen(n.id)}
                  className={cn(
                    "flex-1 text-left bordr bg-bg-1/40 hover:bg-bg-1/80 px-4 py-3 transition-all hover:border-phos/40 group",
                    n.highlight === "coffee" && "border-insight/40 bg-insight/[0.04]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-lg leading-tight">{t(`node.${n.id}` as any)}</div>
                      <div className="text-sm text-fg/60 mt-1 line-clamp-1">{q.text.slice(0, 110)}{q.text.length > 110 && "…"}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <EvidenceTag type={q.type} source={q.source} />
                      <span className="font-mono text-[10px] text-fg/30 group-hover:text-phos">{t("recon.expand")}</span>
                    </div>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {node && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-bg-0/80 backdrop-blur-sm z-30"
              onClick={() => setOpen(null)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-10 right-0 bottom-0 w-full max-w-lg z-40 bg-bg-1 border-l border-fg/20 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-phos">{node.day} · {node.time}</div>
                    <h2 className="font-display text-3xl tracking-tightest mt-1">{t(`node.${node.id}` as any)}</h2>
                  </div>
                  <button onClick={() => setOpen(null)} className="text-fg/60 hover:text-phos font-mono text-xs uppercase">{t("recon.close")}</button>
                </div>
                <Quote q={Q[node.quote]} />
                {node.mechanismLink && (
                  <Link href={node.mechanismLink} className="mt-6 inline-flex items-center gap-2 px-3 py-2 bordr-phos text-phos font-mono text-xs uppercase tracking-wider hover:bg-phos/10">
                    {t("recon.seeMechanism")}
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Footer nav */}
      <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
        <Link href="/" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">{t("recon.navPrev")}</Link>
        <Link href="/mechanisms" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">{t("recon.navNext")}</Link>
      </div>
    </div>
  );
}
