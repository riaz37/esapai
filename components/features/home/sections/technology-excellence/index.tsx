"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Cpu, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import { TechCard } from "@/components/ui/tech-card";

gsap.registerPlugin(ScrollTrigger);

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

export function TechnologyExcellence({
    title,
    subtitle,
    badge,
    cards = []
}: TechnologyExcellenceProps = {}) {
    const displayTitle = title || "";
    const displaySubtitle = subtitle || "";
    const sectionRef = useRef<HTMLElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = [card1Ref.current, card2Ref.current];
            const header = sectionRef.current?.querySelector('[data-testid="section-header"]');

            // Staggered Entrance for Header
            if (header) {
                gsap.fromTo(
                    header.children,
                    { y: 30, opacity: 0, filter: "blur(10px)" },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        stagger: 0.1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: header,
                            start: "top 85%",
                        }
                    }
                );
            }

            // Cards Entrance
            gsap.fromTo(
                cards,
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

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
                            key={index}
                            ref={index === 0 ? card1Ref : index === 1 ? card2Ref : undefined}
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
                            ref={card1Ref}
                            title={""}
                            description={""}
                            videoSrc="/technology1.mp4"
                            delay={0}
                        />

                        {/* Card 2: Neural Processing (Fallback) */}
                        <TechCard
                            ref={card2Ref}
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
