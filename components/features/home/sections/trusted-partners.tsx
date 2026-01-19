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

        gsap.fromTo(sectionRef.current,
            {
                opacity: 0,
                y: 40,
                scale: 0.95,
                filter: "blur(4px)"
            },
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
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full pt-8 pb-8 sm:pt-12 sm:pb-12 overflow-hidden">
            <div className="relative flex overflow-hidden">
                {/* Marquee Row */}
                <div className="flex animate-marquee whitespace-nowrap py-4">
                    {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center px-12 sm:px-16 gap-3"
                        >
                            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                                {partner.name.substring(0, 2)}
                            </div>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/20 hover:text-primary/60 transition-colors cursor-default select-none uppercase tracking-tighter">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
