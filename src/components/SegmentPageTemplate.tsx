import { BenefitsBar } from "@/components/BenefitsBar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Hero } from "@/components/Hero";
import { ProductGallery } from "@/components/ProductGallery";
import { QuoteForm } from "@/components/QuoteForm";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/content";
import type { Segment } from "@/types/content";

export async function SegmentPageTemplate({ segment }: { segment: Segment }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero
        headline={segment.heroHeadline}
        subheadline={segment.heroSubheadline}
        image={segment.heroImage}
        ctaHref="#orcamento"
        priority
      />

      <BenefitsBar benefits={segment.benefits} />

      {segment.intro && (
        <section className="bg-white py-16">
          <Container className="max-w-3xl text-center">
            <p className="text-lg text-text-dark/80">{segment.intro}</p>
          </Container>
        </section>
      )}

      {segment.gallery.length > 0 && (
        <section className="bg-light-bg py-16">
          <Container>
            <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-navy sm:text-3xl">
              Peças de {segment.title}
            </h2>
            <ProductGallery images={segment.gallery} />
          </Container>
        </section>
      )}

      <section id="orcamento" className="bg-white py-20">
        <Container className="max-w-2xl">
          <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-navy sm:text-3xl">
            Solicite seu orçamento
          </h2>
          <QuoteForm defaultSegment={segment.slug} whatsapp={settings.whatsapp} />
        </Container>
      </section>

      {segment.faq.length > 0 && (
        <section className="bg-light-bg py-20">
          <Container className="max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-navy sm:text-3xl">
              Perguntas frequentes
            </h2>
            <FaqAccordion items={segment.faq} />
          </Container>
        </section>
      )}
    </>
  );
}
