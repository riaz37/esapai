"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ACHIEVEMENTS = [
    {
        number: "200+",
        label: "Customer",
    },
    {
        number: "200+",
        label: "Customer",
        isHighlighted: true,
    },
    {
        number: "200+",
        label: "Customer",
    },
];

export function Achievement() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!gridRef.current) return;

        const items = gridRef.current.querySelectorAll(".stat-item");

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
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full py-12 sm:py-16 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4">
                <SectionHeader
                    badge="Our Achievement"
                    badgeIcon={Cpu}
                    title="Innovation & Future Focus"
                    subtitle="Get lifetime access to all the components. No recurring fees. Just simple, transparent pricing."
                    align="center"
                    className="mb-16 sm:mb-24"
                />

                <div
                    ref={gridRef}
                    className="relative w-full max-w-6xl mx-auto"
                >
                    {/* Horizontal Framing Lines - Contained within content width */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#13F584]/15 to-transparent z-20 pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#13F584]/15 to-transparent z-20 pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10">
                        {ACHIEVEMENTS.map((item, index) => (
                            <Spotlight
                                key={index}
                                className="stat-item relative flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center w-full h-full"
                                intensity={0.2}
                                radius={300}
                            >
                                {/* Vertical Framing Lines (Internal Dividers Only) - Behind Glow -> Now On Top */}
                                {index < ACHIEVEMENTS.length - 1 && (
                                    <div className="absolute top-[-120px] bottom-[-200px] right-0 w-px bg-gradient-to-b from-transparent via-[#13F584]/10 to-transparent hidden md:block z-50 pointer-events-none" />
                                )}

                                <div className="relative z-40 pointer-events-none">
                                    <span className="block text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter mb-3">
                                        {item.number}
                                    </span>
                                    <span className="text-xs sm:text-sm text-zinc-500 font-bold uppercase tracking-[0.2em] opacity-80">
                                        {item.label}
                                    </span>
                                </div>
                            </Spotlight>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
