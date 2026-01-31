"use client";

import { useProductContent } from "@/lib/hooks/use-product-content";
import type { ProductPageClientProps } from "@/types/page";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";
import { ProductSolutionVideo, UserJourney, ProductCinematicReelSection } from "../sections";
import { ProductCinematicFlow } from "../sections/product-cinematic-flow";

const CTASection = dynamic(
  () => import("@/components/features/home/sections/cta").then((mod) => mod.CTASection)
);

export function ProductPage({ slug, initialProduct }: ProductPageClientProps) {
  const { product } = useProductContent(slug, {
    initialProduct,
  });

  const hydratedProduct = product ?? initialProduct;

  return (
    <div className="relative bg-black">

      {/* 1. UNIFIED CINEMATIC FLOW (Hero -> Entropy -> Order) */}
      <ProductCinematicFlow slug={slug} initialProduct={hydratedProduct} />

      {/* 2. Product Solution Video (Demo) */}
      <ProductSolutionVideo />

      {/* 3. Cinematic Showcase (Infinite Zoom Reel) */}
      <ProductCinematicReelSection />

      {/* 4. User Journey Layer */}
      <UserJourney productSlug={hydratedProduct.slug} />

      {/* 5. CTA Section */}
      <LazySection minHeight="400px">
        <CTASection
          title="Ready to Transform Your Workflow?"
          subtitle="Join the future of productivity today."
        />
      </LazySection>
    </div>
  );
}
