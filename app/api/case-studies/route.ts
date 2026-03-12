import { NextResponse } from "next/server";
import {
  getPaginatedCaseStudies,
  normalizeCaseStudyListingParams,
} from "@/lib/case-studies";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const normalized = normalizeCaseStudyListingParams({
      page: searchParams.get("page") || undefined,
      pageSize: searchParams.get("pageSize") || undefined,
      tag: searchParams.get("tag") || undefined,
    });
    const caseStudyListing = await getPaginatedCaseStudies({
      locale,
      page: normalized.page,
      pageSize: normalized.pageSize,
      tag: normalized.tag,
    });

    return NextResponse.json({
      caseStudies: caseStudyListing.items,
      totalCount: caseStudyListing.totalCount,
      totalPages: caseStudyListing.totalPages,
      currentPage: caseStudyListing.currentPage,
      pageSize: caseStudyListing.pageSize,
      activeTag: caseStudyListing.activeTag,
      availableTags: caseStudyListing.availableTags,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching case studies:", error);
    }
    return NextResponse.json(
      {
        caseStudies: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 6,
        activeTag: null,
        availableTags: [],
        error: "Failed to fetch case studies",
      },
      { status: 500 }
    );
  }
}
