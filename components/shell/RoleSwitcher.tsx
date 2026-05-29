"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const ROLES = [
  { href: "/paths/operations", code: "03a", labelKey: "role.operations", layerKey: "layer.social" },
  { href: "/paths/analyst", code: "03b", labelKey: "role.detection", layerKey: "layer.procedural" },
  { href: "/paths/leadership", code: "03c", labelKey: "role.governance", layerKey: "layer.organisational" },
] as const;

export function RoleSwitcher() {
  const p = usePathname();
  const { t } = useT();
  return (
    <div className="sticky top-[58px] z-30 bg-bg-0/80 backdrop-blur-md border-b border-fg/10">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-fg/40 self-center mr-2">{t("roleswitch.label")}</span>
        {ROLES.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={cn(
              "group px-3 py-1.5 border text-[11px] font-mono uppercase tracking-wider transition-all",
              p === r.href
                ? "border-phos text-phos bg-phos/5 glow-phos"
                : "border-fg/20 text-fg/60 hover:border-insight hover:text-insight"
            )}
          >
            <span className="opacity-60">[{r.code}]</span> {t(r.labelKey)}
            <span className="block text-[9px] opacity-50 normal-case tracking-normal">{t(r.layerKey)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
