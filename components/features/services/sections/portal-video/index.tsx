"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeChip } from "@/components/ui/badge-chip";
import { GitCompare } from "lucide-react";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

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

    useGSAP(
        () => {
            const container = containerRef.current;
            const videoContainer = videoRef.current;
            if (!container || !videoContainer) return;

            const mm = gsap.matchMedia();
            const videoElement = videoContainer.querySelector("video");

            mm.add("(min-width: 1024px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "+=200%", // 200vh scroll distance
                        scrub: 1, // Smooth scrubbing
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Initial State
                if (isRTL) {
                    gsap.set(videoContainer, {
                        width: "40%",
                        right: "5%",
                        xPercent: 0,
                        top: "25%",
                        yPercent: 0,
                        borderRadius: "48px",
                        position: "absolute"
                    });
                } else {
                    gsap.set(videoContainer, {
                        width: "40%",
                        left: "5%",
                        xPercent: 0,
                        top: "25%",
                        yPercent: 0,
                        borderRadius: "48px",
                        position: "absolute"
                    });
                }

                // Animation Sequence
                tl
                    // 1. Expand Video & Center
                    .to(videoContainer, {
                        width: "70%",
                        ...(isRTL ? { right: "50%", xPercent: 50 } : { left: "50%", xPercent: -50 }),
                        top: "50%",
                        yPercent: -50,
                        borderRadius: "32px",
                        duration: 1,
                        ease: "power1.inOut"
                    }, 0)
                    // 2. Fade out Text
                    .to(textRef.current, {
                        opacity: 0,
                        y: -50,
                        duration: 0.3,
                        ease: "power1.out"
                    }, 0)
                    // 3. Adjust Video Filters
                    .fromTo(videoElement,
                        { filter: "brightness(1.3) saturate(1.2)" },
                        { filter: "brightness(1) saturate(1)", duration: 0.8 },
                        0
                    )
                    // 4. Fade out overlay tint
                    .to(overlayRef.current, {
                        opacity: 0,
                        duration: 0.3
                    }, 0);
            });

            return () => mm.revert();
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative w-full h-auto lg:h-screen lg:overflow-hidden flex flex-col py-20 sm:py-24 lg:py-0 lg:block">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Desktop Text Content - positioned on the right side */}
            <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 pointer-events-none hidden lg:block">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <div
                        ref={textRef}
                        className="w-full lg:w-[50%] ltr:ml-auto rtl:mr-auto pointer-events-auto ltr:pl-8 rtl:pr-8"
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
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0 relative lg:absolute lg:inset-0 z-20">
                <div
                    ref={videoRef}
                    className="relative lg:absolute w-full shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden aspect-video rounded-2xl lg:rounded-[48px]"
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
