import type { Metadata } from "next";
import { LazySection } from "@/components/ui/lazy-section";
import { SectionMask } from "@/components/ui/section-mask";
import { Hero } from "@/components/features/home/hero";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import { getHomePage } from "@/lib/sanity/queries";
import dynamic from "next/dynamic";

export const metadata: Metadata = generateHomeMetadata();


// Below-the-fold sections - lazy loaded with direct imports for proper code splitting
const MissionSection = dynamic(
  () => import("@/components/features/home/sections/mission").then((mod) => ({ default: mod.Mission })),
);

const ServiceSection = dynamic(
  () => import("@/components/features/home/sections/service").then((mod) => ({ default: mod.Service })),
);

const ProductShowcaseSection = dynamic(
  () => import("@/components/features/home/sections/product-showcase").then((mod) => ({ default: mod.ProductShowcase })),
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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Fetch CMS data — falls back to component defaults if null
  const data = await getHomePage(locale).catch(() => null);

  return (
    <main className="relative">

      <Hero
        title={data?.heroTitle}
        subtitle={data?.heroSubtitle}
        badgePill={data?.heroBadgePill}
        badgeDescription={data?.heroBadgeDescription}
        ctaButtonText={data?.ctaButtonText}
        ctaButtonHref={data?.ctaButtonHref}
      />



      {/* Portal Reveal Target: Technology Excellence */}
      <LazySection minHeight="400px">
        <TechnologyExcellenceSection
          title={data?.technologyTitle}
          subtitle={data?.technologySubtitle}
          badge={data?.technologyBadge}
          cards={data?.technologyCards}
          partners={data?.partners}
        />
      </LazySection>

      {/* Mission Section - Now with proper scroll room */}
      <LazySection minHeight="400px">
        <MissionSection
          title={data?.missionTitle}
          subtitle={data?.missionSubtitle}
          badge={data?.missionBadge}
          cards={data?.missionCards}
        />
      </LazySection>

      <LazySection minHeight="600px">
        <ServiceSection
          title={data?.servicesTitle}
          subtitle={data?.servicesSubtitle}
          badge={data?.servicesBadge}
          services={data?.services}
        />
      </LazySection>

      <LazySection minHeight="600px">
        <ProductShowcaseSection />
      </LazySection>

      <LazySection minHeight="120vh">
        <TextRevealSection text={data?.textRevealContent} />
      </LazySection>



      <LazySection minHeight="400px">
        <AchievementSection
          title={data?.achievementsTitle}
          subtitle={data?.achievementsSubtitle}
          badge={data?.achievementsBadge}
          achievements={data?.achievements}
        />
      </LazySection>

      <LazySection minHeight="600px">
        <CTASection
          title={data?.ctaTitle}
          subtitle={data?.ctaSubtitle}
        />
      </LazySection>
    </main>
  );
}

