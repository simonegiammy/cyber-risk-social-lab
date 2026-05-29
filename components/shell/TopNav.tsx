"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Role = { href: string; code: string; label: string };

type Step = {
  no: string;
  href: string;
  label: string;
  match: (p: string) => boolean;
  roles?: Role[];
};

const STEPS: Step[] = [
  { no: "00", href: "/", label: "Start", match: (p) => p === "/" },
  { no: "01", href: "/reconstruction", label: "Reconstruction", match: (p) => p === "/reconstruction" },
  { no: "02", href: "/mechanisms", label: "Mechanisms", match: (p) => p === "/mechanisms" },
  {
    no: "03",
    href: "/paths/operations",
    label: "Perspectives",
    match: (p) => p.startsWith("/paths"),
    roles: [
      { href: "/paths/operations", code: "a", label: "Operations" },
      { href: "/paths/analyst", code: "b", label: "Detection" },
      { href: "/paths/leadership", code: "c", label: "Governance" },
    ],
  },
  { no: "04", href: "/reframing", label: "Reframing", match: (p) => p === "/reframing" },
];

// Flat order used for prev / next
const FLOW = ["/", "/reconstruction", "/mechanisms", "/paths/operations", "/paths/analyst", "/paths/leadership", "/reframing"];

export function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const activeIdx = STEPS.findIndex((s) => s.match(pathname));
  const flowIdx = FLOW.indexOf(pathname);
  const next = flowIdx >= 0 && flowIdx < FLOW.length - 1 ? FLOW[flowIdx + 1] : null;

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      {/* progress line */}
      <motion.div className="h-[2px] origin-left bg-phos" style={{ scaleX: progress }} />

      <div className="backdrop-blur-md bg-bg-0/80 border-b border-fg/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-phos text-lg leading-none group-hover:rotate-90 transition-transform">◆</span>
            <span className="font-display text-base tracking-tightest leading-none">
              Functioning&nbsp;as&nbsp;Designed<span className="text-phos">?</span>
            </span>
          </Link>

          {/* desktop stepper */}
          <nav className="hidden lg:flex items-center">
            {STEPS.map((s, i) => {
              const active = i === activeIdx;
              const done = activeIdx > i;
              return (
                <div key={s.no} className="flex items-center group/step relative">
                  <Link
                    href={s.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors",
                      active ? "text-phos" : done ? "text-fg/55 hover:text-insight" : "text-fg/40 hover:text-insight"
                    )}
                  >
                    <span className={cn(
                      "grid place-items-center w-6 h-6 rounded-full border font-mono text-[10px] tabular-nums transition-colors",
                      active ? "border-phos bg-phos/10 text-phos"
                        : done ? "border-fg/30 text-fg/50"
                        : "border-fg/20 text-fg/40"
                    )}>
                      {s.no}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider whitespace-nowrap">{s.label}</span>
                    {s.roles && <span className="text-[9px] opacity-50">▾</span>}
                  </Link>

                  {/* connector */}
                  {i < STEPS.length - 1 && (
                    <span className={cn("w-5 h-px mx-0.5", done ? "bg-fg/30" : "bg-fg/10")} />
                  )}

                  {/* roles dropdown */}
                  {s.roles && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/step:opacity-100 group-hover/step:visible transition-all">
                      <div className="bordr bg-bg-1 p-1.5 min-w-[180px] shadow-xl">
                        {s.roles.map((r) => (
                          <Link
                            key={r.href}
                            href={r.href}
                            className={cn(
                              "flex items-center gap-2 px-2.5 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-wider transition-colors",
                              pathname === r.href ? "text-phos bg-phos/5" : "text-fg/60 hover:text-insight hover:bg-fg/5"
                            )}
                          >
                            <span className="opacity-50">03{r.code}</span> {r.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* next affordance (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            {next && (
              <Link
                href={next}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bordr-phos text-phos font-mono text-[11px] uppercase tracking-wider hover:bg-phos/10 transition-colors"
              >
                Next <span aria-hidden>→</span>
              </Link>
            )}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-9 h-9 bordr text-fg/70 hover:text-phos"
              aria-label="Toggle menu"
            >
              <span className="font-mono text-xs">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden backdrop-blur-md bg-bg-0/95 border-b border-fg/10"
        >
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
            {STEPS.map((s, i) => (
              <div key={s.no}>
                <Link
                  href={s.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2.5 font-mono text-sm uppercase tracking-wider",
                    i === activeIdx ? "text-phos" : "text-fg/60"
                  )}
                >
                  <span className="w-6 text-[11px] opacity-60">{s.no}</span> {s.label}
                </Link>
                {s.roles && (
                  <div className="pl-11 flex flex-col">
                    {s.roles.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        className={cn(
                          "py-1.5 font-mono text-xs uppercase tracking-wider",
                          pathname === r.href ? "text-phos" : "text-fg/50"
                        )}
                      >
                        03{r.code} · {r.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
