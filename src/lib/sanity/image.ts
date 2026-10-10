import createImageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./client";

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

/** Add width / format params to a Sanity CDN image URL returned by a GROQ query. */
export function sizedImage(url: string | undefined | null, width = 1200): string | undefined {
  if (!url) return undefined;
  return `${url}?w=${width}&auto=format`;
}

export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source);
