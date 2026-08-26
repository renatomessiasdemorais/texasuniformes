import type { Metadata } from "next";
import { ClientLogosBar } from "@/components/ClientLogosBar";
import { PageHeader } from "@/components/PageHeader";
import { getClientLogos } from "@/lib/content";
import { getSiteSettings } from "@/lib/content";
import { redirect } from "next/navigation";

// Depoimentos temporariamente desativados no site (conteúdo ainda placeholder) —
// ver componente TestimonialGrid e getTestimonials em @/lib/content.

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Empresas, hospitais, escolas e hotéis que confiam na Texas Uniformes.",
};

export default async function ClientesPage() {
  const [logos, settings] = await Promise.all([getClientLogos(), getSiteSettings()]);
  if (!settings.visibility.clientsPage) redirect("/");

  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Empresas, hospitais, escolas e hotéis que confiam na Texas Uniformes."
      />

      {settings.visibility.clientLogos && <ClientLogosBar logos={logos} />}
    </>
  );
}
