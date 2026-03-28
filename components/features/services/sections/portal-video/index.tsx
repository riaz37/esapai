"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BadgeChip } from "@/components/ui/badge-chip";
import { GitCompare } from "lucide-react";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import { useLocale, useTranslations } from "next-intl";
import { usePortalVideoAnimation } from "@/lib/hooks/use-portal-video-animation";


interface ServicePortalVideoSectionProps {
    videoSrc: string;
    title?: string;
    subtitle?: string;
    badgeLabel?: string;
}

export function ServicePortalVideoSection({ videoSrc, title, subtitle, badgeLabel }: ServicePortalVideoSectionProps) {
    const t = useTranslations("Service.beforeAfter");
    const resolvedTitle = title ?? t("defaultTitle");
    const resolvedBadge = badgeLabel ?? t("badge");
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const isRTL = locale === "ar";

    usePortalVideoAnimation({
        videoRef,
        textRef,
        overlayRef,
        isRTL
    });

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full max-w-[1400px] mx-auto h-auto lg:min-h-screen flex flex-col py-20 sm:py-24 lg:py-0 overflow-visible">


            {/* Desktop Text Content - positioned on the right side */}
            <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <div
                        ref={textRef}
                        className="w-full lg:w-[50%] ms-auto pointer-events-auto ps-8"
                    >
                        <div className="mb-6">
                            <BadgeChip label={resolvedBadge} icon={GitCompare} />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold leading-tight text-white tracking-tight mb-6">
                            {resolvedTitle}
                        </h2>
                        {subtitle && (
                            <p className="text-lg text-white/70 leading-relaxed max-w-xl tracking-tight">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Text (Visible only on small/medium screens) */}
            <div className="lg:hidden w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 text-center relative z-10">
                <div className="flex justify-center mb-6">
                    <BadgeChip label={resolvedBadge} icon={GitCompare} />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight mb-4">{resolvedTitle}</h2>
                {subtitle && (
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl tracking-tight mx-auto">{subtitle}</p>
                )}
            </div>

            {/* Video Container Wrapper */}
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0 relative lg:absolute lg:inset-0 z-20 pointer-events-none">
                <div
                    ref={videoRef}
                    className="relative lg:absolute w-full shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden aspect-video rounded-2xl lg:rounded-[48px] pointer-events-auto"
                >
                    <OptimizedVideo
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Tint (Visible only on Desktop initially) */}
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 bg-indigo-900/40 lg:opacity-100 opacity-0 mix-blend-multiply pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
}
