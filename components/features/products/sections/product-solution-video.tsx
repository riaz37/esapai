"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Play } from "lucide-react";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import type { Product } from "@/types/product";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductSolutionVideoProps {
    product: Product | null;
}

export function ProductSolutionVideo({ product }: ProductSolutionVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Placeholder video
    const demoVideo = "/fasih-demo.mp4";

    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%",
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // 1. Initial State: Deep in 3D Space
        gsap.set(videoWrapperRef.current, {
            z: -1800,
            rotationX: 30,
            opacity: 0,
            filter: "blur(15px) brightness(1.5)",
            transformPerspective: 2500,
        });

        // 2. Kinetic Reveal Sequence
        tl.to(videoWrapperRef.current, {
            opacity: 1,
            z: 0,
            rotationX: 0,
            filter: "blur(0px) brightness(1)",
            duration: 4,
            ease: "power4.out"
        }, 0);

        // 3. Focal Hold / Cinematic Breathing
        tl.to(videoWrapperRef.current, {
            z: 80,
            duration: 5,
            ease: "sine.inOut"
        });

        // Subtle continuous float
        gsap.to(videoWrapperRef.current, {
            y: "+=12",
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <div className="relative w-full">
            {/* Desktop/Tablet Header - Unpinned */}
            <div className="hidden md:block container mx-auto px-6 py-12 sm:py-24 pb-0 relative z-20">
                <SectionHeader
                    title={product?.content?.mission?.title ?? "Intelligence in Motion"}
                    subtitle="Experience the standard of enterprise autonomy."
                    badge="Demo"
                    badgeIcon={Play}
                    align="center"
                    className="mb-10"
                />
            </div>

            <Section
                ref={containerRef}
                withContainer={false}
                className="relative w-full h-[85vh] md:h-screen perspective-[2500px] overflow-hidden md:-mt-20"
                padding="none"
            >
                {/* Mobile-Only Pinned Header - Clears Navbar */}
                <div className="block md:hidden container mx-auto px-6 pt-32 pb-0 relative z-20">
                    <SectionHeader
                        title={product?.content?.mission?.title ?? "Intelligence in Motion"}
                        subtitle="Experience the standard of enterprise autonomy."
                        badge="Demo"
                        badgeIcon={Play}
                        align="center"
                        className="mb-0"
                    />
                </div>

                {/* The Kinetic 3D Stage - Tightened for mobile to reduce gaps */}
                <div className="video-stage absolute inset-0 z-10 flex items-start justify-center pointer-events-none px-4 md:px-8 pt-72 md:pt-40">
                    <div
                        ref={videoWrapperRef}
                        className="relative w-[95vw] md:w-[90vw] max-w-[1400px] max-h-[40vh] md:max-h-[75vh] aspect-video rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 bg-zinc-950 pointer-events-auto will-change-transform"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Video Content */}
                        <div className="relative w-full h-full">
                            <OptimizedVideo
                                src={demoVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />


                            {/* Internal Cinematic Finish Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none mix-blend-overlay" />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                        </div>

                        {/* Interactive Play Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center group cursor-pointer transition-all duration-1000">
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40">
                                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white transition-all duration-500 group-hover:text-primary group-hover:fill-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
