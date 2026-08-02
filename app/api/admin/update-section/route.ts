import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/sanity";

export async function POST(req: Request) {
  try {
    const { passcode, storyId, sectionFlags } = await req.json();

    const expectedPasscode = process.env.ADMIN_PASSCODE || "1234";
    if (passcode !== expectedPasscode) {
      return NextResponse.json({ error: "Unauthorized: Invalid passcode" }, { status: 401 });
    }

    if (!storyId || !sectionFlags) {
      return NextResponse.json({ error: "Missing storyId or sectionFlags" }, { status: 400 });
    }

    const token = process.env.SANITY_API_KEY || process.env.SANITY_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Sanity write token not configured in server environment." },
        { status: 500 }
      );
    }

    const authenticatedClient = client.withConfig({
      token: token,
      useCdn: false,
    });

    const updatedDocument = await authenticatedClient
      .patch(storyId)
      .set({
        isFeatured: Boolean(sectionFlags.isFeatured),
        isTrending: Boolean(sectionFlags.isTrending),
        isBreaking: Boolean(sectionFlags.isBreaking),
        isOpinion: Boolean(sectionFlags.isOpinion),
        isInDepth: Boolean(sectionFlags.isInDepth),
        isSpecial: Boolean(sectionFlags.isSpecial),
      })
      .commit();

    return NextResponse.json({ success: true, document: updatedDocument });
  } catch (err: any) {
    console.error("Admin section update error:", err);
    return NextResponse.json({ error: err.message || "Failed to update story" }, { status: 500 });
  }
}
