"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeChip } from "@/components/ui/badge-chip";
import { GitCompare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PortalVideoShowcaseProps {
    videoSrc: string;
    title?: string;
    subtitle?: string;
}

export function PortalVideoShowcase({ videoSrc, title = "See the difference", subtitle }: PortalVideoShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !wrapperRef.current || !videoRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%", // 200vh scroll distance
                    scrub: 1, // Smooth scrubbing
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Initial State (Set explicitly to avoid FOUC)
            gsap.set(videoRef.current, {
                width: "40%",
                left: "5%",
                xPercent: 0,
                top: "25%",
                borderRadius: "48px",
            });

            // Animation Sequence
            tl
                // 1. Expand Video & Center
                .to(videoRef.current, {
                    width: "70%",
                    left: "50%",
                    xPercent: -50, // Center horizontally
                    top: "50%",
                    yPercent: -50, // Center vertically
                    borderRadius: "32px",
                    duration: 1,
                    ease: "power1.inOut"
                }, 0)

                // 2. Fade out Text (as video expands)
                .to(textRef.current, {
                    opacity: 0,
                    y: -50,
                    duration: 0.3,
                    ease: "power1.out"
                }, 0)

                // 3. Adjust Video Filters (Bright -> Normal)
                .fromTo(videoRef.current.querySelector("video"),
                    { filter: "brightness(1.3) saturate(1.2)" },
                    { filter: "brightness(1) saturate(1)", duration: 0.8 },
                    0
                )

                // 4. Fade out overlay tint
                .to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.3
                }, 0);

        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black/5">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div ref={wrapperRef} className="relative w-full h-full">

                {/* Text Content (Initial Right Side) */}
                <div
                    ref={textRef}
                    className="absolute top-[20%] right-[10%] w-[40%] pl-10 z-10 hidden md:block"
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

                {/* Mobile Text (Visible only on small screens, static) */}
                <div className="md:hidden p-8 pb-32 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
                    <p className="text-gray-400">{subtitle}</p>
                </div>

                {/* The Traveling Portal (Video Container) */}
                <div
                    ref={videoRef}
                    className="absolute z-20 shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 bg-black overflow-hidden aspect-video"
                    style={{ willChange: "transform, width, left, top" }}
                >
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Tint (Fades out) */}
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
}
