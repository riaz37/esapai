"use client";

import { useServiceContent } from "@/lib/hooks/use-service-content";
import type { ServicePageClientProps } from "@/types/page";

import dynamic from "next/dynamic";

const ServiceProblemSection = dynamic(
  () => import("@/components/features/services/sections").then((mod) => ({ default: mod.ServiceProblemSection })),
);

const ServiceBeforeAfterSection = dynamic(
  () => import("@/components/features/services/sections").then((mod) => ({ default: mod.ServiceBeforeAfterSection })),
);

const ServiceFeaturesSection = dynamic(
  () => import("@/components/features/services/sections").then((mod) => ({ default: mod.ServiceFeatures })),
);

const ServiceProcessSection = dynamic(
  () => import("@/components/features/services/sections").then((mod) => ({ default: mod.ServiceProcessSection })),
);

const ServiceVideoSection = dynamic(
  () => import("@/components/features/services/sections").then((mod) => ({ default: mod.ServiceVideoSection })),
);

const ServicesCTASection = dynamic(
  () => import("@/components/features/services/sections").then((mod) => ({ default: mod.ServicesCTASection })),
);

import { ServiceHero } from "@/components/features/services/hero/service-hero";
import { Section } from "@/components/ui/section";

import { LazySection } from "@/components/ui/lazy-section";

const defaultHeroSubtitle = [
  "Where Innovation Meets Productivity Driven by agents Powered by automation",
  "Built for what's next",
];

export function ServicePage({ slug, initialService }: ServicePageClientProps) {
  const { service } = useServiceContent(slug, {
    initialService,
  });

  const hydratedService = service ?? initialService;
  const content = hydratedService.content ?? {};

  const heroSubtitle = content.hero?.subtitle ?? [
    hydratedService.description,
    ...defaultHeroSubtitle,
  ];
  const featuresContent = content.features;
  const features = featuresContent?.items ?? [];
  const youtubeVideoContent = content.youtubeVideo;

  return (
    <div className="relative">
      {/* 1. Hero */}
      <ServiceHero
        title={content.hero?.titleMain ?? hydratedService.name}
        tagline={content.hero?.titleHighlight}
        subtitle={heroSubtitle}
      />

      {/* 2. Problem: Why this service (placeholder) */}
      <LazySection minHeight="400px">
        <ServiceProblemSection />
      </LazySection>

      {/* 2c. Before & after: comparison video */}
      <LazySection minHeight="400px">
        <ServiceBeforeAfterSection />
      </LazySection>

      {/* 3. Solution: What we deliver */}
      <div id="solutions">
        <LazySection minHeight="400px">
          <ServiceFeaturesSection
            title={featuresContent?.title}
            subtitle={featuresContent?.subtitle}
            features={features}
          />
        </LazySection>
      </div>


      <LazySection minHeight="400px">
        <ServiceProcessSection />
      </LazySection>

      {/* 2b. Showcase: Digital Powerhouse Video */}
      <LazySection minHeight="400px">
        <ServiceVideoSection />
      </LazySection>

      {/* 7. CTA */}
      <LazySection minHeight="400px">
        <ServicesCTASection
          text="Join hundreds of enterprises leveraging AI-powered automation to drive growth, efficiency, and innovation."
          buttonText="Initialize Project"
          buttonHref="/contact"
        />
      </LazySection>
    </div>
  );
}
