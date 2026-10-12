import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wox0hir2",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
};

/** Read-only, CDN-backed client for published content. */
export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: true,
  perspective: "published",
});

/**
 * Cache tag shared by every Sanity request. Content is cached until the "Push to live"
 * button in the Studio fires the webhook, which revalidates this tag.
 */
export const SANITY_TAG = "sanity";

/**
 * Fetch from Sanity, cached until the next push to live. Returns null instead of throwing so
 * the site can fall back to its built-in content if the CMS is unavailable.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params, {
      // Cached until "Push to live" (no time-based refresh), so publishing in the Studio
      // saves content without changing the live site
      next: { revalidate: false, tags: [SANITY_TAG] },
    });
  } catch (error) {
    console.error("[sanity] fetch failed, using fallback content:", error);
    return null;
  }
}
