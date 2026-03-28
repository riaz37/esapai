"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CinematicAssistantProps, MARCO_FRAMES } from "./types";

export function CinematicAssistant({ state, className, reducedMotion }: CinematicAssistantProps) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const frames = MARCO_FRAMES[state];
    const jitter = 200;

    useEffect(() => {
        if (reducedMotion) return;
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % frames.length);
        }, jitter);
        return () => clearInterval(interval);
    }, [frames.length, reducedMotion, jitter]);

    useGSAP(() => {
        if (reducedMotion) return;
        gsap.to(containerRef.current, {
            y: "-=15",
            rotation: 1,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }, { scope: containerRef, dependencies: [reducedMotion] });

    return (
        <div ref={containerRef} className={`relative select-none ${className ?? ""}`}>
            {/* Holographic Glow */}
            <div
                className={`absolute inset-0 scale-125 blur-3xl opacity-20 transition-colors duration-1000 ${state === "problem" ? "bg-red-500" : "bg-emerald-500"
                    }`}
            />

            {/* Scanlines Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full opacity-30">
                <div
                    className="absolute inset-0 w-full h-[200%]"
                    style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 3px, transparent 4px)",
                        animation: reducedMotion ? "none" : "scanline 10s linear infinite"
                    }}
                />
            </div>

            {/* Main Character Image */}
            <div className="relative z-10 w-full h-full filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Image
                    src={frames[currentFrame % frames.length]}
                    alt="Marco AI Assistant"
                    fill
                    sizes="256px"
                    unoptimized
                    className="object-contain"
                    key={`${state}-${currentFrame}`}
                />
            </div>

            <div className="absolute -bottom-4 start-1/2 -translate-x-1/2 w-3/4 h-2 bg-white/5 blur-xl rounded-full" />

            <style>{`
                @keyframes scanline {
                    from { transform: translateY(0); }
                    to { transform: translateY(-50%); }
                }
            `}</style>
        </div>
    );
}
