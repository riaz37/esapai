import type { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { TeamCarousel } from "@/components/about/TeamCarousel";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about ESAP AI - Leading the next wave of global innovation by creating AI-powered tools and platforms that make work simpler, faster, and smarter.",
  path: "/about",
});

export default function AboutPage() {
  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <main className="relative bg-black min-h-screen">
        <TeamCarousel />
      </main>
    </>
  );
}
