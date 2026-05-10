"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AboutHero } from "@/components/features/about/sections/hero";
import { LazySection } from "@/components/ui/lazy-section";
import { BadgeChip } from "@/components/ui/badge-chip";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

// --- Dynamic imports for below-fold sections (code-split + no SSR) ---
const AboutNarrative = dynamic(() => import("@/components/features/about/sections/narrative").then(mod => ({ default: mod.AboutNarrative })), {
    ssr: false,
});

const AboutHistory = dynamic(() => import("@/components/features/about/sections/history").then(mod => ({ default: mod.AboutHistory })), {
    ssr: false,
});

const CTASection = dynamic(
    () => import("@/components/features/home/sections/cta").then(mod => ({ default: mod.CTASection })),
);

interface SanityPhase {
    phaseLabel?: string;
    title: string;
    description?: string;
    highlight?: string;
}

export interface AboutPageClientProps {
    heroTitle?: string;
    heroSubtitle?: string;
    heroBadge?: string;
    heroTitlePart1?: string;
    heroTitlePart2?: string;
    teamMembers?: Record<string, unknown>[];
    narrativeDesignation?: string;
    teamCategoryLabel?: string;
    teamLeadershipLabel?: string;
    teamInnovationLabel?: string;
    historyTitle?: string;
    historyBadge?: string;
    historySubtitle?: string;
    historyHook?: string;
    historyPhases?: SanityPhase[];
    visionTitle?: string;
    visionBody?: string;
}

export function AboutPageClient({
    heroTitle,
    heroSubtitle,
    heroBadge,
    heroTitlePart1,
    heroTitlePart2,
    teamMembers,
    narrativeDesignation,
    teamCategoryLabel,
    teamLeadershipLabel,
    teamInnovationLabel,
    historyTitle,
    historyBadge,
    historySubtitle,
    historyHook,
    historyPhases,
    visionTitle,
    visionBody,
}: AboutPageClientProps = {}) {
    const t = useTranslations("About.teamSection");
    return (
        <div className="relative">
            <AboutHero
                title={heroTitle}
                subtitle={heroSubtitle}
                badge={heroBadge}
                titlePart1={heroTitlePart1}
                titlePart2={heroTitlePart2}
                videoId="IWRdyj_Mj_8"
            />

            <div className="py-20 text-center px-6">
                <BadgeChip label="The People" icon={Users} className="mb-4" />
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                    {t("heading")}
                </h2>
                <p className="mt-4 text-white/50 text-base sm:text-lg max-w-xl mx-auto">
                    {t("subheading")}
                </p>
            </div>

            <LazySection minHeight="800px">
                <AboutNarrative
                    teamMembers={teamMembers}
                    designation={narrativeDesignation}
                    categoryLabel={teamCategoryLabel}
                    leadershipLabel={teamLeadershipLabel}
                    innovationLabel={teamInnovationLabel}
                />
            </LazySection>

            <LazySection minHeight="600px">
                <AboutHistory
                    title={historyTitle}
                    badge={historyBadge}
                    subtitle={historySubtitle}
                    hook={historyHook}
                    phases={historyPhases}
                    visionTitle={visionTitle}
                    visionBody={visionBody}
                />
            </LazySection>

            <LazySection minHeight="400px">
                <CTASection />
            </LazySection>
        </div>
    );
}
