"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PARTNERS = [
    { name: "NVIDIA", logo: "/placeholder.svg" },
    { name: "GOOGLE", logo: "/placeholder.svg" },
    { name: "OPENAI", logo: "/placeholder.svg" },
    { name: "ANTHROPIC", logo: "/placeholder.svg" },
    { name: "MICROSOFT", logo: "/placeholder.svg" },
    { name: "META", logo: "/placeholder.svg" },
    { name: "AWS", logo: "/placeholder.svg" },
    { name: "TESLA", logo: "/placeholder.svg" },
];

export function TrustedPartners() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const logos = sectionRef.current.querySelectorAll(".partner-item");

        // Reveal the section
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    end: "top 70%",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                ease: "expo.out",
            }
        );

        // Staggered logo reveal
        gsap.fromTo(logos,
            { opacity: 0, scale: 0.8, y: 10 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full pt-8 pb-8 sm:pt-12 sm:pb-12 overflow-hidden">
            <div className="relative flex overflow-hidden">
                {/* Marquee Row */}
                <div className="flex animate-marquee whitespace-nowrap py-4">
                    {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                        <div
                            key={index}
                            className="partner-item flex items-center justify-center px-12 sm:px-16 gap-3 group/partner transition-all duration-300"
                        >
                            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 group-hover/partner:bg-primary/20 group-hover/partner:border-primary/40 group-hover/partner:text-primary transition-all duration-300">
                                {partner.name.substring(0, 2)}
                            </div>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/20 group-hover/partner:text-white/60 group-hover/partner:scale-105 transition-all duration-300 cursor-default select-none uppercase tracking-tighter">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
