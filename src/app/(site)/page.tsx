import { BenefitsBar } from "@/components/BenefitsBar";
import { ClientLogosBar } from "@/components/ClientLogosBar";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
// Depoimentos temporariamente desativados no site (conteúdo ainda placeholder) —
// ver componente TestimonialCarousel e getTestimonials em @/lib/content.
import {
  fallbackBenefits,
  fallbackProcessSteps,
  getClientLogos,
  getSiteSettings,
} from "@/lib/content";

export default async function Home() {
  const [settings, logos] = await Promise.all([
    getSiteSettings(),
    getClientLogos(),
  ]);

  return (
    <>
      <Hero
        headline={settings.home.heroHeadline}
        subheadline={settings.home.heroSubheadline}
        image={settings.home.heroImage}
        priority
      />
      <BenefitsBar benefits={fallbackBenefits} />
      <ProcessSteps steps={fallbackProcessSteps} />
      <ClientLogosBar logos={logos} />
    </>
  );
}
