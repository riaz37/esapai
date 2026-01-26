"use client";

import { useProductContent } from "@/lib/hooks/use-product-content";
import type { ProductPageClientProps } from "@/types/page";
import { ProductHero } from "@/components/features/products/hero/product-hero";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";

const CTASection = dynamic(
  () => import("@/components/features/home/sections/cta").then((mod) => mod.CTASection)
);

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



      {/* CTA */}
      <LazySection minHeight="400px">
        <CTASection
          title="Ready to Transform Your Workflow?"
          subtitle="Join the future of productivity today."
        />
      </LazySection>
    </div>
  );
}
