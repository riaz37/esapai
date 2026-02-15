"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
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
    const glowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Placeholder video
    const demoVideo = "/fasih-demo.mp4";

    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current || !headerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=500%", // Slightly longer for focal hold
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
            }
        });

        // 1. Initial State: Deep in 3D Space
        gsap.set(videoWrapperRef.current, {
            z: -2000,
            rotationX: 35,
            opacity: 0,
            filter: "blur(20px) brightness(2)",
            transformPerspective: 2500,
        });

        // 2. Reveal Header (Starts active)
        tl.to(headerRef.current, { opacity: 1, y: 0, duration: 1 }, 0);
        tl.to({}, { duration: 2 }); // Hero Hold

        // 3. Vanish Header
        tl.to(headerRef.current, {
            opacity: 0,
            y: -150,
            scale: 0.8,
            filter: "blur(10px)",
            duration: 3,
            ease: "power4.inOut"
        });

        // 4. Kinetic Reveal Sequence
        tl.to(videoWrapperRef.current, {
            opacity: 1,
            z: 0,
            y: 40, // Settle lower to clear navigation bar
            rotationX: 0,
            filter: "blur(0px) brightness(1)",
            duration: 4,
            ease: "power3.out"
        }, ">-1.5");

        // 5. Focal Drift (The "Breathing" hold)
        tl.to(videoWrapperRef.current, {
            z: 100, // Reduced drift to stay within safety bounds
            y: 50, // Maintain safety gap
            duration: 4,
            ease: "sine.inOut"
        });

        // Continuous Floating Animation (Subtle)
        gsap.to(videoWrapperRef.current, {
            y: "+=15",
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        if (glowRef.current) {
            tl.to(glowRef.current, {
                opacity: 0.6,
                scale: 1.4,
                duration: 3,
                ease: "power2.out"
            }, "reveal-=2");
        }

    }, { scope: containerRef });

    return (
        <Section
            ref={containerRef}
            withContainer={false}
            className="relative w-full h-screen text-white perspective-[2500px] overflow-hidden"
            padding="none"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                <div
                    ref={glowRef}
                    className="w-[85vw] h-[85vw] bg-primary/5 blur-[180px] rounded-full opacity-0"
                />
            </div>

            {/* Step 1: Cinematic Header Layer */}
            <div
                ref={headerRef}
                className="header-wrap absolute inset-0 z-50 flex flex-col items-center justify-start pt-48 md:pt-56 pointer-events-none"
            >
                <div className="container mx-auto px-4 text-center">
                    <SectionHeader
                        title={product?.content?.mission?.title ?? "Intelligence in Motion"}
                        subtitle="See it in action."
                        badge="Demo"
                        badgeIcon={Play}
                        align="center"
                    />
                </div>
            </div>

            {/* Step 2: The Kinetic 3D Stage (Lowered to clear Navigation) */}
            <div className="video-stage absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4 md:px-8 pt-20">
                <div
                    ref={videoWrapperRef}
                    className="relative w-[85vw] max-w-[1200px] max-h-[70vh] aspect-video rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5 bg-black pointer-events-auto will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Video Content */}
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            src={demoVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />

                        {/* High-End Finish Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none mix-blend-overlay" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>

                    {/* Cinematic Play Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center group cursor-pointer transition-all duration-700">
                        <div className="w-24 h-24 md:w-28 md:h-28 bg-white/[0.02] backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/[0.05] group-hover:border-primary/40">
                            <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white opacity-80 transition-all duration-500 group-hover:text-primary group-hover:fill-primary group-hover:opacity-100" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Edge Fog / Depth Masks */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#09090b] to-transparent z-40" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent z-40" />
        </Section>
    );
}
