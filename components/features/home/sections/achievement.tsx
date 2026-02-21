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

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ACHIEVEMENTS = [
    {
        number: "99.9%",
        label: "System Reliability",
    },
    {
        number: "50k+",
        label: "Active AI Agents",
        isHighlighted: true,
    },
    {
        number: "10x",
        label: "Efficiency Gain",
    },
];

export function Achievement() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!gridRef.current) return;

        const items = gridRef.current.querySelectorAll(".stat-item");
        const numbers = gridRef.current.querySelectorAll(".stat-number");

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
            }
        );

        // Number counting animation
        numbers.forEach((num) => {
            const targetStr = num.getAttribute("data-target") || "0";
            const target = targetStr.includes(".") ? parseFloat(targetStr) : parseInt(targetStr);
            const suffix = num.getAttribute("data-suffix") || "";
            const obj = { value: 0 };

            gsap.to(obj, {
                value: target,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: num,
                    start: "top 90%",
                },
                onUpdate: () => {
                    const val = targetStr.includes(".") ? obj.value.toFixed(1) : Math.floor(obj.value);
                    num.textContent = val + suffix;
                },
                onComplete: () => {
                    // Success pulse animation
                    gsap.timeline()
                        .to(num, {
                            scale: 1.15,
                            color: "#13F584",
                            duration: 0.4,
                            ease: "power2.out",
                        })
                        .to(num, {
                            scale: 1,
                            color: "white",
                            duration: 0.6,
                            ease: "power2.inOut",
                        });
                }
            });
        });
    }, { scope: sectionRef });

    return (
        <Section ref={sectionRef} padding="md" className="w-full bg-transparent overflow-hidden">
            <SectionHeader
                badge="Our Achievement"
                badgeIcon={Cpu}
                title="Innovation & Future Focus"
                subtitle="Quantifying the impact of our intelligent ecosystem on global enterprise operations."
                align="center"
                className="mb-10"
            />

            <div
                ref={gridRef}
                className="relative w-full max-w-[1400px] mx-auto"
            >
                {/* Horizontal Framing Lines - Contained within content width */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#13F584]/40 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#13F584]/40 to-transparent z-20 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-3 relative z-10">
                    {ACHIEVEMENTS.map((item, index) => (
                        <Spotlight
                            key={item.label}
                            className="stat-item relative flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center w-full h-full"
                            intensity={0.45}
                            radius={400}
                        >
                            {/* Vertical Framing Lines (Internal Dividers Only) - Behind Glow -> Now On Top */}
                            {index < ACHIEVEMENTS.length - 1 && (
                                <div className="absolute top-[-120px] bottom-[-200px] right-0 w-[2px] bg-gradient-to-b from-transparent via-[#13F584]/30 to-transparent hidden md:block z-50 pointer-events-none" />
                            )}

                            <div className="relative z-40 pointer-events-none">
                                <span
                                    className="stat-number block text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter mb-3"
                                    data-target={item.number.replace(/[^0-9]/g, "")}
                                    data-suffix={item.number.replace(/[0-9]/g, "")}
                                >
                                    {item.number}
                                </span>
                                <span className="text-white text-label-caps">
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
