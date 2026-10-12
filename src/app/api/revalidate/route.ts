import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { SANITY_TAG } from "@/lib/sanity/client";

/**
 * "Push to live" target. Content published in the Studio is only saved to Sanity; the
 * website keeps serving its cached copy until this route is called. The Studio's
 * "Push to live" button writes a small `liveRelease` record, and a Sanity webhook that
 * watches ONLY that record calls this route.
 *
 * Setup (sanity.io/manage > API > Webhooks > Create webhook):
 *   URL:        https://<your-domain>/api/revalidate
 *   Dataset:    production        Trigger on: Create, Update
 *   Filter:     _type == "liveRelease"
 *   Projection: {_type}
 *   Method:     POST
 *   HTTP header: x-revalidate-secret = <same value as SANITY_REVALIDATE_SECRET>
 *
 * Any request whose body says it is about a different document type is ignored, so a
 * webhook that is accidentally set up to watch everything cannot publish edits early.
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

  // Webhook body, e.g. {"_type":"liveRelease"}. A manual call without a body is allowed.
  const body = (await request.json().catch(() => null)) as { _type?: unknown } | null;
  if (body && typeof body._type === "string" && body._type !== "liveRelease") {
    return NextResponse.json({ ignored: true, reason: "Only Push to live refreshes the site" });
  }

  revalidateTag(SANITY_TAG, "max");
  return NextResponse.json({ revalidated: true, tag: SANITY_TAG, now: Date.now() });
}
