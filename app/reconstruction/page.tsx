"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionBanner } from "@/components/shell/SectionBanner";
import { useT } from "@/lib/i18n";

const STAGES = ["s1", "s2", "s3", "s4", "s5", "s6", "s7"] as const;

export default function Anatomy() {
  const { t } = useT();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SectionBanner mode="reconstruction" no="§01" title={t("anat.title")} />

      <p className="max-w-2xl text-fg/70 text-base leading-relaxed mb-12">{t("anat.intro")}</p>

      <div className="relative">
        <div className="absolute left-[1.05rem] top-3 bottom-3 w-px bg-gradient-to-b from-phos/60 via-insight/40 to-amber/50" />

        <ol className="space-y-5">
          {STAGES.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="flex items-start gap-4"
            >
              <span className="relative z-10 shrink-0 grid place-items-center w-9 h-9 rounded-full border border-fg/25 bg-bg-0 font-mono text-[11px] text-fg/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 bordr bg-bg-1/40 p-4">
                <h2 className="font-display text-2xl tracking-tightest leading-tight">{t(`anat.${s}.t` as any)}</h2>
                <p className="mt-1.5 text-sm text-fg/75 leading-relaxed">{t(`anat.${s}.g` as any)}</p>
                <div className="mt-3 inline-flex items-start gap-2 border-l-2 border-insight/50 bg-insight/[0.04] pl-3 py-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-insight shrink-0 mt-0.5">{t("anat.exampleLabel")}</span>
                  <span className="text-[13px] text-fg/70 leading-snug">{t(`anat.${s}.e` as any)}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
        <Link href="/" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← {t("anat.navPrev")}</Link>
        <Link href="/mechanisms" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">{t("anat.navNext")} →</Link>
      </div>
    </div>
  );
}
