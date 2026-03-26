import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { getSanityProductBySlug } from "@/lib/sanity/queries";
import { ProductPage } from "@/components/features/products/pages/product-page";
import { generateProductMetadata } from "@/lib/seo/metadata";
import { generateProductSchema } from "@/lib/seo/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import type { ProductSlugPageProps } from "@/types/page";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return generateProductMetadata(product.name, product.description, slug);
}

export default async function ProductSlugPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  // Try Sanity first, fall back to hardcoded data
  const sanityProduct = await getSanityProductBySlug(slug, locale || "en").catch(() => null);
  const productData = sanityProduct || getProductBySlug(slug);

  if (!productData) {
    notFound();
  }

  // Generate structured data
  const productImage =
    productData.content?.hero?.centerIcon ||
    productData.icon ||
    "/products/default-product.svg";

  const structuredData = [
    generateProductSchema({
      name: productData.name,
      description: productData.description,
      image: productImage,
      url: `/product/${slug}`,
      brand: "ESAP AI",
      category: "AI Software",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Products", url: "/product" },
      { name: productData.name, url: `/product/${slug}` },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <div className="relative">
        <ProductPage slug={slug} initialProduct={productData} />
      </div>
    </>
  );
}

