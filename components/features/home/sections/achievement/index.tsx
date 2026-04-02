"use client";

import { useRef } from "react";
import { Cpu } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { SkeletonGrid } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { Counter } from "@/components/ui/counter";


export interface AchievementItemData {
    number: string;
    label: string;
    isHighlighted?: boolean;
}

export interface AchievementProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    achievements?: AchievementItemData[];
}

export function Achievement({
    title,
    subtitle,
    badge,
    achievements,
}: AchievementProps = {}) {
    const displayAchievements = achievements || [];
    const displayTitle = title || "";
    const displaySubtitle = subtitle || "";
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useScrollReveal(sectionRef, {
        selector: '[data-testid="section-header"] > *',
        y: 30,
        filter: "blur(10px)",
        stagger: 0.1,
        ease: "power2.out",
    });

    useScrollReveal(sectionRef, {
        selector: ".stat-item",
        y: 20,
        stagger: 0.2,
        dependencies: [displayAchievements],
    });

    return (
        <Section ref={sectionRef} padding="md" className="w-full bg-transparent overflow-hidden">
            <SectionHeader
                badge={badge ?? ""}
                badgeIcon={Cpu}
                title={displayTitle}
                subtitle={displaySubtitle}
                align="center"
            />

            <div
                ref={gridRef}
                className="relative w-full max-w-[1400px] mx-auto"
            >
                {achievements === undefined ? (
                    <SkeletonGrid count={3} variant="metric" columns="grid-cols-1 md:grid-cols-3" />
                ) : displayAchievements.length === 0 ? (
                    <EmptyState />
                ) : (
                <>
                {/* Horizontal Framing Lines - Contained within content width */}
                <div className="absolute top-0 start-0 end-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 start-0 end-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 md:divide-x md:divide-primary/30">
                    {displayAchievements.map((item: AchievementItemData, index: number) => (
                        <Spotlight
                            key={item.label}
                            className="stat-item relative flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center w-full h-full"
                            intensity={0.45}
                            radius={400}
                        >
                            {index < displayAchievements.length - 1 && (
                                <div className="absolute top-0 bottom-0 end-0 w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block z-50 pointer-events-none" />
                            )}

                            <div className="relative z-40 pointer-events-none">
                                <Counter
                                    value={item.number}
                                    className="block text-5xl sm:text-6xl md:text-7xl font-bold font-heading text-primary tracking-tighter mb-3"
                                />
                                <span className="text-white/80 text-lg">
                                    {item.label}
                                </span>
                            </div>
                        </Spotlight>
                    ))}
                </div>
                </>
                )}
            </div>
        </Section>
    );
}
