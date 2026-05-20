import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LazySection } from "@/components/ui/lazy-section";
import { Hero } from "@/components/features/home/hero";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import dynamic from "next/dynamic";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

export const metadata: Metadata = generateHomeMetadata();

export const revalidate = false;

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
  const t = await getTranslations({ locale, namespace: "Home" });

  const hero = {
    title: t("hero.title"),
    subtitle: t("hero.subtitle"),
    badgePill: t("hero.badgePill"),
    badgeDescription: t("hero.badgeDescription"),
    ctaButtonText: t("hero.ctaButtonText"),
  };

  const technology = {
    title: t("technology.title"),
    subtitle: t("technology.subtitle"),
    badge: t("technology.badge"),
  };

  const mission = {
    title: t("mission.title"),
    subtitle: t("mission.subtitle"),
    badge: t("mission.badge"),
    cards: t.raw("mission.items") as Array<{ title: string; description: string; image?: string }>,
  };

  const services = {
    title: t("services.title"),
    subtitle: t("services.subtitle"),
    badge: t("services.badge"),
    services: t.raw("services.items") as Array<{ id?: string; title: string; description: string; image?: string }>,
  };

  const achievements = {
    title: t("achievements.title"),
    subtitle: t("achievements.subtitle"),
    badge: t("achievements.badge"),
    achievements: t.raw("achievements.items") as Array<{ number: string; label: string; isHighlighted?: boolean }>,
  };

  return (
    <div className="relative">

      <Hero {...hero} />

      {/* Portal Reveal Target: Technology Excellence */}
      <LazySection minHeight="400px" className="pointer-events-none">
        <TechnologyExcellenceSection {...technology} />
      </LazySection>

      {/* Mission Section - Now with proper scroll room */}
      <LazySection minHeight="400px">
        <SectionErrorBoundary>
          <MissionSection {...mission} />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection minHeight="600px">
        <SectionErrorBoundary>
          <ServiceSection {...services} />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection minHeight="600px">
        <SectionErrorBoundary>
          <ProductShowcaseSection />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection minHeight="120vh">
        <SectionErrorBoundary>
          <TextRevealSection />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection minHeight="400px">
        <SectionErrorBoundary>
          <AchievementSection {...achievements} />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection minHeight="600px">
        <SectionErrorBoundary>
          <CTASection />
        </SectionErrorBoundary>
      </LazySection>
    </div>
  );
}

