import type { MetadataRoute } from "next";
import { SEGMENT_SLUGS } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/empresa", "/clientes", "/contato"];
  const routes = [...staticRoutes, ...SEGMENT_SLUGS.map((slug) => `/${slug}`)];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
