"use client";

import { useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Cpu } from "lucide-react";
import { ShutterCanvas } from "./shutter-canvas";
import { TechCard } from "@/components/ui/tech-card";
import { useShutterAnimation } from "@/lib/hooks/use-shutter-animation";
import { useLocale } from "next-intl";

export interface TechnologyExcellenceProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    videoSrc?: string;
}

export function TechnologyExcellence({
    title,
    subtitle,
    badge,
    videoSrc
}: TechnologyExcellenceProps = {}) {
    const displayTitle = title || "";
    const displaySubtitle = subtitle || "";

    const containerRef = useRef<HTMLElement>(null);
    const leftShutterRef = useRef<HTMLDivElement>(null);
    const rightShutterRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const locale = useLocale();
    const isRTL = locale === "ar";

    const [shutterProgress, setShutterProgress] = useState(0);

    useShutterAnimation({
        containerRef,
        leftShutterRef,
        rightShutterRef,
        contentRef,
        isRTL,
        onProgress: setShutterProgress
    });

    return (
        <Section
            ref={containerRef}
            padding="none"
            withContainer={false}
            className="relative z-10 w-full min-h-screen overflow-hidden flex items-center justify-center pointer-events-none -mt-[60vh] md:-mt-[80vh] mb-[20vh]"
        >
            {/* 3D Portal Stage */}
            <div className="absolute inset-0 flex items-center justify-center [perspective:2500px] pointer-events-none z-10">
                <div className="relative w-full h-full [transform-style:preserve-3d]">
                    {/* Left Shutter Pane */}
                    <div
                        ref={leftShutterRef}
                        className="shutter-pane absolute left-0 top-0 w-1/2 h-full overflow-hidden will-change-transform z-10"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <ShutterCanvas
                            side="left"
                            progress={shutterProgress}
                            className="absolute top-0 right-0 w-[100vw] max-w-none h-full opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Right Shutter Pane */}
                    <div
                        ref={rightShutterRef}
                        className="shutter-pane absolute right-0 top-0 w-1/2 h-full overflow-hidden will-change-transform z-10"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <ShutterCanvas
                            side="right"
                            progress={shutterProgress}
                            className="absolute top-0 left-0 w-[100vw] max-w-none h-full opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
                    </div>
                </div>
            </div>

            <div
                ref={contentRef}
                className="relative z-20 w-full flex flex-col items-center justify-center py-20 px-6 sm:px-8 xl:px-12 opacity-0 pointer-events-auto"
            >
                <div className="max-w-4xl w-full text-center">
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

            {/* Cinematic Floor Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none z-0" />
        </Section>
    );
}
