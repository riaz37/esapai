"use client";

import { useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Cpu } from "lucide-react";
import { ShutterCanvas, ShutterCanvasHandle } from "./shutter-canvas";
import { TechCard } from "@/components/ui/tech-card";
import { useShutterAnimation } from "@/lib/hooks/use-shutter-animation";
import { useLocale } from "next-intl";

export interface TechnologyExcellenceProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    videoSrc?: string;
    cards?: any[];
}

export function TechnologyExcellence({
    title,
    subtitle,
    badge,
    videoSrc,
    cards
}: TechnologyExcellenceProps = {}) {
    const displayTitle = title || "";
    const displaySubtitle = subtitle || "";

    const containerRef = useRef<HTMLElement>(null);
    const leftShutterRef = useRef<HTMLDivElement>(null);
    const rightShutterRef = useRef<HTMLDivElement>(null);
    const leftCanvasRef = useRef<ShutterCanvasHandle>(null);
    const rightCanvasRef = useRef<ShutterCanvasHandle>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const locale = useLocale();
    const isRTL = locale === "ar";

    useShutterAnimation({
        containerRef,
        leftShutterRef,
        rightShutterRef,
        leftCanvasRef,
        rightCanvasRef,
        contentRef,
        isRTL,
    });

    return (
        <Section
            ref={containerRef}
            padding="none"
            withContainer={false}
            className="relative z-10 w-full min-h-screen overflow-hidden flex items-center justify-center pointer-events-none -mt-[60vh] md:-mt-[80vh]"
            style={{ contentVisibility: "auto", containIntrinsicSize: "100vh" }}
        >
            {/* 3D Portal Stage */}
            <div className="absolute inset-0 flex items-center justify-center [perspective:2500px] pointer-events-none z-10">
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

            {/* Content Layer — header centered, cards at bottom */}
            <div
                ref={contentRef}
                className="absolute inset-0 z-20 flex flex-col items-center opacity-0 pointer-events-auto"
            >
                {/* Center: Header */}
                <div className="flex-1 flex items-center justify-center w-full translate-y-[20%]">
                    <div className="w-full max-w-4xl text-center px-6">
                        <SectionHeader
                            title={displayTitle}
                            subtitle={displaySubtitle}
                            badge={badge ?? ""}
                            badgeIcon={Cpu}
                            align="center"
                            className="mb-0"
                        />
                    </div>
                </div>

                {/* Bottom: Cards */}
                <div className="w-full pb-6 md:pb-10 px-4">
                    <div className="flex flex-wrap justify-center items-end gap-4 md:gap-6 max-w-4xl mx-auto">
                        <TechCard
                            title="Autonomous Agents"
                            description="Deploy intelligent workers that handle complex workflows 24/7."
                            videoSrc="/technology1.mp4"
                            wrapperClassName="!h-[180px] sm:!h-[200px] w-[260px] sm:w-[300px]"
                        />
                        <TechCard
                            title="Neural Processing"
                            description="Transform raw data into actionable foresight with neural models."
                            videoSrc="/technology2.mp4"
                            wrapperClassName="!h-[180px] sm:!h-[200px] w-[260px] sm:w-[300px]"
                        />
                    </div>
                </div>
            </div>

            {/* Cinematic Floor Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none z-0" />
        </Section>
    );
}
