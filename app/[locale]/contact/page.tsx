import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/features/contact/sections";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.metadata" });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const productSlug = typeof searchParams.product === "string" ? searchParams.product : undefined;
  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <div className="relative">
        <ContactSection productSlug={productSlug} />
      </div>
    </>
  );
}
