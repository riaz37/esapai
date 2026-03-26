import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCaseStudyBySlug, getCaseStudies, getRelatedCaseStudies } from "@/lib/case-studies";
import { CaseStudyPage } from "@/components/features/case-studies/pages/case-study-page";
import { generateCaseStudyMetadata } from "@/lib/seo/metadata";
import { generateArticleSchema } from "@/lib/seo/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import type { CaseStudySlugPageProps } from "@/types/page";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies("en");
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudySlugPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const caseStudy = await getCaseStudyBySlug(slug, locale);

  if (!caseStudy) {
    const t = await getTranslations({ locale, namespace: "CaseStudy.metadata" });
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  const thumbnailUrl =
    caseStudy.thumbnail?.url || caseStudy.heroImages?.[0]?.url;

  return generateCaseStudyMetadata(
    caseStudy.title,
    caseStudy.subtitle,
    slug,
    caseStudy.publishedAt,
    undefined, // modifiedTime
    thumbnailUrl
  );
}

export default async function CaseStudySlugPage({ params }: CaseStudySlugPageProps) {
  const { slug, locale } = await params;
  const caseStudy = await getCaseStudyBySlug(slug, locale);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = await getRelatedCaseStudies(
    caseStudy.tags,
    slug,
    locale,
    3
  );

  // Generate structured data
  const thumbnailUrl =
    caseStudy.thumbnail?.url || caseStudy.heroImages?.[0]?.url;
  const images = caseStudy.heroImages?.map((img) => img.url) || [];

  const structuredData = [
    generateArticleSchema({
      headline: caseStudy.title,
      description: caseStudy.subtitle,
      image: thumbnailUrl ? [thumbnailUrl, ...images] : images,
      datePublished: caseStudy.publishedAt,
      url: `/case-study/${slug}`,
      publisher: {
        name: "ESAP AI",
        logo: "https://www.esap.ai/logo/esaplogo.svg",
      },
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Case Study", url: "/case-study" },
      { name: caseStudy.title, url: `/case-study/${slug}` },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <div className="relative">
        <CaseStudyPage slug={slug} locale={locale} initialCaseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />
      </div>
    </>
  );
}
