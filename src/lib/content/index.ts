import { cacheLife, cacheTag } from "next/cache";
import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";
import {
  allSegmentsQuery,
  clientLogosQuery,
  generalFaqQuery,
  segmentBySlugQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/lib/sanity/queries";
import type {
  ClientLogo,
  FaqItem,
  Segment,
  SegmentSlug,
  SiteSettings,
  Testimonial,
} from "@/types/content";
import {
  fallbackClientLogos,
  fallbackGeneralFaq,
  fallbackSegments,
  fallbackSiteSettings,
  fallbackTestimonials,
} from "./fallback-data";

export {
  fallbackBenefits,
  fallbackProcessSteps,
} from "./fallback-data";

/** Shared cache tag for all Sanity-backed content — invalidated on-demand by the /api/revalidate webhook. */
export const SANITY_CONTENT_TAG = "sanity-content";

const QUALIFIED_ORDER_ANSWER =
  "Atendemos pedidos sob encomenda para empresas e instituições a partir de 30 peças.";

function normalizeFaqItems(items: FaqItem[]): FaqItem[] {
  return items.map((item) => {
    const isMinimumOrderQuestion =
      /quantidade mínima/i.test(item.question) ||
      /vende para pessoa física/i.test(item.question);

    if (isMinimumOrderQuestion && !/30\s*peças/i.test(item.answer)) {
      return { ...item, answer: QUALIFIED_ORDER_ANSWER };
    }

    return item;
  });
}

function normalizeSegment(segment: Segment): Segment {
  return {
    ...segment,
    faq: normalizeFaqItems(segment.faq ?? []),
  };
}

function normalizeSiteSettings(data: SiteSettings): SiteSettings {
  const addressNeedsCorrection =
    !data.address?.line2 || /a confirmar/i.test(data.address.line2);
  const messageNeedsQualification =
    !data.whatsappMessage || !/30\s*peças/i.test(data.whatsappMessage);

  return {
    ...fallbackSiteSettings,
    ...data,
    address: addressNeedsCorrection
      ? fallbackSiteSettings.address
      : data.address,
    whatsappMessage: messageNeedsQualification
      ? fallbackSiteSettings.whatsappMessage
      : data.whatsappMessage,
    social: {
      ...fallbackSiteSettings.social,
      ...data.social,
    },
    home: {
      ...fallbackSiteSettings.home,
      ...data.home,
    },
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("max");
  cacheTag(SANITY_CONTENT_TAG);

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<SiteSettings | null>(
      siteSettingsQuery
    );
    if (data) return normalizeSiteSettings(data);
  }
  return fallbackSiteSettings;
}

export async function getAllSegments(): Promise<Segment[]> {
  "use cache";
  cacheLife("max");
  cacheTag(SANITY_CONTENT_TAG);

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<Segment[]>(allSegmentsQuery);
    if (data && data.length > 0) return data.map(normalizeSegment);
  }
  return fallbackSegments;
}

export async function getSegment(slug: SegmentSlug): Promise<Segment | null> {
  "use cache";
  cacheLife("max");
  cacheTag(SANITY_CONTENT_TAG);

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<Segment | null>(
      segmentBySlugQuery,
      { slug }
    );
    if (data) return normalizeSegment(data);
  }
  return fallbackSegments.find((s) => s.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("max");
  cacheTag(SANITY_CONTENT_TAG);

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<Testimonial[]>(testimonialsQuery);
    if (data && data.length > 0) return data;
  }
  return fallbackTestimonials;
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  "use cache";
  cacheLife("max");
  cacheTag(SANITY_CONTENT_TAG);

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<ClientLogo[]>(clientLogosQuery);
    if (data && data.length > 0) return data;
  }
  return fallbackClientLogos;
}

export async function getGeneralFaq(): Promise<FaqItem[]> {
  "use cache";
  cacheLife("max");
  cacheTag(SANITY_CONTENT_TAG);

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<FaqItem[]>(generalFaqQuery);
    if (data && data.length > 0) return normalizeFaqItems(data);
  }
  return fallbackGeneralFaq;
}

export const SEGMENT_SLUGS: SegmentSlug[] = [
  "uniformes-profissionais",
  "linha-hospitalar",
  "uniformes-escolares",
  "texteis-hotelaria",
];
