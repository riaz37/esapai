"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Workflow } from "lucide-react";

import { PRODUCT_JOURNEYS } from "@/config/user-journeys";
import type { Product } from "@/types/product";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";

import { MobileJourneyFlow } from "./components/mobile-journey-flow";
import { DesktopJourneyFlow } from "./components/desktop-journey-flow";

export const UserJourney = ({
    productSlug = "ai-framework",
    initialProduct
}: {
    productSlug?: string;
    initialProduct?: Product | null
}) => {
    const locale = useLocale();
    const isRTL = locale === "ar";

    const sanityJourney = initialProduct?.content?.journey;
    const stages = sanityJourney?.stages ?? [];
    const journeyBadge = sanityJourney?.badge ?? "";

    const journeyConfig = useMemo(() =>
        PRODUCT_JOURNEYS[productSlug] || PRODUCT_JOURNEYS["ai-framework"],
        [productSlug]);

    const journeyData = useMemo(() => {
        // Sanity journey layers take priority over i18n
        if (sanityJourney?.layers && sanityJourney.layers.length > 0) {
            return {
                ...journeyConfig,
                journeyTitle: sanityJourney.title ?? journeyConfig.journeyTitle,
                journeySubtitle: sanityJourney.subtitle ?? journeyConfig.journeySubtitle,
                layers: journeyConfig.layers.map((layer, li) => ({
                    ...layer,
                    title: sanityJourney.layers![li]?.title ?? layer.title,
                    nodes: layer.nodes.map((node, ni) => ({
                        ...node,
                        data: {
                            ...node.data,
                            title: sanityJourney.layers![li]?.nodes[ni] ?? (node.data.title as string),
                        },
                    })),
                })),
            };
        }
        return journeyConfig;
    }, [journeyConfig, sanityJourney]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Section className="relative w-full" padding="md">

            <div className="w-full mx-auto px-0">
                <SectionHeader
                    title={journeyData.journeyTitle || (sanityJourney?.title ?? "")}
                    subtitle={journeyData.journeySubtitle}
                    badge={journeyBadge}
                    badgeIcon={Workflow}
                    animate={true}
                    titleClassName="text-4xl md:text-5xl lg:text-7xl"
                    subtitleClassName="text-base md:text-xl text-white/50 max-w-2xl"
                />
            </div>

            {isMobile ? (
                <MobileJourneyFlow layers={journeyData.layers} stages={stages} isRTL={isRTL} />
            ) : (
                <DesktopJourneyFlow layers={journeyData.layers} stages={stages} isRTL={isRTL} />
            )}
        </Section>
    );
};
