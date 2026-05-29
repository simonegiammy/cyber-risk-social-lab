"use client";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="border-t border-fg/10 mt-24 py-6 px-4 text-center font-mono text-[10px] uppercase tracking-widest text-fg/40">
      <span className="text-phos">●</span> functioning-as-designed v0.1 · {t("footer.tag")}
    </footer>
  );
}
