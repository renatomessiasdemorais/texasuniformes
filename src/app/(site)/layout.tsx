import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { RecoveryHashRedirect } from "@/components/RecoveryHashRedirect";
import { getAllSegments, getSiteSettings } from "@/lib/content";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const googleAdsTagId = "AW-17241540832";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Texas Uniformes — Fabricação de uniformes profissionais desde 1995",
    template: "%s | Texas Uniformes",
  },
  description:
    "Uniformes sob medida para empresas, hospitais, escolas e hotelaria. Fabricação própria em Ananindeua/PA desde 1995, com bordado e estamparia personalizados.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Texas Uniformes",
    images: [{ url: "/placeholders/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, segments] = await Promise.all([getSiteSettings(), getAllSegments()]);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const googleTagId = gaId ?? googleAdsTagId;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Texas Uniformes",
    description:
      "Fabricação de uniformes profissionais sob encomenda para empresas, hospitais, escolas e hotelaria desde 1995.",
    foundingDate: "1995",
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ananindeua",
      addressRegion: "PA",
      addressCountry: "BR",
    },
    url: siteUrl,
  };

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
        <RecoveryHashRedirect />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header showCompany={settings.visibility.companyPage} showClients={settings.visibility.clientsPage} showContact={settings.visibility.contactPage} segmentLinks={segments.map((segment) => ({ href: `/${segment.slug}`, label: segment.title }))} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
