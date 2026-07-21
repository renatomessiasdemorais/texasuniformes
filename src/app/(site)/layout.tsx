import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { getSiteSettings } from "@/lib/content";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  const settings = await getSiteSettings();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
      <body className="flex min-h-full flex-col font-sans text-text-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
