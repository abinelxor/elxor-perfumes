import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/defaults";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllSlugs();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...docs.map((doc) => ({
      url: `${SITE_URL}/${doc.slug}`,
      lastModified: new Date(doc._updatedAt),
      changeFrequency: "monthly" as const,
      priority: doc._type === "product" ? 0.8 : 0.6,
    })),
  ];
}
