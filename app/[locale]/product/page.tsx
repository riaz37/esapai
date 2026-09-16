import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { products } from "@/lib/products";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";

/**
 * This route immediately redirects to the first product, but it must still
 * declare its own metadata: without a `generateMetadata` export here, Next
 * falls back to the root layout's homepage metadata, which made
 * `/{locale}/product` self-canonicalize to the homepage instead of itself.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Navigation" });

  return generatePageMetadata({
    title: t("product"),
    path: "/product",
    locale,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const firstProduct = products[0];

  if (firstProduct) {
    redirect(`/${locale}/product/${firstProduct.slug}`);
  }

  redirect(`/${locale}`);
}
