"use client";

import React, { useState, useRef } from 'react';
import { GearIcon } from './icons';
import { BadgeChip } from "@/components/ui/badge-chip";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Activity } from "lucide-react";

interface TechEcosystemCardProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    onCtaClick?: () => void;
    className?: string;
}

export const TechEcosystemCard: React.FC<TechEcosystemCardProps> = ({
    title = "Technology Ecosystem",
    subtitle,
    ctaText = "Initialize",
    onCtaClick = () => console.log("See Integrations clicked"),
    className = "",
}) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    // Optional: Play video on hover for a "reveal" effect, or keep it static
    const handleMouseEnter = () => {
        if (videoRef.current) {
            // videoRef.current.play().catch(() => {}); 
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            // videoRef.current.pause();
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full aspect-[16/9] md:aspect-[2.4/1] bg-neutral-950 rounded-[2.5rem] border border-neutral-900 overflow-hidden group ${className}`}
        >

            {/* === Video Background === */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    src="/cta.mp4"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    muted
                    loop
                    playsInline
                    autoPlay={false}
                />
                {/* Overlay to ensure text legibility */}
                <div className="absolute inset-0 bg-neutral-950/40" />
            </div>

            {/* === Dynamic Background Grid (Overlaying video) === */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none z-0" />


            {/* === Central Glow Spot === */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/[0.05] blur-[100px] rounded-full pointer-events-none transition-transform duration-500 z-0"
                style={{
                    transform: `translate(calc(-50% + ${mousePos.x * 20}px), calc(-50% + ${mousePos.y * 20}px))`
                }}
            />

            {/* === Content Layer === */}
            <div className="relative z-10 flex flex-col items-center justify-start h-full px-6 pt-8 pb-12 text-center">

                {/* Badge */}
                <div className="mb-4">
                    <BadgeChip label="System Operational" icon={Activity} />
                </div>

                {/* Headlines */}
                {/* Added pointer-events-none to prevent text selection and better interaction with background */}
                <div className="mb-5 space-y-4 max-w-xl transform transition-transform duration-500 pointer-events-none" style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-400 tracking-tight drop-shadow-sm">
                        {title}
                    </h2>
                    {subtitle && <p className="text-neutral-400 text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto">
                        {subtitle}
                    </p>}
                </div>


                {/* Primary CTA */}
                <Button
                    onClick={onCtaClick}
                    variant="primary"
                    className="pointer-events-auto"
                >
                    <span>{ctaText}</span>
                    <ButtonArrow />
                </Button>

            </div>

        </div>
    );
};
