"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ROUTES = [
  { href: "/", label: "§00 LANDING" },
  { href: "/reconstruction", label: "§01 RECONSTRUCTION" },
  { href: "/mechanisms", label: "§02 MECHANISMS" },
  { href: "/paths/operations", label: "§03a OPERATIONS" },
  { href: "/paths/analyst", label: "§03b DETECTION" },
  { href: "/paths/leadership", label: "§03c GOVERNANCE" },
  { href: "/reframing", label: "§04 REFRAMING" },
];

export function CommandBar() {
  const pathname = usePathname();
  const [time, setTime] = useState("");
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setTime(d.toISOString().slice(11, 19));
    }, 1000);
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      setScroll(Math.round(p));
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => { clearInterval(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const current = ROUTES.find((r) => r.href === pathname) ?? ROUTES[0];

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-bg-0/70 border-b border-fg/10">
      <div className="flex items-center justify-between px-4 h-10 text-[11px] font-mono uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-phos">●</span>
          <span className="text-fg/70">GROUP-5 / FORENSIC-LEARN</span>
          <span className="text-fg/30">|</span>
          <span className="text-insight">{current.label}</span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {ROUTES.map((r) => (
            <Link key={r.href} href={r.href} className={cn(
              "px-2 py-0.5 hover:text-phos transition-colors",
              pathname === r.href ? "text-phos" : "text-fg/50"
            )}>
              {r.label.split(" ")[0]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-fg/50">
          <span>scroll {String(scroll).padStart(3, "0")}%</span>
          <span className="text-fg/30">|</span>
          <span className="text-phos/70">{time} UTC</span>
        </div>
      </div>
    </header>
  );
}
