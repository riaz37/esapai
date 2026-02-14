"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PARTNERS = [
    { logo: "/partners/EMp.svg", alt: "Partner 1" },
    { logo: "/partners/EMp-1.svg", alt: "Partner 2" },
    { logo: "/partners/EMp-2-1.svg", alt: "Partner 3" },
    { logo: "/partners/EMp-3.svg", alt: "Partner 4" },
    { logo: "/partners/EMp-4.svg", alt: "Partner 5" },
    { logo: "/partners/EMp-5.svg", alt: "Partner 6" },
];

export function TrustedPartners() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

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

        // Infinite seamless marquee animation
        if (marqueeRef.current) {
            const marquee = marqueeRef.current;
            const marqueeWidth = marquee.offsetWidth / 2; // Half width since we duplicate

            // Set initial position
            gsap.set(marquee, { x: 0 });

            // Create infinite loop
            gsap.to(marquee, {
                x: -marqueeWidth,
                duration: 30,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % marqueeWidth)
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full pt-4 pb-4 sm:pt-6 sm:pb-6">
            <div className="relative flex overflow-hidden">
                {/* Marquee Row */}
                <div ref={marqueeRef} className="flex whitespace-nowrap py-8">
                    {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                        <div
                            key={index}
                            className="partner-item flex items-center justify-center px-8 sm:px-12 md:px-16 group/partner transition-all duration-300"
                        >
                            <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 flex items-center justify-center">
                                {/* Soft Glow behind logo */}
                                <div className="absolute inset-0 bg-primary/0 group-hover/partner:bg-primary/10 blur-2xl rounded-full transition-all duration-700" />

                                <Image
                                    src={partner.logo}
                                    alt={partner.alt}
                                    fill
                                    className="object-contain opacity-40 brightness-0 invert group-hover/partner:opacity-100 group-hover/partner:brightness-100 group-hover/partner:scale-110 transition-all duration-500 ease-out"
                                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
