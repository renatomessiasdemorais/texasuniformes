import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SegmentPageTemplate } from "@/components/SegmentPageTemplate";
import { getSegment } from "@/lib/content";
import type { SegmentSlug } from "@/types/content";

export async function buildSegmentMetadata(
  slug: SegmentSlug
): Promise<Metadata> {
  const segment = await getSegment(slug);
  if (!segment) return {};

  return {
    title: segment.title,
    description: segment.heroSubheadline || segment.intro,
    openGraph: {
      images: [{ url: segment.heroImage.src, width: 1200, height: 630 }],
    },
  };
}

export async function SegmentPage({ slug }: { slug: SegmentSlug }) {
  const segment = await getSegment(slug);
  if (!segment) notFound();

  return <SegmentPageTemplate segment={segment} />;
}
