import { BenefitsBar } from "@/components/BenefitsBar";
import { ClientLogosBar } from "@/components/ClientLogosBar";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import {
  fallbackBenefits,
  fallbackProcessSteps,
  getClientLogos,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";

export default async function Home() {
  const [settings, testimonials, logos] = await Promise.all([
    getSiteSettings(),
    getTestimonials(),
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
      <TestimonialCarousel testimonials={testimonials} />
    </>
  );
}
