"use client";
import type { Quote as Q } from "@/content/dossier";
import { EvidenceTag } from "./EvidenceTag";
import { cn } from "@/lib/utils";

export function Quote({ q, className, inline }: { q: Q; className?: string; inline?: boolean }) {
  if (inline) {
    return (
      <span className={cn("text-fg/90", className)} title={q.source}>
        <span className="text-insight">«</span> {q.text} <span className="text-insight">»</span>
      </span>
    );
  }
  return (
    <figure className={cn("relative border-l-2 border-insight/40 pl-4 py-2 bg-insight/[0.03]", className)}>
      <blockquote className="text-fg/90 leading-relaxed">
        <span className="text-insight font-mono">«</span> {q.text}{" "}
        <span className="text-insight font-mono">»</span>
      </blockquote>
      <figcaption className="mt-2 flex items-center gap-2 text-[11px] font-mono text-fg/50 uppercase tracking-wider">
        <EvidenceTag type={q.type} source={q.source} />
        <span>{q.source}</span>
      </figcaption>
    </figure>
  );
}
