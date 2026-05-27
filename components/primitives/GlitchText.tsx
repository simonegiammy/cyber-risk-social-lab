"use client";
import { cn } from "@/lib/utils";

export function GlitchText({ children, className, as: As = "span" }: { children: React.ReactNode; className?: string; as?: any }) {
  return (
    <As className={cn("relative inline-block glitch", className)} data-text={typeof children === "string" ? children : undefined}>
      {children}
    </As>
  );
}
