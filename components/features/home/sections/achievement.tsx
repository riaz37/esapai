"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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

    useGSAP(() => {
        if (!gridRef.current) return;

        const reducedMotion = prefersReducedMotion();
        const items = gridRef.current.querySelectorAll(".stat-item");
        const numbers = gridRef.current.querySelectorAll(".stat-number");

        if (reducedMotion) {
            gsap.set(items, { opacity: 1, y: 0 });
            // Also set numbers to their final state if reduced motion
            numbers.forEach((num) => {
                const targetStr = num.getAttribute("data-target") || "0";
                const suffix = num.getAttribute("data-suffix") || "";
                num.textContent = targetStr + suffix;
            });
            return;
        }

        // Entrance animation for items
        gsap.fromTo(items,
            {
                opacity: 0,
                y: 20,
            },
            {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                onComplete: () => {
                    // Number counting animation starts after items appear, similar to product page
                    numbers.forEach((num) => {
                        const targetStr = num.getAttribute("data-target") || "0";
                        const target = targetStr.includes(".") ? parseFloat(targetStr) : parseInt(targetStr);
                        const suffix = num.getAttribute("data-suffix") || "";
                        const obj = { value: 0 };

                        gsap.to(obj, {
                            value: target,
                            duration: 1.2,
                            ease: "power2.out",
                            onUpdate: () => {
                                const val = targetStr.includes(".") ? obj.value.toFixed(1) : Math.floor(obj.value);
                                num.textContent = val + suffix;
                            }
                        });
                    });
                }
            }
        );

    }, { scope: sectionRef });

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
                {/* Horizontal Framing Lines - Contained within content width */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#13F584]/50 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#13F584]/50 to-transparent z-20 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 md:divide-x md:divide-[#13F584]/30">
                    {displayAchievements.map((item: AchievementItemData, index: number) => (
                        <Spotlight
                            key={item.label}
                            className="stat-item relative flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center w-full h-full"
                            intensity={0.45}
                            radius={400}
                        >
                            {/* Vertical Framing Lines (Internal Dividers Only) - Behind Glow -> Now On Top */}
                            {index < displayAchievements.length - 1 && (
                                <div className="absolute top-0 bottom-0 end-0 w-[1px] bg-gradient-to-b from-transparent via-[#13F584]/40 to-transparent hidden md:block z-50 pointer-events-none" />
                            )}

                            <div className="relative z-40 pointer-events-none">
                                <span
                                    className="stat-number block text-5xl sm:text-6xl md:text-7xl font-bold text-primary tracking-tighter mb-3"
                                    data-target={item.number.replace(/[^0-9]/g, "")}
                                    data-suffix={item.number.replace(/[0-9]/g, "")}
                                >
                                    {item.number}
                                </span>
                                <span className="text-white/80 text-lg">
                                    {item.label}
                                </span>
                            </div>
                        </Spotlight>
                    ))}
                </div>
            </div>
        </Section>
    );
}
