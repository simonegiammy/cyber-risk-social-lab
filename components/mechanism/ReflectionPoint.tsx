"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";

export type Option = { text: string; feedback: string };

export function ReflectionPoint({ prompt, options }: { prompt: string; options: Option[] }) {
  const [picked, setPicked] = useState<number | null>(null);
  const { t } = useT();

  return (
    <div className="mt-6 border border-insight/30 bg-insight/[0.04] p-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-insight mb-2">{t("reflection.label")}</div>
      <p className="font-display text-xl tracking-tight mb-4">{prompt}</p>
      <ul className="space-y-2">
        {options.map((o, i) => {
          const isOpen = picked === i;
          return (
            <li key={i}>
              <button
                onClick={() => setPicked(isOpen ? null : i)}
                className={`w-full text-left px-3 py-2 border transition-all ${
                  isOpen ? "border-phos bg-phos/5 text-fg" : "border-fg/15 text-fg/80 hover:border-insight"
                }`}
              >
                <span className="font-mono text-[10px] text-fg/40 mr-2">[{String.fromCharCode(65 + i)}]</span>
                {o.text}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 py-2 ml-6 border-l-2 border-phos/40 text-sm text-fg/80 bg-bg-1/40 mt-1">
                      <span className="font-mono text-[10px] uppercase text-phos mr-2">{t("reflection.feedback")}</span>
                      {o.feedback}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
