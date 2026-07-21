import type { Metadata } from "next";
import { ClientLogosBar } from "@/components/ClientLogosBar";
import { PageHeader } from "@/components/PageHeader";
import { TestimonialGrid } from "@/components/TestimonialGrid";
import { Container } from "@/components/ui/Container";
import { getClientLogos, getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Empresas, hospitais, escolas e hotéis que confiam na Texas Uniformes.",
};

export default async function ClientesPage() {
  const [testimonials, logos] = await Promise.all([
    getTestimonials(),
    getClientLogos(),
  ]);

  return (
    <>
      <PageHeader
        title="Clientes"
        subtitle="Empresas, hospitais, escolas e hotéis que confiam na Texas Uniformes."
      />

      <section className="bg-white py-16">
        <Container>
          <TestimonialGrid testimonials={testimonials} />
        </Container>
      </section>

      <ClientLogosBar logos={logos} />
    </>
  );
}
