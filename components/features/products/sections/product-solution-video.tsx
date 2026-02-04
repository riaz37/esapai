"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Play } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductSolutionVideoProps {
    product: Product | null;
}

export function ProductSolutionVideo({ product }: ProductSolutionVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const captionRef = useRef<HTMLParagraphElement>(null);

    const headline = product?.content?.mission?.title ?? "Intelligence in Motion";
    const subtitle = "See it in action.";
    // For now: Fasih demo only; per-product videos (e.g. product?.content?.hero?.demoVideo or slug map) can be added later.
    const demoVideo = "/fasih-demo.mp4";

    useGSAP(
        () => {
            if (!containerRef.current || !videoContainerRef.current) return;

            const reducedMotion = prefersReducedMotion();

            if (reducedMotion) {
                gsap.set(videoContainerRef.current, {
                    scale: 1,
                    opacity: 1,
                    clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
                });
                if (captionRef.current) gsap.set(captionRef.current, { opacity: 1, y: 0 });
                if (glowRef.current) gsap.set(glowRef.current, { opacity: 0.6, scale: 1.2 });
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    end: "top 20%",
                    scrub: 1.2,
                },
            });

            // Caption: appear just before or with the video reveal
            tl.fromTo(
                captionRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=1"
            );

            // Immersive Scale & Mask Reveal
            tl.fromTo(
                videoContainerRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                    clipPath: "inset(20% 20% 20% 20% round 2rem)",
                },
                {
                    scale: 1,
                    opacity: 1,
                    clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
                    duration: 2,
                    ease: "power2.out",
                }
            );

            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    opacity: 0.6,
                    scale: 1.2,
                    duration: 3,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        },
        { scope: containerRef, dependencies: [product?.slug] }
    );

    return (
        <section
            ref={containerRef}
            className="relative py-12 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden flex flex-col items-center justify-center min-h-[70vh] border-t border-white/10 bg-transparent"
        >
            {/* Continuity gradient from wipe above */}
            <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-10" />

            {/* Ambient Background — matches landing section glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    ref={glowRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/10 blur-[150px] rounded-full opacity-20"
                />
            </div>

            <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full">
                {/* Section header — same pattern as landing (Technology Excellence, Achievement) */}
                <div className="w-full mb-10 sm:mb-12 md:mb-16">
                    <SectionHeader
                        title={headline.includes(" ") ? (
                            <>
                                {headline.split(" ").slice(0, -1).join(" ")}{" "}
                                <span className="text-primary">{headline.split(" ").slice(-1)[0]}</span>
                            </>
                        ) : (
                            <span className="text-primary">{headline}</span>
                        )}
                        subtitle={undefined}
                        badge="Demo"
                        badgeIcon={Play}
                        align="center"
                        className="mb-0"
                    />
                </div>

                {/* Caption — scroll-animated (ref for GSAP) */}
                <p
                    ref={captionRef}
                    className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 font-mono max-w-2xl mx-auto opacity-0 mb-8"
                    aria-hidden
                >
                    {subtitle}
                </p>

                {/* Video UI Container — product-specific src */}
                <div
                    ref={videoContainerRef}
                    className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                >
                    <video
                        key={product?.slug}
                        src={demoVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/20 pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
