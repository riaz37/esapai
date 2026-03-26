import type { Metadata } from "next";
import { ContactSection } from "@/components/features/contact/sections";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with ESAP AI. Contact us to learn how our AI solutions can transform your business operations and drive innovation.",
  path: "/contact",
});

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
