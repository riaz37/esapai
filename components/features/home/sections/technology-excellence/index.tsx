"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { CircuitBoard } from "lucide-react";
import { ShutterCanvas, ShutterCanvasHandle } from "./shutter-canvas";
import { useShutterAnimation } from "@/lib/hooks/use-shutter-animation";
import { useLocale } from "next-intl";
import type { PartnerData } from "@/components/features/home/sections/trusted-partners";

const DEFAULT_PARTNERS = [
    { logo: "/partners/EMp.svg", alt: "Partner 1" },
    { logo: "/partners/EMp-1.svg", alt: "Partner 2" },
    { logo: "/partners/EMp-2-1.svg", alt: "Partner 3" },
    { logo: "/partners/EMp-3.svg", alt: "Partner 4" },
    { logo: "/partners/EMp-4.svg", alt: "Partner 5" },
    { logo: "/partners/EMp-5.svg", alt: "Partner 6" },
];

export interface TechnologyExcellenceProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    videoSrc?: string;
    cards?: Record<string, unknown>[];
    partners?: PartnerData[];
}

export function TechnologyExcellence({
    title,
    subtitle,
    badge,
    videoSrc: _videoSrc,
    cards: _cards,
    partners = DEFAULT_PARTNERS,
}: TechnologyExcellenceProps = {}) {
    const displayTitle = title || "";
    const displaySubtitle = subtitle || "";

    const containerRef = useRef<HTMLElement>(null);
    const leftShutterRef = useRef<HTMLDivElement>(null);
    const rightShutterRef = useRef<HTMLDivElement>(null);
    const leftCanvasRef = useRef<ShutterCanvasHandle>(null);
    const rightCanvasRef = useRef<ShutterCanvasHandle>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    const locale = useLocale();
    const isRTL = locale === "ar";

    const MARQUEE_PARTNERS = [
        ...partners.map((p, i) => ({ ...p, id: `a-${p.logo}`, alt: p.alt || `Partner ${i + 1}` })),
        ...partners.map((p, i) => ({ ...p, id: `b-${p.logo}`, alt: p.alt || `Partner ${i + 1}` })),
    ];

    useShutterAnimation({
        containerRef,
        leftShutterRef,
        rightShutterRef,
        leftCanvasRef,
        rightCanvasRef,
        contentRef,
        isRTL,
    });

    // Partner marquee animation
    useGSAP(() => {
        if (!marqueeRef.current) return;
        gsap.set(marqueeRef.current, { xPercent: 0 });
        gsap.to(marqueeRef.current, {
            xPercent: isRTL ? 50 : -50,
            duration: 30,
            ease: "none",
            repeat: -1,
        });
    }, { scope: containerRef });

    return (
        <Section
            ref={containerRef}
            padding="none"
            withContainer={false}
            className="relative z-10 w-full min-h-screen overflow-hidden flex items-center justify-center pointer-events-none mt-0 lg:-mt-[60vh] xl:-mt-[80vh]"
        >
            {/* 3D Portal Stage */}
            <div className="absolute inset-0 hidden lg:flex items-center justify-center [perspective:2500px] pointer-events-none z-10">
                <div className="relative w-full h-full [transform-style:preserve-3d]">
                    {/* Left Shutter Pane */}
                    <div
                        ref={leftShutterRef}
                        className="shutter-pane absolute left-0 top-0 w-1/2 h-full overflow-hidden z-10"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <ShutterCanvas
                            ref={leftCanvasRef}
                            side="left"
                            className="absolute top-0 right-0 w-[100vw] max-w-none h-full opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Right Shutter Pane */}
                    <div
                        ref={rightShutterRef}
                        className="shutter-pane absolute right-0 top-0 w-1/2 h-full overflow-hidden z-10"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <ShutterCanvas
                            ref={rightCanvasRef}
                            side="right"
                            className="absolute top-0 left-0 w-[100vw] max-w-none h-full opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
                    </div>
                </div>
            </div>

            {/* Content Layer — header centered, partners at bottom */}
            <div
                ref={contentRef}
                className="absolute inset-0 z-20 flex flex-col items-center opacity-100 lg:opacity-0 pointer-events-none"
            >
                {/* Center: Header */}
                <div className="flex-1 flex items-center justify-center w-full pt-24 lg:pt-0">
                    <div className="w-full max-w-4xl text-center px-6">
                        <SectionHeader
                            title={displayTitle}
                            subtitle={displaySubtitle}
                            badge={badge ?? ""}
                            badgeIcon={CircuitBoard}
                            align="center"
                            className="mb-0"
                        />
                    </div>
                </div>

                {/* Bottom: Trusted Partners Marquee */}
                <div className="w-full pb-14 md:pb-16 lg:pb-20">
                    <div className="relative flex overflow-hidden">
                        <div ref={marqueeRef} className="flex whitespace-nowrap">
                            {MARQUEE_PARTNERS.map((partner) => (
                                <div
                                    key={partner.id}
                                    className="partner-item flex items-center justify-center px-8 sm:px-12 md:px-16 group/partner transition-all duration-300"
                                >
                                    <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-primary/0 group-hover/partner:bg-primary/10 blur-2xl rounded-full transition-all duration-700" />
                                        <Image
                                            src={partner.logo}
                                            alt={partner.alt || ""}
                                            fill
                                            className="object-contain opacity-40 brightness-0 invert group-hover/partner:opacity-100 group-hover/partner:brightness-100 group-hover/partner:scale-110 transition-all duration-500 ease-out"
                                            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinematic Floor Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none z-0" />
        </Section>
    );
}
