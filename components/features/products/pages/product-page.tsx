"use client";

import { useProductContent } from "@/lib/hooks/use-product-content";
import type { ProductPageClientProps } from "@/types/page";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";
import { ProductHero } from "../hero";
import { ProductSolutionVideo, UserJourney, ProductCinematicReelSection, BusinessImpact } from "../sections";
import { ProductCinematicFlow } from "../sections/product-cinematic-flow";


const CTASection = dynamic(
  () => import("@/components/features/home/sections/cta").then((mod) => mod.CTASection)
);


export function ProductPage({ slug, initialProduct }: ProductPageClientProps) {
  const { product } = useProductContent(slug, {
    initialProduct,
  });

  const hydratedProduct = product ?? initialProduct;
  const content = hydratedProduct?.content ?? {};
  const heroSubtitle = content.hero?.subtitle ?? [
    "Where Innovation Meets Productivity",
    "Built for what's next",
  ];

  return (
    <div className="relative">

      {/* 1. Hero (ProductHero) */}
      <div>
        <ProductHero
          title={hydratedProduct?.name ?? ""}
          subtitle={heroSubtitle}
          centerIcon={content.hero?.centerIcon}
          centerIconAlt={content.hero?.centerIconAlt}
          productSlug={slug}
        />
      </div>

      {/* 2. Cinematic Flow (Problem -> Solution) */}
      <div id="cinematic">
        <ProductCinematicFlow slug={slug} initialProduct={hydratedProduct} />
      </div>

      {/* 3. Product Solution Video (Demo) */}
      <div id="solution-video">
        <ProductSolutionVideo product={hydratedProduct} />
      </div>

      {/* 4. Cinematic Showcase (Infinite Zoom Reel) */}
      <div>
        <ProductCinematicReelSection product={hydratedProduct} />
      </div>

      {/* 5. User Journey Layer */}
      <div>
        <UserJourney productSlug={hydratedProduct.slug} />
      </div>

      {/* 6. Business Impact (Outcomes) */}
      <div>
        <BusinessImpact product={hydratedProduct} />
      </div>

      {/* 7. CTA Section */}
      <div>
        <LazySection minHeight="400px">
          <CTASection product={hydratedProduct} />
        </LazySection>
      </div>
    </div>
  );
}
