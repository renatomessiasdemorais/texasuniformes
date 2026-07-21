import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { SanityImage } from "@/types/content";

export function Hero({
  headline,
  subheadline,
  image,
  ctaHref = "/contato",
  ctaLabel = "Solicitar orçamento",
  priority = false,
}: {
  headline: string;
  subheadline?: string;
  image: SanityImage;
  ctaHref?: string;
  ctaLabel?: string;
  priority?: boolean;
}) {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-navy text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover opacity-50"
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
      <Container className="relative py-24">
        <h1 className="max-w-2xl text-4xl font-bold uppercase tracking-wide sm:text-5xl">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 max-w-xl text-lg text-white/85">{subheadline}</p>
        )}
        <Link
          href={ctaHref}
          className="mt-8 inline-block rounded-full bg-teal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </Link>
      </Container>
    </section>
  );
}
