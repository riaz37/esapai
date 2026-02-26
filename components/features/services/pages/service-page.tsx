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
  const problemContent = content.problem;
  const processContent = content.process;
  const ctaContent = content.cta;

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
        <ServiceProblemSection
          title={problemContent?.title}
          subtitle={problemContent?.subtitle}
          badge={problemContent?.badge}
          items={problemContent?.items}
        />
      </LazySection>

      {/* 2c. Before & after: comparison video */}
      <LazySection minHeight="400px">
        <ServiceBeforeAfterSection
          title={content.beforeAfter?.title}
          badgeLabel={content.beforeAfter?.label}
        />
      </LazySection>

      {/* 3. Solution: What we deliver */}
      <div id="solutions">
        <LazySection minHeight="400px">
          <ServiceFeaturesSection
            title={featuresContent?.title}
            subtitle={featuresContent?.subtitle}
            badge={featuresContent?.badge}
            centralNode={featuresContent?.centralNode}
            features={features}
          />
        </LazySection>
      </div>


      <LazySection minHeight="400px">
        <ServiceProcessSection
          title={processContent?.title}
          subtitle={processContent?.subtitle}
          badge={processContent?.badge}
          steps={processContent?.steps}
        />
      </LazySection>

      {/* 2b. Showcase: Digital Powerhouse Video */}
      <LazySection minHeight="400px">
        <ServiceVideoSection />
      </LazySection>

      {/* 7. CTA */}
      <LazySection minHeight="400px">
        <ServicesCTASection
          title={ctaContent?.title}
          text={ctaContent?.subtitle || "Join hundreds of enterprises leveraging AI-powered automation to drive growth, efficiency, and innovation."}
          buttonText={ctaContent?.buttonText || "Initialize Project"}
          buttonHref={ctaContent?.buttonLink || "/contact"}
        />
      </LazySection>
    </div>
  );
}
