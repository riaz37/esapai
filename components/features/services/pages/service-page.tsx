"use client";

import { useServiceContent } from "@/lib/hooks/use-service-content";
import type { ServicePageClientProps } from "@/types/page";

import { ServiceHero } from "@/components/features/services/hero/service-hero";
import {
  ServiceFeatures as ServiceFeaturesSection,
  ServiceProblemSection,
  ServiceBeforeAfterSection,
  ServiceProcessSection,
  ServiceVideoSection,
  ServicesCTASection,
} from "@/components/features/services/sections";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
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
        title={content.hero?.heroTitle ?? hydratedService.name}
        subtitle={heroSubtitle}
      />

      {/* 2. Problem: Why this service (placeholder) */}
      <ServiceProblemSection />

      {/* 2b. Showcase: Digital Powerhouse Video */}


      {/* 2c. Before & after: comparison video */}
      <ServiceBeforeAfterSection />

      {/* 3. Solution: What we deliver */}
      <div id="solutions">
        <ServiceFeaturesSection
          title={featuresContent?.title}
          subtitle={featuresContent?.subtitle}
          features={features}
        />
      </div>


      <ServiceProcessSection />

      {/* 2b. Showcase: Digital Powerhouse Video */}
      <ServiceVideoSection />





      {/* 7. CTA */}
      <ServicesCTASection
        text="Join hundreds of enterprises leveraging AI-powered automation to drive growth, efficiency, and innovation."
        buttonText="Initialize Project"
        buttonHref="/contact"
      />
    </div>
  );
}
