import type { Metadata } from "next";
import { ClientLogosBar } from "@/components/ClientLogosBar";
import { PageHeader } from "@/components/PageHeader";
import { getClientLogos } from "@/lib/content";

// Depoimentos temporariamente desativados no site (conteúdo ainda placeholder) —
// ver componente TestimonialGrid e getTestimonials em @/lib/content.

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Empresas, hospitais, escolas e hotéis que confiam na Texas Uniformes.",
};

export default async function ClientesPage() {
  const logos = await getClientLogos();

  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Empresas, hospitais, escolas e hotéis que confiam na Texas Uniformes."
      />

      <ClientLogosBar logos={logos} />
    </>
  );
}
