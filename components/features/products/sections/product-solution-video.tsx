"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function ProductSolutionVideo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !videoContainerRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    end: "top 20%",
                    scrub: 1.2,
                },
            });

            // Immersive Scale & Mask Reveal
            tl.fromTo(videoContainerRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                    clipPath: "inset(20% 20% 20% 20% round 2rem)"
                },
                {
                    scale: 1,
                    opacity: 1,
                    clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
                    duration: 2,
                    ease: "power2.out"
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
                    }
                });
            }
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative py-24 px-4 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[70vh]"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    ref={glowRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/10 blur-[150px] rounded-full opacity-20"
                />
            </div>

            <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 uppercase tracking-tighter">
                        Intelligence in <span className="text-primary italic">Motion</span>
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-medium lowercase tracking-tight opacity-80">
                        witness the future of enterprise synchronization.
                    </p>
                </div>

                {/* Video UI Container */}
                <div
                    ref={videoContainerRef}
                    className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/5 bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                >
                    {/* Actual Video Tag - Autoplay & Muted */}
                    <video
                        src="/fasih-demo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    {/* Subtle Overlay to match brand aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/20 pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
