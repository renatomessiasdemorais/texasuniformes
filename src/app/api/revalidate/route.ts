import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { type NextRequest, NextResponse } from "next/server";
import { SANITY_CONTENT_TAG } from "@/lib/content";

/**
 * Called by a Sanity webhook on publish/unpublish/delete so the site picks up
 * content changes within seconds instead of waiting for the cache to expire.
 * Configure in manage.sanity.io → API → Webhooks, pointing at this route with
 * the same secret as SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET não configurada" },
      { status: 500 }
    );
  }

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(
    req,
    secret
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  revalidateTag(SANITY_CONTENT_TAG, "max");

  return NextResponse.json({ revalidated: true, type: body._type });
}
