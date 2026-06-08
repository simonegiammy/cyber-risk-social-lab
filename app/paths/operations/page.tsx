"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RoleSwitcher } from "@/components/shell/RoleSwitcher";
import { PathFrame, ThreeColumns } from "@/components/paths/PathFrame";
import { Bullets } from "@/components/paths/Bullets";
import { useT } from "@/lib/i18n";

type Branch = "click" | "defer" | "verify" | null;

const BRANCHES: Record<Exclude<Branch, null>, { link: string }> = {
  click: { link: "/mechanisms" },
  defer: { link: "/mechanisms" },
  verify: { link: "/mechanisms" },
};

export default function OperationsPath() {
  const [branch, setBranch] = useState<Branch>(null);
  const { t } = useT();

  return (
    <>
      <RoleSwitcher />
      <PathFrame
        no="§03a"
        role={t("roleTitle.operations")}
        layer={t("layer.social")}
        title={t("ops.title")}
      >
        <ThreeColumns
          happened={<Bullets items={[t("ops.happened1"), t("ops.happened2"), t("ops.happened3")]} />}
          reveals={<Bullets items={[t("ops.reveals1"), t("ops.reveals2"), t("ops.reveals3")]} tone="insight" />}
          changes={<Bullets items={[t("ops.changes1"), t("ops.changes2"), t("ops.changes3")]} tone="phos" />}
        />

        {/* Interactive scenario */}
        <section className="mt-20">
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-2">{t("ops.scenarioLabel")}</div>
          <h2 className="font-display text-4xl tracking-tightest mb-2">{t("ops.scenarioTitle")}</h2>
          <p className="text-sm text-fg/55 mb-6">{t("ops.scenarioHint")}</p>

          {/* Email mock */}
          <div className="bordr bg-bg-1 p-6 max-w-2xl font-mono text-sm">
            <div className="border-b border-fg/10 pb-3 mb-3 space-y-1 text-xs">
              <div><span className="text-fg/40">From:</span> compliance@group5-corp.intra</div>
              <div><span className="text-fg/40">{t("ops.mail.subjectLabel")}</span> {t("ops.mail.subject")}</div>
              <div><span className="text-fg/40">SSL:</span> <span className="text-phos">●</span> {t("ops.mail.ssl")}</div>
            </div>
            <p className="text-fg/80 mb-2">{t("ops.mail.dear")}</p>
            <p className="text-fg/80 mb-2">
              {t("ops.mail.bodyA")} <span className="text-insight">70%</span> {t("ops.mail.bodyB")}
            </p>
            <p className="text-insight underline cursor-pointer">→ {t("ops.mail.link")}</p>
            <p className="text-fg/60 mt-3 text-xs">{t("ops.mail.signoff")}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-phos animate-pulse">↓ {t("ops.scenarioHint")}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {(["click", "defer", "verify"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                className={`px-4 py-3 border font-mono text-xs uppercase tracking-wider transition-all ${
                  branch === b ? "border-phos text-phos bg-phos/10" : "border-fg/30 text-fg/80 hover:border-insight hover:text-insight hover:bg-insight/5"
                }`}
              >
                {b === "click" && t("ops.btn.click")}
                {b === "defer" && t("ops.btn.defer")}
                {b === "verify" && t("ops.btn.verify")}
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
                <h3 className="font-display text-2xl tracking-tightest mb-3">{t(`ops.br.${branch}.title` as any)}</h3>
                <p className="text-fg/80 text-sm leading-relaxed mb-4">{t(`ops.br.${branch}.body` as any)}</p>
                <Link href={BRANCHES[branch].link} className="inline-block font-mono text-xs uppercase tracking-wider text-phos hover:underline">
                  → {t("ops.seeMechanism")}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="mt-16 flex justify-between items-center pt-8 border-t border-fg/10">
          <Link href="/mechanisms" className="font-mono text-xs uppercase tracking-wider text-fg/60 hover:text-phos">← {t("ops.navPrev")}</Link>
          <Link href="/paths/analyst" className="font-mono text-xs uppercase tracking-wider text-insight hover:text-phos">{t("ops.navNext")} →</Link>
        </div>
      </PathFrame>
    </>
  );
}
