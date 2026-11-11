import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/content";
import { GA4_MEASUREMENT_ID } from "@/lib/gtag";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.texasuniformes.com.br";
const googleAdsTagId = "AW-17241540832";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

/**
 * Layout das paginas de campanha. Proposital: sem menu de navegacao e sem
 * botao flutuante do site. A pagina tem um caminho so, que e pedir orcamento.
 */
export default async function LpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? GA4_MEASUREMENT_ID;
  const googleTagId = gaId ?? googleAdsTagId;
  const showPhone = settings.visibility.phone && Boolean(settings.phone);

  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
          strategy="afterInteractive"
        />
        <Script id="google-tags-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${gaId ? `gtag('config', '${gaId}');` : ""}
            gtag('config', '${googleAdsTagId}');
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col font-sans text-text-dark">
        <header className="bg-navy text-white">
          <Container className="flex h-16 items-center justify-between">
            <Link href="/" className="font-bold tracking-wide">
              <span className="text-lg uppercase">Texas</span>{" "}
              <span className="text-lg uppercase text-teal">Uniformes</span>
            </Link>
            {showPhone && (
              <a
                href={`tel:${settings.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-teal"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">{settings.phone}</span>
              </a>
            )}
          </Container>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-navy py-8 text-sm text-white/70">
          <Container className="flex flex-col gap-2">
            <p className="font-semibold text-white">Texas Uniformes</p>
            <p>Fabricação própria em Ananindeua/PA desde 1995.</p>
            <p>
              <Link href="/" className="underline hover:text-teal">
                Ver o site completo
              </Link>
            </p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
