import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { SANITY_TAG, sanityConfig } from "@/lib/sanity/client";

/**
 * Called by the "Push to live" button in the Studio (same origin, so no webhook or
 * secret has to be set up).
 *
 * The button first writes the `liveRelease` record to Sanity, which only people with
 * write access can do. This route then asks Sanity (uncached) when that record was last
 * written, using Sanity's own timestamp, and refreshes the website only if that was
 * moments ago. Anyone else calling this URL gets a 409 and nothing happens.
 */
const MAX_AGE_MS = 2 * 60 * 1000;

const freshClient = createClient({
  ...sanityConfig,
  useCdn: false, // the CDN can lag behind a write made a second ago
  perspective: "published",
});

export async function POST() {
  let updatedAt: string | undefined;
  try {
    const doc = await freshClient.fetch<{ _updatedAt?: string } | null>(
      `*[_id == "liveRelease"][0]{ _updatedAt }`,
      {},
      { cache: "no-store" },
    );
    updatedAt = doc?._updatedAt;
  } catch (error) {
    console.error("[push-live] could not reach Sanity:", error);
    return NextResponse.json({ message: "Could not reach Sanity to confirm the push." }, { status: 502 });
  }

  const age = updatedAt ? Date.now() - Date.parse(updatedAt) : Number.POSITIVE_INFINITY;
  if (!Number.isFinite(age) || age > MAX_AGE_MS) {
    return NextResponse.json(
      { message: "No recent Push to live was found. Press the button in the Studio." },
      { status: 409 },
    );
  }

  revalidateTag(SANITY_TAG, "max");
  return NextResponse.json({ revalidated: true, tag: SANITY_TAG, pushedAt: updatedAt });
}
