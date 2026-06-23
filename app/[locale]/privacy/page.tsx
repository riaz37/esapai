import type { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { getLegalPage } from "@/lib/legal-pages";
import { LocalizedLegalPageView } from "@/components/shared/localized-legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = getLegalPage("privacy", locale);
  return generatePageMetadata({
    title: page.title,
    description: page.description,
    path: "/privacy",
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = getLegalPage("privacy", locale);

  return (
    <div className="relative">
      <LocalizedLegalPageView page={page} />
    </div>
  );
}
