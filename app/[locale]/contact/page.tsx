import type { Metadata } from "next";
import { ContactSection } from "@/components/features/contact/contact-section";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { getContactPage } from "@/lib/sanity/queries";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with ESAP AI. Contact us to learn how our AI solutions can transform your business operations and drive innovation.",
  path: "/contact",
});

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await getContactPage(locale).catch(() => null);

  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <main className="relative">
        <ContactSection />
      </main>
    </>
  );
}
