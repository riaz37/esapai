"use client";

import { useServiceContent } from "@/lib/hooks/use-service-content";
import type { ServicePageClientProps } from "@/types/page";

import { ServiceHero } from "@/components/features/services/hero/service-hero";
import {
  ServiceFeatures as ServiceFeaturesSection,
  ServiceProblemSection,
  ServiceBeforeAfterSection,
  ServiceProcessSection,
  ServiceWhatWeNeedSection,
} from "@/components/features/services/sections";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/features/home/sections/cta";
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
      <ServiceHero title={hydratedService.name} subtitle={heroSubtitle} />

      {/* 2. Problem: Why this service (placeholder) */}
      <ServiceProblemSection />

      {/* 2b. Before & after: comparison video */}
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

      <ServiceWhatWeNeedSection />





      {/* 7. CTA */}
      <LazySection minHeight="400px">
        <CTASection
          title={
            <>
              <span className="text-white">Ready to get started? </span>
              <span className="text-primary">Tell us about your challenge.</span>
            </>
          }
          subtitle="Join hundreds of enterprises leveraging AI-powered automation to drive growth, efficiency, and innovation."
          primaryButtonText="Contact Us"
          primaryButtonHref="/contact"
          secondaryButtonText="Explore Services"
          secondaryButtonHref="/services"
        />
      </LazySection>
    </div>
  );
}
