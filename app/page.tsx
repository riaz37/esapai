import type { Metadata } from "next";
import { LazySection } from "@/components/ui/lazy-section";
import { SectionMask } from "@/components/ui/section-mask";
import { Hero } from "@/components/features/home/hero";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import dynamic from "next/dynamic";

export const metadata: Metadata = generateHomeMetadata();


// Below-the-fold sections - lazy loaded with code splitting
const MissionSection = dynamic(
  () => import("@/components/features/about/sections/mission").then((mod) => ({ default: mod.Mission })),
);

const ServiceSection = dynamic(
  () => import("@/components/features/home/sections/service").then((mod) => ({ default: mod.Service })),
);


const ProductShowcaseSection = dynamic(
  () => import("@/components/features/home/sections/product-showcase").then((mod) => ({ default: mod.ProductShowcase })),
);

const TrustedPartnersSection = dynamic(
  () => import("@/components/features/home/sections/trusted-partners").then((mod) => ({ default: mod.TrustedPartners })),
);

const CTASection = dynamic(
  () => import("@/components/features/home/sections/cta").then((mod) => ({ default: mod.CTASection })),
);

const TextRevealSection = dynamic(
  () => import("@/components/features/home/sections/text-reveal").then((mod) => ({ default: mod.TextRevealSection })),
);

const AchievementSection = dynamic(
  () => import("@/components/features/home/sections/achievement").then((mod) => ({ default: mod.Achievement })),
);

const TechnologyExcellenceSection = dynamic(
  () => import("@/components/features/home/sections/technology-excellence").then((mod) => ({ default: mod.TechnologyExcellence })),
);

export default function Home() {
  return (
    <main className="relative">

      <Hero />



      {/* Portal Reveal Target: Technology Excellence */}
      <LazySection minHeight="800px">
        <TechnologyExcellenceSection />
      </LazySection>

      {/* Trusted Partners Ticker */}
      <TrustedPartnersSection />

      {/* Mission Section - Now with proper scroll room */}
      <LazySection minHeight="600px">
        <MissionSection />
      </LazySection>

      <LazySection minHeight="800px">
        <ServiceSection />
      </LazySection>

      <LazySection minHeight="600px">
        <ProductShowcaseSection />
      </LazySection>

      <LazySection minHeight="200vh">
        <TextRevealSection />
      </LazySection>



      <LazySection minHeight="400px">
        <AchievementSection />
      </LazySection>

      <LazySection minHeight="600px">
        <CTASection />
      </LazySection>
    </main>
  );
}
