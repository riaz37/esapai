"use client";

import { useProductContent } from "@/lib/hooks/use-product-content";
import type { ProductPageClientProps } from "@/types/page";

import { ProductHero } from "@/components/features/products/hero/product-hero";

export function ProductPage({ slug, initialProduct }: ProductPageClientProps) {
  const { product } = useProductContent(slug, {
    initialProduct,
  });

  const hydratedProduct = product ?? initialProduct;
  const content = hydratedProduct.content ?? {};
  const heroSubtitle =
    content.hero?.subtitle ?? [
      "Where Innovation Meets Productivity Driven by agents Powered by automation",
      "Built for what's next",
    ];

  return (
    <div className="relative">
      {/* Hero loads immediately - critical for LCP */}
      <ProductHero
        title={hydratedProduct.name}
        subtitle={heroSubtitle}
        centerIcon={content.hero?.centerIcon}
        centerIconAlt={content.hero?.centerIconAlt}
        productSlug={hydratedProduct.slug}
      />
    </div>
  );
}
