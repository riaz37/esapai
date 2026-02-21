"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Layers } from "lucide-react";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const REEL_IMAGES = [
    '/productimages/Slide-22.png',
    '/productimages/Slide-23.png',
    '/productimages/Slide-24.png',
];



interface ProductCinematicReelSectionProps {
    product: Product | null;
}

export function ProductCinematicReelSection({ product }: ProductCinematicReelSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    const productLabel = product?.name ?? "ESAP";
    const architectureSubtitle = `Architecture — ${productLabel}. Detailed visualization of the ESAP engine components.`;



    useGSAP(
        () => {
            if (!containerRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=350%", // Reduced from 600% to reduce dead scroll space
                    pin: true,
                    scrub: 1, // Tighter response
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 1. Initial State: Stack the "Blades"
            gsap.set(".deck-stage", { perspective: "2500px" });


            REEL_IMAGES.forEach((_, index) => {
                const el = imagesRef.current[index];
                if (!el) return;

                if (index === 0) {
                    // First image starts VISIBLE and CENTERED
                    gsap.set(el, {
                        opacity: 1,
                        z: 0,
                        rotationY: 0,
                        scaleX: 1,
                        xPercent: 0,
                        filter: "blur(0px) brightness(1)",
                    });
                } else {
                    // Others start as "Blades" in the background
                    gsap.set(el, {
                        opacity: 0,
                        z: -1500,
                        rotationY: index % 2 === 0 ? 45 : -45,
                        scaleX: 0.1, // Blade state
                        xPercent: index % 2 === 0 ? 150 : -150,
                        filter: "blur(20px) brightness(2)",
                    });
                }
            });

            // 2. The Deck Orchestration
            REEL_IMAGES.forEach((_, index) => {
                // Tighter timing calculation
                const startTime = index * 3; // Shifted start time
                const holdDuration = 1.5;
                const transitionDuration = 1.5;

                const el = imagesRef.current[index];

                if (index === 0) {
                    // First image is already visible - SKIP entrance animation
                    // It just waits for its turn to be discarded
                } else {
                    // STEP A: The "Unfurl" - Buttery smooth entry for subsequent images
                    tl.to(el, {
                        opacity: 1,
                        z: 0,
                        rotationY: 0,
                        scaleX: 1,
                        xPercent: 0,
                        filter: "blur(0px) brightness(1)",
                        duration: transitionDuration,
                        ease: "power4.out"
                    }, startTime);
                }

                // STEP B: The Focal Hold - Smooth drift (Applied to ALL)
                tl.to(el, {
                    z: 100, // Slightly more drift
                    duration: holdDuration,
                    ease: "sine.inOut" // Smooth periodic drift
                }, startTime + transitionDuration);

                // STEP C: The Discard - Elegant exit
                if (index < REEL_IMAGES.length - 1) {
                    tl.to(el, {
                        xPercent: index % 2 === 0 ? -150 : 150,
                        rotationY: index % 2 === 0 ? -45 : 45,
                        opacity: 0,
                        z: -1500,
                        filter: "blur(20px) brightness(2)",
                        duration: transitionDuration * 0.8,
                        ease: "expo.in"
                    }, startTime + transitionDuration + holdDuration);
                } else {
                    // Final Dissolve - Much faster now
                    tl.to(containerRef.current, {
                        opacity: 0,
                        duration: 1, // Faster fade out
                        ease: "power2.inOut"
                    }, startTime + transitionDuration + holdDuration + 0.5);
                }
            });

            // Parallax for the Stage
            const onMouseMove = (e: MouseEvent) => {
                const { innerWidth, innerHeight } = window;
                const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
                const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

                gsap.to(".deck-stage", {
                    rotationY: x * 5,
                    rotationX: -y * 5,
                    duration: 1.5,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", onMouseMove);
            return () => window.removeEventListener("mousemove", onMouseMove);
        },
        { scope: containerRef }
    );

    return (
        <div className="relative w-full">
            {/* 1. Deep Space Atmosphere — matches site background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(19,245,132,0.05)_0%,_transparent_70%)] opacity-50 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

            {/* Desktop/Tablet Header - Unpinned */}
            <div className="hidden md:block container mx-auto px-6 pt-20 pb-0 relative z-20">
                <SectionHeader
                    title="Architecture Deck"
                    subtitle={architectureSubtitle}
                    badge="Visual Index"
                    badgeIcon={Layers}
                    align="center"
                    className="mb-10"
                    animate={true}
                />
            </div>

            {/* 3. The Kinetic 3D Deck Stage - Pinned Container */}
            <div ref={containerRef} className="relative w-full h-[90vh] md:h-[110vh] overflow-hidden md:-mt-20">

                {/* Mobile-Only Pinned Header - Clears Navbar */}
                <div className="block md:hidden container mx-auto px-6 pt-32 pb-0 relative z-20">
                    <SectionHeader
                        title="Architecture Deck"
                        subtitle={architectureSubtitle}
                        badge="Visual Index"
                        badgeIcon={Layers}
                        align="center"
                        className="mb-0"
                        animate={true}
                    />
                </div>

                <div className="deck-stage absolute inset-0 z-10 flex items-center justify-center pointer-events-none transform-gpu mt-32 md:mt-10" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                        {REEL_IMAGES.map((src, idx) => (
                            <div
                                key={src}
                                ref={(el) => { imagesRef.current[idx] = el; }}
                                className="absolute w-[90vw] md:w-[70vw] h-[50vh] sm:h-[60vh] md:h-[75vh] will-change-transform"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Inner Card UI - Stripped of styles */}
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`Blade ${idx}`}
                                        fill
                                        sizes="(max-width: 768px) 90vw, 70vw"
                                        className="object-contain md:object-cover"
                                    />
                                </div>

                                {/* Prismatic Flair */}
                                <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 blur-2xl -z-10 opacity-30" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Edge Masking */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(9,9,11,0.6)] z-40" />
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#09090b] to-transparent z-45" />
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent z-45" />
            </div>
        </div>
    );
}
