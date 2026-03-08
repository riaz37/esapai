"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { OptimizedVideo } from "@/components/ui/optimized-video";

export interface TechCardProps {
    title: string;
    description: string;
    videoSrc?: string;
    className?: string;
    delay?: number;
    variant?: "default" | "glass-ar";
}

export const TechCard = React.forwardRef<HTMLDivElement, TechCardProps>(({
    title,
    description,
    videoSrc,
    className,
    variant = "default"
}, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const beamRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isGlassAR = variant === "glass-ar";

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Interactive Glow Position
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                left: x,
                top: y,
                duration: 0.4,
                ease: "power2.out",
                opacity: isGlassAR ? 0.3 : 0.6,
            });
        }

        // 3D Tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: isGlassAR ? 1.01 : 1.02,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            ...(isGlassAR && {
                backdropFilter: "blur(40px) saturate(1.5) brightness(1.2)",
            })
        });

        // Border Beam Position
        if (beamRef.current) {
            gsap.to(beamRef.current, {
                left: x,
                top: y,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    const onMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            ...(isGlassAR && {
                backdropFilter: "blur(20px) saturate(1) brightness(1)",
            })
        });

        if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
        if (beamRef.current) gsap.to(beamRef.current, { opacity: 0, duration: 0.5 });
    };

    return (
        <div className="relative group p-px h-[280px] sm:h-[340px] lg:h-[400px] perspective-1000 rounded-[32px]">
            <div
                ref={(el) => {
                    cardRef.current = el;
                    if (typeof ref === "function") ref(el);
                    else if (ref) (ref as any).current = el;
                }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className={cn(
                    "relative w-full h-full overflow-hidden rounded-[32px] border border-white/10 transition-all duration-300 transform-gpu preserve-3d will-change-transform",
                    isGlassAR ? "bg-white/[0.03] backdrop-blur-[20px]" : "bg-white/[0.02] border-transparent",
                    className
                )}
            >
                {/* Background Video (Only for default variant) */}
                {!isGlassAR && videoSrc && (
                    <OptimizedVideo
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 ease-out"
                    />
                )}

                {/* Glass AR Grid Overlay */}
                {isGlassAR && (
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />
                        {/* Interactive scanning pulse */}
                        <div className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-primary/20 to-transparent -translate-y-full animate-[scan_4s_linear_infinite]" />
                    </div>
                )}

                {/* Interactive Spotlight Glow */}
                <div
                    ref={glowRef}
                    className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 blur-[120px] rounded-full pointer-events-none opacity-0 z-10 mix-blend-screen",
                        isGlassAR ? "w-[400px] h-[400px] bg-primary/20" : "w-[500px] h-[500px] bg-primary/25"
                    )}
                />

                {/* Gradient Overlay */}
                <div className={cn(
                    "absolute inset-0 pointer-events-none z-10",
                    isGlassAR ? "bg-gradient-to-br from-white/5 via-transparent to-black/40" : "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                )} />

                {/* Border Beam */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div
                        ref={beamRef}
                        className="absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-primary/60 blur-xl rounded-full"
                    />
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className="absolute bottom-0 start-0 w-full p-6 sm:p-8 md:p-10 transform z-30 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                >
                    <div className="mb-4">
                        <div className="h-px w-12 bg-primary/50 group-hover:w-20 transition-all duration-700" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 sm:mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">
                        {title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-300 max-w-sm leading-relaxed opacity-90 group-hover:text-white group-hover:opacity-100 transition-all duration-500">
                        {description}
                    </p>

                    {isGlassAR && (
                        <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary/60 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Live Telemetry Active
                        </div>
                    )}
                </div>

                {/* Frame */}
                <div className="absolute inset-0 rounded-[32px] border border-white/5 group-hover:border-primary/30 transition-all duration-500 pointer-events-none z-40" />
            </div>
        </div>
    );
});

TechCard.displayName = "TechCard";
