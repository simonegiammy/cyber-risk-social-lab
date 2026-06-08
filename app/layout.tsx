import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { TopNav } from "@/components/shell/TopNav";
import { SiteFooter } from "@/components/shell/SiteFooter";

export const metadata: Metadata = {
  title: "Functioning as Designed? A worked example for organizational learning",
  description: "A reusable organizational-learning example, illustrated with one anonymized phishing incident on an annual compliance routine.",
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
