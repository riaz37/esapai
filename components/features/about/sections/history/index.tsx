
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Timeline } from "@/components/features/case-studies/sections/timeline";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { History } from "lucide-react";


interface SanityPhase {
    phaseLabel?: string;
    title: string;
    description?: string;
    highlight?: string;
}

export interface AboutHistoryProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    hook?: string;
    phases?: SanityPhase[];
    visionTitle?: string;
    visionBody?: string;
}

export function AboutHistory({
    title,
    subtitle,
    badge,
    hook,
    phases,
    visionTitle,
    visionBody,
}: AboutHistoryProps = {}) {
    const t = useTranslations("About.history");

    const displayTitle = title ?? "";
    const displaySubtitle = subtitle ?? "";
    const displayBadge = badge ?? "";

    // Map phases: prefer Sanity phases if provided, else fall back to i18n
    const rawI18nPhases = phases ?? (t.raw("phases") as SanityPhase[]);

    const dates = ["2020-10-01", "2021-06-01", "2022-01-01"];
    const historyTimeline = rawI18nPhases.map((phase, index) => {
        // Support both `description` (Sanity) and `body` (i18n shape)
        const body = (phase as any).body ?? phase.description ?? "";
        return {
            date: dates[index] || "2022-01-01",
            title: phase.title,
            description: body + (phase.highlight ? `\n\n${phase.highlight}` : ""),
            images: [],
        };
    });

    // Vision section: prefer Sanity props, else fall back to i18n
    const resolvedVisionTitle = visionTitle ?? ((t.raw("vision") as any)?.title);
    const resolvedVisionBody = visionBody ?? ((t.raw("vision") as any)?.body);

    return (
        <Section className="scroll-mt-20 md:scroll-mt-32">
            <SectionHeader
                badge={displayBadge}
                badgeIcon={History}
                title={displayTitle}
                subtitle={displaySubtitle}
                align="center"
            />
            <div className="max-w-7xl mx-auto px-6">
                <Timeline timeline={historyTimeline} />
            </div>

            {resolvedVisionTitle && resolvedVisionBody && (
                <div className="max-w-4xl mx-auto px-6 mt-16">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{resolvedVisionTitle}</h3>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed">{resolvedVisionBody}</p>
                </div>
            )}
        </Section>
    );
}
