"use client";
import { useEffect, useState } from "react";

export function Typewriter({ lines, speed = 28, startDelay = 200, onDone }: { lines: string[]; speed?: number; startDelay?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) { onDone?.(); return; }
    const current = lines[lineIdx];
    if (charIdx <= current.length) {
      const t = setTimeout(() => {
        setDisplayed((d) => {
          const c = [...d];
          c[lineIdx] = current.slice(0, charIdx);
          return c;
        });
        setCharIdx((c) => c + 1);
      }, charIdx === 0 && lineIdx === 0 ? startDelay : speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx((i) => i + 1); setCharIdx(0); }, 280);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed, startDelay, onDone]);

  return (
    <div className="font-mono text-sm text-phos/80 leading-relaxed">
      {displayed.map((l, i) => (
        <div key={i}>
          <span className="text-phos/40">{">"}</span> {l}
          {i === lineIdx && <span className="inline-block w-2 h-4 bg-phos ml-1 animate-blink align-middle" />}
        </div>
      ))}
    </div>
  );
}
