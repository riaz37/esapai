import React from "react";
import { AboutPageClient } from "@/components/features/about/pages/about-page";
import { getAboutPage } from "@/lib/sanity/queries";

export const metadata = {
    title: "About Us | ESAP AI ",
    description: "Learn about the legacy and vision of ESAP AI.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const data = await getAboutPage(locale).catch(() => null);

    return (
        <div className="min-h-screen">
            <AboutPageClient
                heroTitle={data?.heroTitle}
                heroSubtitle={data?.heroSubtitle}
                heroBadge={data?.heroBadge}
                heroTitlePart1={data?.heroTitlePart1}
                heroTitlePart2={data?.heroTitlePart2}
                teamMembers={data?.teamMembers}
                narrativeDesignation={data?.narrativeDesignation}
                teamCategoryLabel={data?.teamCategoryLabel}
                teamLeadershipLabel={data?.teamLeadershipLabel}
                teamInnovationLabel={data?.teamInnovationLabel}
                historyTitle={data?.historyTitle}
                historyBadge={data?.historyBadge}
                historySubtitle={data?.historySubtitle}
                historyHook={data?.historyHook}
                historyPhases={data?.historyPhases}
                visionTitle={data?.visionTitle}
                visionBody={data?.visionBody}
            />
        </div>
    );
}
