import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCaseStudies } from "@/lib/case-studies";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { CaseStudyListAnimated } from "@/components/features/case-studies/pages/case-study-list-animated";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseStudy.metadata" });

  return generatePageMetadata({
    title: t("listTitle"),
    description: t("listDescription"),
    path: "/case-study",
  });
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const caseStudies = await getCaseStudies(locale);

  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Case Study", url: "/case-study" },
    ]),
    generateCollectionPageSchema({
      name: "Case Studies",
      description:
        "Real-world implementations of ESAP AI solutions. Discover how we transform businesses through innovative AI solutions and intelligent automation.",
      url: "/case-study",
      items: caseStudies.map((cs) => ({
        headline: cs.title,
        url: `/case-study/${cs.slug}`,
        image: cs.thumbnail?.url || cs.heroImages?.[0]?.url,
      })),
    }),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <CaseStudyListAnimated caseStudies={caseStudies} />
    </>
  );
}
