"use client";
import { useEffect, useState } from "react";

export function CursorCrosshair() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    const m = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => { window.removeEventListener("mousemove", m); document.body.classList.remove("custom-cursor"); };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {/* Crosshair lines */}
      <div className="absolute h-px bg-phos/30" style={{ top: pos.y, left: 0, right: 0 }} />
      <div className="absolute w-px bg-phos/30" style={{ left: pos.x, top: 0, bottom: 0 }} />
      {/* Center dot */}
      <div className="absolute w-2 h-2 border border-phos rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: pos.x, top: pos.y }} />
      {/* Readout */}
      <div className="absolute font-mono text-[10px] text-phos/80 px-1.5 py-0.5 bg-bg-0/80 border border-phos/30 tabular-nums" style={{ left: pos.x + 14, top: pos.y + 14 }}>
        [x:{String(pos.x).padStart(4, "0")} y:{String(pos.y).padStart(4, "0")}]
      </div>
    </div>
  );
}
