import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { services } from "@/lib/services";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";

/**
 * This route immediately redirects to the first service, but it must still
 * declare its own metadata: without a `generateMetadata` export here, Next
 * falls back to the root layout's homepage metadata, which made
 * `/{locale}/service` self-canonicalize to the homepage instead of itself.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Navigation" });

  return generatePageMetadata({
    title: t("service"),
    path: "/service",
    locale,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const firstService = services[0];

  if (firstService) {
    redirect(`/${locale}/service/${firstService.slug}`);
  }

  redirect(`/${locale}`);
}
