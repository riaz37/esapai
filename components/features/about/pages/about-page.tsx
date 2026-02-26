"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AboutHero } from "@/components/features/about/hero";
import { LazySection } from "@/components/ui/lazy-section";
import { CTASection } from "@/components/features/home/sections/cta";

// --- Dynamic imports for below-fold sections (code-split + no SSR) ---
const AboutNarrative = dynamic(() => import("@/components/features/about/narrative").then(mod => mod.AboutNarrative), {
    ssr: false,
});

const AboutHistory = dynamic(() => import("@/components/features/about/history").then(mod => mod.AboutHistory), {
    ssr: false,
});

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
    teamMembers?: any[];
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
    return (
        <div className="relative">
            <AboutHero
                title={heroTitle}
                subtitle={heroSubtitle}
                badge={heroBadge}
                titlePart1={heroTitlePart1}
                titlePart2={heroTitlePart2}
            />

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
