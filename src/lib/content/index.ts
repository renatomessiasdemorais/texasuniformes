import { cacheLife } from "next/cache";
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

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("hours");

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<SiteSettings | null>(
      siteSettingsQuery
    );
    if (data) return data;
  }
  return fallbackSiteSettings;
}

export async function getAllSegments(): Promise<Segment[]> {
  "use cache";
  cacheLife("hours");

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<Segment[]>(allSegmentsQuery);
    if (data && data.length > 0) return data;
  }
  return fallbackSegments;
}

export async function getSegment(slug: SegmentSlug): Promise<Segment | null> {
  "use cache";
  cacheLife("hours");

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<Segment | null>(
      segmentBySlugQuery,
      { slug }
    );
    if (data) return data;
  }
  return fallbackSegments.find((s) => s.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<Testimonial[]>(testimonialsQuery);
    if (data && data.length > 0) return data;
  }
  return fallbackTestimonials;
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  "use cache";
  cacheLife("hours");

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<ClientLogo[]>(clientLogosQuery);
    if (data && data.length > 0) return data;
  }
  return fallbackClientLogos;
}

export async function getGeneralFaq(): Promise<FaqItem[]> {
  "use cache";
  cacheLife("hours");

  if (isSanityConfigured && sanityClient) {
    const data = await sanityClient.fetch<FaqItem[]>(generalFaqQuery);
    if (data && data.length > 0) return data;
  }
  return fallbackGeneralFaq;
}

export const SEGMENT_SLUGS: SegmentSlug[] = [
  "uniformes-profissionais",
  "linha-hospitalar",
  "uniformes-escolares",
  "texteis-hotelaria",
];
