"use client";
import dynamic from "next/dynamic";

const NetworkGraph = dynamic(() => import("./NetworkGraph").then(m => m.NetworkGraph), { ssr: false });

export function NetworkBackground() {
  return <NetworkGraph className="fixed inset-0 -z-10 opacity-60" />;
}
