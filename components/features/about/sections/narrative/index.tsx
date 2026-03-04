"use client";

import React, { useRef, useMemo } from "react";
import { m, AnimatePresence } from "motion/react";
import { ABOUT_V2_DATA } from "@/lib/about-v2-data";
import { NarrativeItem } from "../../components/narrative-item";
import { SidebarNavigator } from "../../components/sidebar-navigator";
import { useTranslations, useLocale } from "next-intl";
import { useNarrativeFlow } from "@/lib/hooks/use-narrative-flow";

export interface AboutNarrativeProps {
    data?: typeof ABOUT_V2_DATA;
    teamMembers?: any[];
    designation?: string;
    categoryLabel?: string;
    leadershipLabel?: string;
    innovationLabel?: string;
}

export const AboutNarrative: React.FC<AboutNarrativeProps> = ({
    data,
    teamMembers,
    designation,
    categoryLabel,
    leadershipLabel,
    innovationLabel,
}) => {
    const locale = useLocale();
    const t = useTranslations("About");

    interface TeamTranslation { role: string; bio: string; }
    const teamTranslations = t.raw("team") as Record<string, TeamTranslation>;

    // Resolved labels: prefer Sanity props, fall back to i18n
    const resolvedCategory = categoryLabel ?? "";
    const resolvedLeadership = leadershipLabel ?? "";
    const resolvedInnovation = innovationLabel ?? "";
    const resolvedDesignation = designation ?? "";

    const translatedData = useMemo(() => {
        const base = data && data.length > 0 ? data : ABOUT_V2_DATA;
        // If Sanity teamMembers provided, merge them with ABOUT_V2_DATA (photo/id structure)
        const mergedBase = teamMembers && teamMembers.length > 0
            ? teamMembers.map((member: any, index: number) => {
                const v2Item = base[index] ?? base[0];
                return {
                    ...v2Item,
                    name: member.name ?? v2Item.name,
                    price: member.role ?? v2Item.price,
                    description: member.bio ?? v2Item.description,
                    image: member.image ?? v2Item.image,
                };
            })
            : base;

        return mergedBase.map((item, index) => {
            // Fall back to i18n team translations if not using Sanity members
            const memberT = (!teamMembers || teamMembers.length === 0) ? teamTranslations[item.id] : null;
            const colorName = index % 2 === 0 ? resolvedLeadership : resolvedInnovation;
            return {
                ...item,
                category: resolvedCategory,
                colorName,
                description: memberT?.bio ?? item.description,
                price: memberT?.role ?? item.price,
            };
        });
    }, [data, teamMembers, resolvedCategory, resolvedLeadership, resolvedInnovation, teamTranslations]);

    const items = translatedData;
    const containerRef = useRef<HTMLDivElement>(null);
    const { activeIndex, direction, scrollToSection, variants } = useNarrativeFlow({
        containerRef,
        itemCount: items.length
    });

    return (
        <div ref={containerRef} className="relative h-[600vh] scroll-mt-20 md:scroll-mt-32">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">


                {/* Sidebar Navigator - Right Side */}
                <div className="absolute end-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                    <SidebarNavigator
                        items={items}
                        activeIndex={activeIndex}
                        onItemClick={scrollToSection}
                    />
                </div>

                {/* Narrative Slides */}
                <div className="relative w-full h-full flex-1">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <m.div
                            key={activeIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                y: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.5 },
                                filter: { duration: 0.5 },
                                scale: { duration: 0.5 }
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <NarrativeItem
                                item={items[activeIndex]}
                                isActive={true}
                                isFlipped={activeIndex % 2 !== 0}
                                designation={resolvedDesignation}
                            />
                        </m.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
