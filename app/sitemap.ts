import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/projects";
import { getAllNoteSlugs } from "@/lib/notes";

export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.pavankamarajugadda.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getAllProjectSlugs();
  const noteSlugs = getAllNoteSlugs();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...noteSlugs.map((slug) => ({
      url: `${siteUrl}/notes/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
