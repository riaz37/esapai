"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { Play } from "lucide-react";
import { BadgeChip } from "@/components/ui/badge-chip"; // Assuming this exists based on previous files
import { GitCompare } from "lucide-react";

interface PortalVideoShowcaseProps {
    videoSrc: string;
    title?: string;
    subtitle?: string;
}

export function PortalVideoShowcase({ videoSrc, title = "See the difference", subtitle }: PortalVideoShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress relative to the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // --- Transformations ---

    // 1. Video Position & Size
    // Initial: Left side (approx 5% from left), small width (40%)
    // Final: Center, full width (95%)

    // We use percentages for responsiveness
    const width = useTransform(smoothProgress, [0, 0.4], ["40%", "85%"]);
    // Left position: Starts as absolute 5% (left aligned), moves to 50% (screen center)
    const left = useTransform(smoothProgress, [0, 0.4], ["5%", "50%"]);
    // X Transform: Starts at 0% (no shift), moves to -50% (centers the element relative to its new 'left' position)
    const x = useTransform(smoothProgress, [0, 0.4], ["0%", "-50%"]);
    // Top position: Starts centered, moves down but stays clear of navbar (increased from 10% to 15%)
    const top = useTransform(smoothProgress, [0, 0.4], ["25%", "15%"]);

    // 2. Border Radius & Styles
    // Defined inline in style prop now
    // const borderRadius = useTransform(smoothProgress, [0, 0.4], ["100px", "24px"]);

    // 3. Filters
    const brightness = useTransform(smoothProgress, [0, 0.3], [1.3, 1]);
    const saturate = useTransform(smoothProgress, [0, 0.3], [1.2, 1]);

    // 4. Text Content (Right Side)
    // Fades out and moves up as video expands
    const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const textY = useTransform(smoothProgress, [0, 0.3], [0, -50]);

    // 5. Final UI Reveal (PLAY REFL)
    const uiOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
    const uiScale = useTransform(smoothProgress, [0.4, 0.6], [0.9, 1]);

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] bg-black/5">

            {/* Sticky Stage */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">

                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                {/* Text Content (Initial Right Side) */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute top-[20%] right-[10%] w-[40%] pl-10 z-0 hidden md:block"
                >
                    <div className="mb-6">
                        <BadgeChip label="Before & after" icon={GitCompare} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                            {subtitle}
                        </p>
                    )}

                    {/* Decorative Arrow/Connector removed as per request */}
                </motion.div>

                {/* Mobile Text (Visible only on small screens, static) */}
                <div className="md:hidden p-8 pb-32 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
                    <p className="text-gray-400">{subtitle}</p>
                </div>


                {/* The Traveling Portal */}
                <motion.div
                    style={{
                        width, // Animates from 40% to 85%
                        maxWidth: "1200px", // Reduced from 1400px to control height
                        left,  // Animates from 5% to center (50%)
                        x,     // Animates to -50% for true centering
                        top,
                        // Aspect ratio from reference: aspect-video (16/9)
                        aspectRatio: 16 / 9,
                        // Rounded corners from reference: rounded-[2rem] which is 32px
                        // We animate from slightly more rounded (48px) to reference 32px - NO CAPSULE
                        borderRadius: useTransform(smoothProgress, [0, 0.4], ["48px", "32px"]),
                    }}
                    className="absolute z-20 shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 bg-black overflow-hidden"
                >
                    <motion.video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover" // Revert to object-cover as per reference
                        style={{
                            filter: useTransform(
                                [brightness, saturate],
                                ([b, s]) => `brightness(${b}) saturate(${s})`
                            )
                        }}
                    />

                    {/* Overlay Tint (Fades out) */}
                    <motion.div
                        className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply pointer-events-none"
                        style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
                    />

                    {/* SVG Overlays (Spiral) */}
                    <SVGOverlay smoothProgress={smoothProgress} />

                    {/* Overlay UI removed as per request */}

                </motion.div>
            </div>
        </div>
    );
}

function SVGOverlay({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
    const rotate = useTransform(smoothProgress, [0, 1], [0, 90]);
    const scale = useTransform(smoothProgress, [0, 0.4], [1.2, 2]);
    const opacity = useTransform(smoothProgress, [0.3, 0.6], [1, 0]);

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
            style={{ opacity, scale, rotate }}
        >
            {/* Ribbons/Lines removed as per request */}
        </motion.div>
    )
}
