"use client";

import React from "react";
import { Timeline } from "@/components/features/case-studies/sections/timeline";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { foundingStoryConfig } from "@/config/about-founding-story";
import { History } from "lucide-react";

export function AboutHistory() {
    // Map founding story phases to Timeline format
    const historyTimeline = foundingStoryConfig.phases.map((phase, index) => {
        // Approximate dates based on narrative
        const dates = ["2020-10-01", "2021-06-01", "2022-01-01"];
        return {
            date: dates[index] || "2022-01-01",
            title: phase.title,
            description: phase.body + (phase.highlight ? `\n\n${phase.highlight}` : ""),
            images: [],
        };
    });

    return (
        <Section className="py-12 sm:py-20 md:py-28 scroll-mt-20 md:scroll-mt-32">
            <SectionHeader
                badge="Our Legacy"
                badgeIcon={History}
                title="The Journey of ESAP AI"
                subtitle="From complex manual workflows to enterprise-grade AI autonomy."
                align="center"
            />
            <div className="max-w-7xl mx-auto px-6">
                <Timeline timeline={historyTimeline} />
            </div>
        </Section>
    );
}
