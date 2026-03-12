import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  DEFAULT_CASE_STUDY_PAGE_SIZE,
  buildCaseStudyListingPath,
  getPaginatedCaseStudies,
  normalizeCaseStudyListingParams,
} from "@/lib/case-studies";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { CaseStudyListAnimated } from "@/components/features/case-studies/pages/case-study-list-animated";

type CaseStudySearchParams = {
  page?: string | string[];
  tag?: string | string[];
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<CaseStudySearchParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const query = await searchParams;
  const t = await getTranslations({ locale, namespace: "CaseStudy.metadata" });
  const normalized = normalizeCaseStudyListingParams(
    {
      page: query.page,
      tag: query.tag,
    },
    DEFAULT_CASE_STUDY_PAGE_SIZE
  );

  return generatePageMetadata({
    title: t("listTitle"),
    description: t("listDescription"),
    path: normalized.tag
      ? "/case-study"
      : buildCaseStudyListingPath({ page: normalized.page }),
    noIndex: Boolean(normalized.tag),
  });
}

export default async function CaseStudiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<CaseStudySearchParams>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const normalized = normalizeCaseStudyListingParams(
    {
      page: query.page,
      tag: query.tag,
    },
    DEFAULT_CASE_STUDY_PAGE_SIZE
  );
  const caseStudyListing = await getPaginatedCaseStudies({
    locale,
    page: normalized.page,
    pageSize: DEFAULT_CASE_STUDY_PAGE_SIZE,
    tag: normalized.tag,
  });

  if (normalized.page > caseStudyListing.currentPage) {
    redirect(
      `/${locale}${buildCaseStudyListingPath({
        page: caseStudyListing.currentPage,
        tag: caseStudyListing.activeTag,
      })}`
    );
  }

  const currentListingPath = buildCaseStudyListingPath({
    page: caseStudyListing.currentPage,
    tag: caseStudyListing.activeTag,
  });

  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Case Study", url: "/case-study" },
    ]),
    generateCollectionPageSchema({
      name: "Case Studies",
      description:
        "Real-world implementations of ESAP AI solutions. Discover how we transform businesses through innovative AI solutions and intelligent automation.",
      url: currentListingPath,
      items: caseStudyListing.items.map((cs) => ({
        headline: cs.title,
        url: `/case-study/${cs.slug}`,
        image: cs.thumbnail?.url || cs.heroImages?.[0]?.url,
      })),
    }),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <CaseStudyListAnimated
        caseStudies={caseStudyListing.items}
        totalCount={caseStudyListing.totalCount}
        totalPages={caseStudyListing.totalPages}
        currentPage={caseStudyListing.currentPage}
        pageSize={caseStudyListing.pageSize}
        activeTag={caseStudyListing.activeTag}
        availableTags={caseStudyListing.availableTags}
      />
    </>
  );
}
