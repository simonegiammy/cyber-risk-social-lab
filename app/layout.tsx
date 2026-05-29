import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/shell/TopNav";

export const metadata: Metadata = {
  title: "Functioning as Designed? — Group 5 Forensic Learning",
  description: "An organisational learning microsite. Group 5 incident, annual compliance cycle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanlines vignette grain">
        <TopNav />
        <main className="pt-16 min-h-screen">{children}</main>
        <footer className="border-t border-fg/10 mt-24 py-6 px-4 text-center font-mono text-[10px] uppercase tracking-widest text-fg/40">
          <span className="text-phos">●</span> functioning-as-designed v0.1 · sourced verbatim from technical dossier — group 5
        </footer>
      </body>
    </html>
  );
}
