import { NextResponse } from "next/server";
import { getCaseStudies } from "@/lib/case-studies";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const caseStudies = await getCaseStudies(locale);

    return NextResponse.json({ caseStudies });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching case studies:", error);
    }
    return NextResponse.json(
      { caseStudies: [], error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
