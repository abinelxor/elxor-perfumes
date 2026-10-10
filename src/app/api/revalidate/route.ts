import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { SANITY_TAG } from "@/lib/sanity/client";

/**
 * Sanity webhook target: publishing content in the Studio calls this so the
 * site refreshes immediately instead of waiting for the 60s revalidate window.
 *
 * Setup (sanity.io/manage > API > Webhooks):
 *   URL:     https://<your-domain>/api/revalidate
 *   Method:  POST, trigger on create / update / delete
 *   Header:  x-revalidate-secret: <same value as SANITY_REVALIDATE_SECRET>
 */
function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 501 });
  }

  const provided = request.headers.get("x-revalidate-secret") ?? "";
  if (!safeEqual(provided, secret)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(SANITY_TAG, "max");
  return NextResponse.json({ revalidated: true, tag: SANITY_TAG, now: Date.now() });
}
