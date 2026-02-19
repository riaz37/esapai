"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeChip } from "@/components/ui/badge-chip";
import { GitCompare } from "lucide-react";
import { OptimizedVideo } from "@/components/ui/optimized-video";


gsap.registerPlugin(ScrollTrigger);

interface PortalVideoShowcaseProps {
    videoSrc: string;
    title?: string;
    subtitle?: string;
}

export function PortalVideoShowcase({ videoSrc, title = "See the difference", subtitle }: PortalVideoShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const container = containerRef.current;
            const videoContainer = videoRef.current;
            if (!container || !videoContainer) return;

            const mm = gsap.matchMedia();
            const videoElement = videoContainer.querySelector("video");

            mm.add("(min-width: 1024px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "+=200%", // 200vh scroll distance
                        scrub: 1, // Smooth scrubbing
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Initial State
                gsap.set(videoContainer, {
                    width: "40%",
                    left: "5%",
                    xPercent: 0,
                    top: "25%",
                    yPercent: 0,
                    borderRadius: "48px",
                    position: "absolute"
                });

                // Animation Sequence
                tl
                    // 1. Expand Video & Center
                    .to(videoContainer, {
                        width: "70%",
                        left: "50%",
                        xPercent: -50,
                        top: "50%",
                        yPercent: -50,
                        borderRadius: "32px",
                        duration: 1,
                        ease: "power1.inOut"
                    }, 0)
                    // 2. Fade out Text
                    .to(textRef.current, {
                        opacity: 0,
                        y: -50,
                        duration: 0.3,
                        ease: "power1.out"
                    }, 0)
                    // 3. Adjust Video Filters
                    .fromTo(videoElement,
                        { filter: "brightness(1.3) saturate(1.2)" },
                        { filter: "brightness(1) saturate(1)", duration: 0.8 },
                        0
                    )
                    // 4. Fade out overlay tint
                    .to(overlayRef.current, {
                        opacity: 0,
                        duration: 0.3
                    }, 0);
            });

            return () => mm.revert();
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative w-full h-auto lg:h-screen lg:overflow-hidden bg-black/5 flex flex-col pt-24 pb-12 lg:pt-0 lg:pb-0 lg:block">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative w-full h-full flex flex-col items-center">

                {/* Desktop Text Content - Aligned to Container */}
                <div className="absolute inset-x-0 top-[20%] z-10 pointer-events-none hidden lg:block">
                    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                        <div
                            ref={textRef}
                            className="w-full lg:w-[40%] ml-auto pointer-events-auto"
                        >
                            <div className="mb-6">
                                <BadgeChip label="Before & after" icon={GitCompare} />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Static Text (Visible only on small/medium screens) */}
                <div className="lg:hidden w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-8 text-center relative z-10">
                    <div className="flex justify-center mb-4">
                        <BadgeChip label="Before & after" icon={GitCompare} />
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
                </div>

                {/* Video Container Wrapper */}
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0 relative lg:static">
                    <div
                        ref={videoRef}
                        className="relative lg:absolute z-20 w-full shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 bg-black overflow-hidden aspect-video rounded-2xl lg:rounded-[48px]"
                    >
                        <OptimizedVideo
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />


                        {/* Overlay Tint (Visible only on Desktop initially) */}
                        <div
                            ref={overlayRef}
                            className="absolute inset-0 bg-indigo-900/40 lg:opacity-100 opacity-0 mix-blend-multiply pointer-events-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
