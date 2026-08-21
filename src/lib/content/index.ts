import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { ClientLogo, FaqItem, Segment, SegmentSlug, SiteSettings, Testimonial } from "@/types/content";
import {
  fallbackClientLogos,
  fallbackGeneralFaq,
  fallbackSegments,
  fallbackSiteSettings,
  fallbackTestimonials,
} from "./fallback-data";

export { fallbackBenefits, fallbackProcessSteps } from "./fallback-data";

type DbSegment = {
  id: string; slug: string; title: string; short_name: string; hero_headline: string;
  hero_subheadline: string | null; hero_image_path: string | null; hero_image_alt: string;
  category_image_path: string | null; category_image_alt: string; intro: string | null;
};

const fallbackForSlug = (slug: string) => fallbackSegments.find((segment) => segment.slug === slug);

function toSegment(row: DbSegment, benefits: Array<{ icon: string; title: string; description: string }>, gallery: Array<{ image_path: string; alt: string }>, faq: Array<{ id: string; question: string; answer: string }>): Segment {
  const fallback = fallbackForSlug(row.slug);
  const heroFallback = fallback?.heroImage ?? fallbackSiteSettings.home.heroImage;
  const categoryFallback = fallback?.categoryImage ?? heroFallback;
  return {
    _id: row.id, slug: row.slug as SegmentSlug, title: row.title, shortName: row.short_name,
    heroHeadline: row.hero_headline, heroSubheadline: row.hero_subheadline ?? "",
    heroImage: { src: row.hero_image_path ?? heroFallback.src, alt: row.hero_image_alt || heroFallback.alt, width: heroFallback.width, height: heroFallback.height },
    categoryImage: { src: row.category_image_path ?? categoryFallback.src, alt: row.category_image_alt || categoryFallback.alt, width: categoryFallback.width, height: categoryFallback.height },
    intro: row.intro ?? "", benefits,
    gallery: gallery.map((image) => ({ src: image.image_path, alt: image.alt, width: 800, height: 1000 })),
    faq: faq.map((item) => ({ _id: item.id, question: item.question, answer: item.answer, category: row.slug as SegmentSlug })),
  };
}

async function fetchSegments(slug?: string): Promise<Segment[] | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;
  let query = supabase.from("segments").select("id, slug, title, short_name, hero_headline, hero_subheadline, hero_image_path, hero_image_alt, category_image_path, category_image_alt, intro").eq("is_published", true).order("position");
  if (slug) query = query.eq("slug", slug);
  const { data: rows, error } = await query;
  if (error || !rows?.length) return null;

  const ids = rows.map((row) => row.id);
  const [benefitsResult, galleryResult, faqResult] = await Promise.all([
    supabase.from("segment_benefits").select("segment_id, icon, title, description").in("segment_id", ids).order("position"),
    supabase.from("segment_gallery_images").select("segment_id, image_path, alt").in("segment_id", ids).order("position"),
    supabase.from("faq_items").select("id, segment_id, question, answer").in("segment_id", ids).eq("is_published", true).order("position"),
  ]);

  return rows.map((row) => toSegment(
    row as DbSegment,
    (benefitsResult.data ?? []).filter((item) => item.segment_id === row.id),
    (galleryResult.data ?? []).filter((item) => item.segment_id === row.id),
    (faqResult.data ?? []).filter((item) => item.segment_id === row.id),
  ));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackSiteSettings;
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", true).maybeSingle();
  if (error || !data) return fallbackSiteSettings;
  return {
    phone: data.phone, whatsapp: data.whatsapp, whatsappMessage: data.whatsapp_message, email: data.email,
    address: { line1: data.address_line1, line2: data.address_line2, mapUrl: data.map_url ?? "" },
    social: { instagram: data.instagram_url ?? undefined, facebook: data.facebook_url ?? undefined, linkedin: data.linkedin_url ?? undefined },
    home: {
      heroHeadline: data.home_hero_headline, heroSubheadline: data.home_hero_subheadline,
      heroImage: { src: data.home_hero_image_path ?? fallbackSiteSettings.home.heroImage.src, alt: data.home_hero_image_alt || fallbackSiteSettings.home.heroImage.alt, width: fallbackSiteSettings.home.heroImage.width, height: fallbackSiteSettings.home.heroImage.height },
    },
  };
}

export async function getAllSegments(): Promise<Segment[]> { return (await fetchSegments()) ?? fallbackSegments; }
export async function getSegment(slug: SegmentSlug): Promise<Segment | null> { const result = await fetchSegments(slug); return result?.[0] ?? fallbackSegments.find((segment) => segment.slug === slug) ?? null; }

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackTestimonials;
  const { data, error } = await supabase.from("testimonials").select("id, name, company, quote, avatar_path, avatar_alt").eq("is_published", true).order("position");
  if (error || !data?.length) return fallbackTestimonials;
  return data.map((item) => ({ _id: item.id, name: item.name, company: item.company, quote: item.quote, avatar: item.avatar_path ? { src: item.avatar_path, alt: item.avatar_alt, width: 160, height: 160 } : undefined }));
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackClientLogos;
  const { data, error } = await supabase.from("client_logos").select("id, name, logo_path, alt").eq("is_published", true).order("position");
  if (error || !data?.length) return fallbackClientLogos;
  return data.map((item) => ({ _id: item.id, name: item.name, logo: { src: item.logo_path, alt: item.alt, width: 320, height: 160 } }));
}

export async function getGeneralFaq(): Promise<FaqItem[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallbackGeneralFaq;
  const { data, error } = await supabase.from("faq_items").select("id, question, answer").is("segment_id", null).eq("is_published", true).order("position");
  if (error || !data?.length) return fallbackGeneralFaq;
  return data.map((item) => ({ _id: item.id, question: item.question, answer: item.answer, category: "geral" }));
}

export const SEGMENT_SLUGS: SegmentSlug[] = ["uniformes-profissionais", "linha-hospitalar", "uniformes-escolares", "texteis-hotelaria"];
