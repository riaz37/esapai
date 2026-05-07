import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const tag = request.nextUrl.searchParams.get("tag") ?? "about";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (revalidateTag as any)(tag);

    return NextResponse.json({ revalidated: true, tag });
}
