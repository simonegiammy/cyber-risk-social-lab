import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { TopNav } from "@/components/shell/TopNav";
import { SiteFooter } from "@/components/shell/SiteFooter";

export const metadata: Metadata = {
  title: "Functioning as Designed? — Group 5 Forensic Learning",
  description: "An organisational learning microsite. Group 5 incident, annual compliance cycle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanlines vignette grain">
        <LangProvider>
          <TopNav />
          <main className="pt-16 min-h-screen">{children}</main>
          <SiteFooter />
        </LangProvider>
      </body>
    </html>
  );
}
