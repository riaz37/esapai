"use client";

import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Layers } from "lucide-react";
import type { Product } from "@/types/product";

// Custom CSS for micro-animations
const DECK_STYLES = `
  @keyframes scan {
    0% { background-position: 0 -100%; }
    100% { background-position: 0 100%; }
  }
  .animate-scan {
    background-size: 100% 200%;
    animation: scan 4s linear infinite;
  }
`;

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
                    end: "+=1500%", // Extended for maximum buttery smoothness
                    pin: true,
                    scrub: 1.5, // Increased viscosity for smoother feel
                },
            });

            // 1. Initial State: Stack the "Blades"
            gsap.set(".deck-stage", { perspective: "2500px" });


            REEL_IMAGES.forEach((_, index) => {
                const el = imagesRef.current[index];
                if (!el) return;

                // All images start as "Blades" in the background
                gsap.set(el, {
                    opacity: 0,
                    z: -1500,
                    rotationY: index % 2 === 0 ? 45 : -45,
                    scaleX: 0.1, // Blade state
                    xPercent: index % 2 === 0 ? 150 : -150,
                    filter: "blur(20px) brightness(2)",
                });
            });

            // 2. Introduction: System Warm-up
            tl.to(".header-wrap", { opacity: 0, y: -50, scale: 0.9, duration: 2, ease: "power4.inOut" }, 0);


            // 3. The Deck Orchestration
            REEL_IMAGES.forEach((_, index) => {
                const startTime = 2 + (index * 4);
                const holdDuration = 2; // Sharp focal hold
                const transitionDuration = 2;

                const el = imagesRef.current[index];

                // STEP A: The "Unfurl" - Buttery smooth entry
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

                // STEP B: The Focal Hold - Smooth drift
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
                    // Final Dissolve
                    tl.to(containerRef.current, {
                        opacity: 0,
                        duration: 3,
                        ease: "power3.inOut"
                    }, startTime + transitionDuration + holdDuration + 1);
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
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#09090b] overflow-hidden text-white font-sans"
        >
            <style>{DECK_STYLES}</style>
            {/* 1. Deep Space Atmosphere — matches site background */}
            <div className="absolute inset-0 bg-[#09090b]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(19,245,132,0.05)_0%,_transparent_70%)] opacity-50" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* 2. Transition Header — product-specific label */}
            <div className="header-wrap absolute inset-0 z-50 flex flex-col items-center justify-start pt-32 pointer-events-none">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="Architecture Deck"
                        subtitle={architectureSubtitle}
                        badge="Visual Index"
                        badgeIcon={Layers}
                        align="center"
                    />
                </div>
            </div>

            {/* 3. The Kinetic 3D Deck Stage */}
            <div className="deck-stage absolute inset-0 z-10 flex items-center justify-center pointer-events-none transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                    {REEL_IMAGES.map((src, idx) => (
                        <div
                            key={src}
                            ref={(el) => { imagesRef.current[idx] = el; }}
                            className="absolute w-[70vw] h-[75vh] will-change-transform"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Inner Card UI - Stripped of styles */}
                            <div className="relative w-full h-full overflow-hidden">
                                <img
                                    src={src}
                                    alt={`Blade ${idx}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Image Info Tag - Simplified */}
                                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="font-mono text-[10px] tracking-[0.3em] text-white uppercase">Node_0{idx + 1}</span>
                                </div>
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
        </section>
    );
}
