import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPageClient } from "@/components/features/about/pages/about-page";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About.metadata" });

    return generatePageMetadata({
        title: t("title"),
        description: t("description"),
        path: "/about",
        locale,
    });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });

    const historyRaw = t.raw("history") as {
        title: string;
        badge: string;
        subtitle: string;
        hook: string;
        phases: Array<{ phaseLabel?: string; title: string; description?: string; highlight?: string }>;
        vision: { title: string; body: string };
    };

    const teamMembers = (t.raw("team.members") as Array<Record<string, unknown>>);

    return (
        <div className="min-h-screen">
            <AboutPageClient
                heroBadge={t("hero.badge")}
                heroTitlePart1={t("hero.titlePart1")}
                heroTitlePart2={t("hero.titlePart2")}
                heroSubtitle={t("hero.subtitle")}
                narrativeDesignation={t("narrativeDesignation")}
                teamCategoryLabel={t("teamCategoryLabel")}
                teamLeadershipLabel={t("teamLeadershipLabel")}
                teamInnovationLabel={t("teamInnovationLabel")}
                historyTitle={historyRaw.title}
                historyBadge={historyRaw.badge}
                historySubtitle={historyRaw.subtitle}
                historyHook={historyRaw.hook}
                historyPhases={historyRaw.phases}
                visionTitle={historyRaw.vision.title}
                visionBody={historyRaw.vision.body}
                teamMembers={teamMembers}
            />
        </div>
    );
}
