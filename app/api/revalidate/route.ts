import { updateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const tag = request.nextUrl.searchParams.get("tag") ?? "about";
    updateTag(tag);

    return NextResponse.json({ revalidated: true, tag });
}
