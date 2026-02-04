"use client";

import { useRef, useState, useCallback } from "react";
import { useProductContent } from "@/lib/hooks/use-product-content";
import type { ProductPageClientProps } from "@/types/page";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";
import { ProductHero } from "../hero";
import { ProductSolutionVideo, UserJourney, ProductCinematicReelSection, BusinessImpact } from "../sections";
import { ProductCinematicFlow } from "../sections/product-cinematic-flow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = dynamic(
  () => import("@/components/features/home/sections/cta").then((mod) => mod.CTASection)
);

const SECTION_IDS = ["hero", "cinematic", "solution-video", "reel", "journey", "impact", "cta"] as const;

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

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  useGSAP(() => {
    const refs = sectionRefs.current.filter(Boolean);
    if (refs.length === 0) return;

    const triggers = refs.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 40%",
        end: "bottom 60%",
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
        onLeaveBack: () => i > 0 && setActiveSection(i - 1),
        onLeave: () => i < refs.length - 1 && setActiveSection(i + 1),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const reducedMotion = typeof window !== "undefined" && prefersReducedMotion();

  return (
    <div className="relative bg-[#09090b]">
      {/* Floating progress nav — matches landing nav / card style */}
      <div
        className="fixed right-4 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center gap-3 py-3 px-2 rounded-full bg-[#09090b]/90 border border-white/10 backdrop-blur-sm"
        aria-label="Page sections"
      >
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              activeSection === i ? "bg-primary scale-125" : "bg-white/20 scale-100",
              reducedMotion && "duration-0"
            )}
            aria-label={`Go to section ${i + 1}`}
            aria-current={activeSection === i ? "true" : undefined}
          />
        ))}
      </div>

      {/* 1. Hero (ProductHero) */}
      <div ref={(el) => { sectionRefs.current[0] = el; }} data-section={SECTION_IDS[0]}>
        <ProductHero
          title={hydratedProduct?.name ?? ""}
          subtitle={heroSubtitle}
          centerIcon={content.hero?.centerIcon}
          centerIconAlt={content.hero?.centerIconAlt}
          productSlug={slug}
        />
      </div>

      {/* 2. Cinematic Flow (Problem -> Solution) */}
      <div id="cinematic" ref={(el) => { sectionRefs.current[1] = el; }} data-section={SECTION_IDS[1]}>
        <ProductCinematicFlow slug={slug} initialProduct={hydratedProduct} />
      </div>

      {/* 3. Product Solution Video (Demo) */}
      <div id="solution-video" ref={(el) => { sectionRefs.current[2] = el; }} data-section={SECTION_IDS[2]}>
        <ProductSolutionVideo product={hydratedProduct} />
      </div>

      {/* 4. Cinematic Showcase (Infinite Zoom Reel) */}
      <div ref={(el) => { sectionRefs.current[3] = el; }} data-section={SECTION_IDS[3]}>
        <ProductCinematicReelSection product={hydratedProduct} />
      </div>

      {/* 5. User Journey Layer */}
      <div ref={(el) => { sectionRefs.current[4] = el; }} data-section={SECTION_IDS[4]}>
        <UserJourney productSlug={hydratedProduct.slug} />
      </div>

      {/* 6. Business Impact (Outcomes) */}
      <div ref={(el) => { sectionRefs.current[5] = el; }} data-section={SECTION_IDS[5]}>
        <BusinessImpact product={hydratedProduct} />
      </div>

      {/* 7. CTA Section */}
      <div ref={(el) => { sectionRefs.current[6] = el; }} data-section={SECTION_IDS[6]}>
        <LazySection minHeight="400px">
          <CTASection product={hydratedProduct} />
        </LazySection>
      </div>
    </div>
  );
}
