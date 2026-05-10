import { redirect } from "next/navigation";
import { products } from "@/lib/products";

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
