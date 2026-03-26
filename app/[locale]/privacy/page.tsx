import type { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { getSanityLegalPage } from "@/lib/sanity/queries";
import { LegalPageFromSanity } from "@/components/shared/legal-page-sanity";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = await getSanityLegalPage("privacy", locale);
  return generatePageMetadata({
    title: page?.title ?? "Privacy Policy",
    description: page?.metaDescription ?? "ESAP AI Privacy Policy - Learn how we collect, use, and protect your personal information.",
    path: "/privacy",
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getSanityLegalPage("privacy", locale);

  if (!page) {
    return (
      <div className="relative flex items-center justify-center min-h-[60vh]">
        <p className="text-white/70">Content not available.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <LegalPageFromSanity page={page} />
    </div>
  );
}
