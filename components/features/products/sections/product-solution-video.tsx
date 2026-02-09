"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
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

    // Placeholder video
    const demoVideo = "/fasih-demo.mp4";

    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top", // Start when section hits top
                end: "+=200%", // Pin for 200% screen height
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        // 3D Perspective Reveal
        // Initial state: Tilted back, pushed down, smaller, invisible
        tl.fromTo(videoWrapperRef.current,
            {
                rotationX: 45,
                y: 200, // Starts further down
                scale: 0.6,
                opacity: 0,
                transformPerspective: 1000,
            },
            {
                rotationX: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            }
        );

        // Continuous Floating Animation (Independent of scroll)
        // Starts after the scroll reveal settles or runs continuously
        gsap.to(videoWrapperRef.current, {
            y: "-=20",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });

        // Glow Expansion
        if (glowRef.current) {
            gsap.fromTo(glowRef.current,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 0.5,
                    scale: 1.4,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom", // Start earlier
                        end: "center center",
                        scrub: 1
                    }
                }
            );
        }

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen py-0 px-4 md:px-8 perspective-[1000px] overflow-hidden flex flex-col items-center justify-center bg-transparent z-20"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
                <div
                    ref={glowRef}
                    className="w-[60vw] h-[60vw] bg-primary/20 blur-[120px] rounded-full opacity-0"
                />
            </div>

            <div className="container max-w-[90rem] mx-auto flex flex-col items-center z-10">
                {/* Header */}
                <div className="mb-12 md:mb-20">
                    <SectionHeader
                        title={product?.content?.mission?.title ?? "Intelligence in Motion"}
                        subtitle="See it in action."
                        badge="Demo"
                        badgeIcon={Play}
                        align="center"
                    />
                </div>

                {/* 3D Video Container */}
                <div
                    ref={videoWrapperRef}
                    className="relative w-full max-w-7xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black/80 backdrop-blur-sm"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Video */}
                    <video
                        ref={videoRef}
                        src={demoVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay" />

                    {/* Shadow overlay for depth when tilted (optional, but adds realism) */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white opacity-90" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
