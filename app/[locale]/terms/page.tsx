import type { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { getLegalPage } from "@/lib/legal-pages";
import { LocalizedLegalPageView } from "@/components/shared/localized-legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = getLegalPage("terms", locale);
  return generatePageMetadata({
    title: page.title,
    description: page.description,
    path: "/terms",
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = getLegalPage("terms", locale);

  return (
    <div className="relative">
      <LocalizedLegalPageView page={page} />
    </div>
  );
}
