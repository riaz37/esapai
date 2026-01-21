"use client";

import React, { forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    pillText?: string;
    description?: string;
}

export const HeroBadge = forwardRef<HTMLDivElement, HeroBadgeProps>(
    ({ className, pillText = "Exclusive", description = "Tomorrow's Edge, Built Today", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative inline-flex items-center p-1.5 rounded-full bg-[#020305]/80 backdrop-blur-md border border-[#13F584]/20 shadow-[0_0_20px_rgba(19,245,132,0.1)] mb-2 sm:mb-3 overflow-hidden scale-90 sm:scale-95 md:scale-100 gsap-slide-up-optimized",
                    className
                )}
                {...props}
            >
                {/* Animated beam effect */}
                <motion.div
                    className="absolute inset-0 w-[200%] z-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(19, 245, 132, 0.1) 50%, transparent 55%, transparent 100%)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />

                {/* Left: Exclusive Pill */}
                <div className="relative z-10 flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-[#13F584] shadow-[0_0_15px_rgba(19,245,132,0.4)]">
                    <span className="text-[10px] sm:text-[13px] font-bold uppercase tracking-wider text-black leading-none">
                        {pillText}
                    </span>
                </div>

                {/* Right: Text */}
                <div className="relative z-10 flex items-center px-4 py-2 sm:px-5 sm:py-2 ml-1">
                    <span className="text-[11px] sm:text-[15px] font-medium tracking-wide text-[#13F584] leading-none">
                        {description}
                    </span>
                </div>
            </div>
        );
    }
);

HeroBadge.displayName = "HeroBadge";
