"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Cpu, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import { TechCard } from "@/components/ui/tech-card";


export interface TechnologyCardData {
    title: string;
    description: string;
    image?: string; // We'll map videoSrc or image here
}

export interface TechnologyExcellenceProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    cards?: TechnologyCardData[];
}

const EMPTY_CARDS: TechnologyCardData[] = [];

export function TechnologyExcellence({
    title,
    subtitle,
    badge,
    cards = EMPTY_CARDS
}: TechnologyExcellenceProps = {}) {
    const displayTitle = title || "";
    const displaySubtitle = subtitle || "";
    const sectionRef = useRef<HTMLElement>(null);

    // Header Entrance
    useScrollReveal(sectionRef, {
        selector: '[data-testid="section-header"] > *',
        y: 30,
        filter: "blur(10px)",
        stagger: 0.1,
        ease: "power2.out",
    });

    // Cards Entrance
    useScrollReveal(sectionRef, {
        selector: ".tech-card-item",
        y: 50,
        scale: 0.95,
        stagger: 0.2,
        start: "top 70%",
        dependencies: [cards],
    });

    return (
        <Section ref={sectionRef} padding="md" className="relative z-10">
            <SectionHeader
                title={displayTitle}
                subtitle={displaySubtitle}
                badge={badge ?? ""}
                badgeIcon={Cpu}
                align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <TechCard
                            key={card.title || `tech-card-${index}`}
                            className="tech-card-item"
                            title={card.title}
                            description={card.description}
                            videoSrc={card.image || (index === 0 ? "/technology1.mp4" : "/technology2.mp4")}
                            delay={index * 0.2}
                        />
                    ))
                ) : (
                    <>
                        {/* Card 1: Autonomous Agents (Fallback) */}
                        <TechCard
                            className="tech-card-item"
                            title={""}
                            description={""}
                            videoSrc="/technology1.mp4"
                            delay={0}
                        />

                        {/* Card 2: Neural Processing (Fallback) */}
                        <TechCard
                            className="tech-card-item"
                            title={""}
                            description={""}
                            videoSrc="/technology2.mp4"
                            delay={0.2}
                        />
                    </>
                )}
            </div>
        </Section>
    );
}
