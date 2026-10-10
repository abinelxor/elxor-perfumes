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

/** Cache tag shared by every Sanity request; the webhook revalidates it. */
export const SANITY_TAG = "sanity";

/**
 * Fetch from Sanity with ISR-style caching. Returns null instead of throwing so
 * the site can fall back to its built-in content if the CMS is unavailable.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60, tags: [SANITY_TAG] },
    });
  } catch (error) {
    console.error("[sanity] fetch failed, using fallback content:", error);
    return null;
  }
}
