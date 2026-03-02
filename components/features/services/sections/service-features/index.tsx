"use client";

import { useMemo } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Layers } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

import type { ServiceFeaturesProps } from "@/types/props";
import { useServiceFeaturesFlow } from "./use-service-features-flow";
import { FlowContainer } from "./flow-container";

export function ServiceFeatures({
    title,
    subtitle,
    badge,
    centralNode,
    features = [],
}: ServiceFeaturesProps) {
    const t = useTranslations("Service.features");
    const resolvedTitle = title ?? t("defaultTitle");
    const resolvedSubtitle = subtitle ?? t("defaultSubtitle");

    const { nodes, edges } = useServiceFeaturesFlow({ centralNode, features });

    return (
        <Section padding="md" className="scroll-mt-20 md:scroll-mt-32">
            <SectionHeader
                badge={badge ?? ""}
                badgeIcon={Layers}
                title={resolvedTitle}
                subtitle={resolvedSubtitle}
                subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4"
            />

            {/* Mobile/Tablet View - Vertically Stacked Cards */}
            <div className="block lg:hidden max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col gap-4">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="p-4 sm:p-5 md:p-6"
                        >
                            <CardTitle className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gradient-radial-white">
                                {feature.title}
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm md:text-base text-light-gray-90 leading-relaxed">
                                {feature.description}
                            </CardDescription>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Desktop View - Interactive Graph */}
            <div className="hidden lg:block">
                <FlowContainer nodes={nodes} edges={edges} />
            </div>
        </Section>
    );
}
