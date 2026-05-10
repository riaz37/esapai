"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface ServiceCardProps {
    title: string;
    description: string;
    className?: string;
    videoSrc?: string;
    imageSrc?: string;
}

export function ServiceCard({
    title,
    description,
    className,
    videoSrc,
    imageSrc,
}: ServiceCardProps) {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -10;
        const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 10;
        gsap.to(card, { rotateX, rotateY, scale: 1.02, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        if (cardRef.current) {
            gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
        }
    };

    return (
        <div
            ref={cardRef}
            className={cn("perspective-[1000px] h-full", className)}
            onMouseMove={onMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Card
className={cn(
                    "group relative overflow-hidden p-0 py-0 gap-0 flex flex-col h-full transition-all duration-300 border-none bg-zinc-950",
                )}
            >

                {/* Background Media */}
                <div className="absolute inset-0 z-0">
                    {/* Fallback/Default Image */}
                    {imageSrc && (
                        <div
                            className={cn(
                                "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500",
                                isHovered && videoSrc ? "opacity-0" : "opacity-100"
                            )}
                            style={{ backgroundImage: `url(${imageSrc})` }}
                        />
                    )}

                    {/* Hover Video */}
                    {videoSrc && (
                        <video
                            ref={videoRef}
                            loop
                            muted
                            playsInline
                            preload="none"
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover mix-blend-screen transition-opacity duration-500",
                                isHovered ? "opacity-90" : "opacity-0"
                            )}
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    )}
                </div>

                {/* Visual/Illustration Area */}
                <div className="relative flex-1 min-h-0 z-10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-primary/2 blur-[80px] rounded-full opacity-50 z-0" />

                </div>

                {/* Content Area */}
                <div className="p-6 pt-12 relative z-40 pointer-events-none mt-auto">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 relative z-10">
                        {title}
                    </h3>
                    <p className="text-base text-white/60 leading-relaxed relative z-10">
                        {description}
                    </p>
                </div>

                {/* Shadow Overlay - Restores the inset shadow from base Card on top of everything */}
                <div
                    className="pointer-events-none absolute inset-0 z-50 rounded-[32px] transition-opacity duration-300"
                    style={{
                        boxShadow: "0px 4px 60px 15px rgba(255, 255, 255, 0.1) inset, 0px 1px 1px 0px rgba(255, 255, 255, 0.1) inset",
                    }}
                />
            </Card>
        </div>
    );
}
