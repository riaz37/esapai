"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { Sparkles, Terminal, Layers } from "lucide-react";

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

export function ProductCinematicReelSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const deckRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
            gsap.set(".hud-panel", { opacity: 0, scale: 0.8 });

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
            tl.to(".hud-panel", {
                opacity: 1,
                scale: 1,
                stagger: 0.2,
                duration: 2,
                ease: "expo.out"
            }, 1);

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
            className="relative w-full h-screen bg-[#010202] overflow-hidden text-white font-sans"
        >
            <style>{DECK_STYLES}</style>
            {/* 1. Deep Space Atmosphere */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(19,245,132,0.05)_0%,_transparent_70%)] opacity-50" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* 2. Transition Header */}
            <div className="header-wrap absolute inset-0 z-50 flex flex-col items-center justify-start pt-32 pointer-events-none">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="Architecture Deck"
                        subtitle="Detailed visualization of the ESAP engine components."
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

            {/* 4. High-Tech Glass HUD */}
            <div className="absolute inset-0 z-40 pointer-events-none">
                {/* Top Left Panel - Stripped */}
                <div className="hud-panel absolute top-12 left-12 group">
                    <div className="relative space-y-3">
                        <div className="flex items-center gap-3 text-primary font-mono text-[10px] tracking-widest uppercase">
                            SYSTEM_CORE_ACTIVE
                        </div>
                    </div>
                </div>

                {/* Top Right Panel - Original, but simplified */}
                <div className="hud-panel absolute top-10 right-10 text-right">
                    <div className="flex items-center justify-end gap-3 font-mono text-[10px] text-white/40 tracking-widest uppercase">
                        Sync_Stable
                        <Sparkles size={14} className="text-primary" />
                    </div>
                </div>

                {/* Vertical Data Bars */}
                <div className="hud-panel absolute left-10 top-1/2 -translate-y-1/2 space-y-2 opacity-40">
                    {isMounted && Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`h-1 bg-primary/30 rounded-full transition-all duration-500`} style={{ width: 10 + Math.random() * 30 }} />
                    ))}
                </div>

                <div className="hud-panel absolute right-10 top-1/2 -translate-y-1/2 space-y-2 opacity-40 text-right">
                    {isMounted && Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="font-mono text-[8px] text-white/20 uppercase tracking-tighter">
                            0x{Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()}
                        </div>
                    ))}
                </div>

                {/* Bottom Right Panel - Stripped */}
                <div className="hud-panel absolute bottom-12 right-12 text-right">
                    <div className="relative space-y-2">
                        <div className="text-[24px] font-light tracking-tighter text-white">98.4<span className="text-primary text-sm">%</span></div>
                        <div className="text-[10px] font-mono tracking-widest text-primary uppercase">Efficiency Delta</div>
                    </div>
                </div>

                {/* Bottom Stats - Original, but simplified */}
                <div className="hud-panel absolute bottom-10 inset-x-10 flex justify-between items-end pb-4 font-mono text-[9px] text-white/30 uppercase tracking-[0.4em]">
                    <div>Sector_7G // Deck_V5</div>
                    <div className="text-primary/60 font-bold items-center flex gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                        Real_Time_Stream
                    </div>
                    <div>Architect_ID: ESAP_AI</div>
                </div>
            </div>

            {/* 5. Edge Masking */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-40" />
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent z-45" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent z-45" />
        </section>
    );
}
