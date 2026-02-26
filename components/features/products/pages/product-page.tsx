"use client";

import { useProductContent } from "@/lib/hooks/use-product-content";
import type { ProductPageClientProps } from "@/types/page";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";
import { ProductHero } from "../hero";

// --- Dynamic imports for below-fold sections (code-split + no SSR) ---
const ProductCinematicFlow = dynamic(
  () => import("../sections/product-cinematic-flow").then((mod) => mod.ProductCinematicFlow),
  { ssr: false }
);

const ProductSolutionVideo = dynamic(
  () => import("../sections/product-solution-video").then((mod) => mod.ProductSolutionVideo),
  { ssr: false }
);

const ProductCinematicReelSection = dynamic(
  () => import("../sections/product-cinematic-reel-section").then((mod) => mod.ProductCinematicReelSection),
  { ssr: false }
);

const UserJourney = dynamic(
  () => import("../sections/user-journey").then((mod) => mod.UserJourney),
  { ssr: false }
);

const BusinessImpact = dynamic(
  () => import("../sections/business-impact").then((mod) => mod.BusinessImpact),
  { ssr: false }
);

const CTASection = dynamic(
  () => import("@/components/features/home/sections/cta").then((mod) => mod.CTASection),
  { ssr: false }
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

      {/* 1. Hero (ProductHero) — static import, above-fold */}
      <div>
        <ProductHero
          title={hydratedProduct?.name ?? ""}
          subtitle={heroSubtitle}
          centerIcon={content.hero?.centerIcon}
          centerIconAlt={content.hero?.centerIconAlt}
          productSlug={slug}
          tagline={content.hero?.tagline}
          exploreButton={content.exploreButton}
        />
      </div>

      {/* 2. Cinematic Flow (Problem -> Solution) */}
      <LazySection minHeight="400px" rootMargin="400px">
        <div id="cinematic">
          <ProductCinematicFlow slug={slug} initialProduct={hydratedProduct} />
        </div>
      </LazySection>

      {/* 3. Product Solution Video (Demo) */}
      <LazySection minHeight="400px" rootMargin="300px">
        <div id="solution-video">
          <ProductSolutionVideo product={hydratedProduct} />
        </div>
      </LazySection>

      {/* 4. Cinematic Showcase (Infinite Zoom Reel) */}
      <LazySection minHeight="400px" rootMargin="300px">
        <ProductCinematicReelSection product={hydratedProduct} />
      </LazySection>

      {/* 5. User Journey Layer */}
      <LazySection minHeight="400px" rootMargin="300px">
        <UserJourney productSlug={hydratedProduct.slug} initialProduct={hydratedProduct} />
      </LazySection>

      {/* 6. Business Impact (Outcomes) */}
      <LazySection minHeight="400px" rootMargin="300px">
        <BusinessImpact product={hydratedProduct} />
      </LazySection>

      {/* 7. CTA Section */}
      <LazySection minHeight="400px">
        <CTASection product={hydratedProduct} />
      </LazySection>
    </div>
  );
}
