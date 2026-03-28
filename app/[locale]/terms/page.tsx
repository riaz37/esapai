import type { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { getSanityLegalPage } from "@/lib/sanity/queries";
import { LegalPageFromSanity } from "@/components/shared/legal-page-sanity";
import { EmptyState } from "@/components/ui/empty-state";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = await getSanityLegalPage("terms", locale);
  return generatePageMetadata({
    title: page?.title ?? "Terms & Conditions",
    description: page?.metaDescription ?? "ESAP AI Terms & Conditions - Read our terms of service for using our AI platform and services.",
    path: "/terms",
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getSanityLegalPage("terms", locale);

  if (!page) {
    return (
      <div className="relative flex items-center justify-center min-h-[60vh]">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="relative">
      <LegalPageFromSanity page={page} />
    </div>
  );
}
