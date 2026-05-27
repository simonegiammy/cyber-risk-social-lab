"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ROLES = [
  { href: "/paths/operations", code: "03a", label: "Operations", layer: "Social / Cultural" },
  { href: "/paths/analyst", code: "03b", label: "Detection", layer: "Procedural" },
  { href: "/paths/leadership", code: "03c", label: "Governance", layer: "Organisational" },
];

export function RoleSwitcher() {
  const p = usePathname();
  return (
    <div className="sticky top-10 z-30 bg-bg-0/80 backdrop-blur-md border-y border-fg/10">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-fg/40 self-center mr-2">SWITCH ROLE →</span>
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
            <span className="opacity-60">[{r.code}]</span> {r.label}
            <span className="block text-[9px] opacity-50 normal-case tracking-normal">{r.layer}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
