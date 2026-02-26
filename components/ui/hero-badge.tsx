"use client";

import React, { forwardRef } from "react";
import { m } from "motion/react";
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
                    "relative inline-flex items-center p-1 sm:p-1.5 rounded-full bg-[#020305]/80 backdrop-blur-md border border-[#13F584]/20 shadow-[0_0_20px_rgba(19,245,132,0.1)] mb-6 overflow-hidden gsap-slide-up-optimized",
                    className
                )}
                {...props}
            >
                {/* Animated beam effect */}
                <m.div
                    className="absolute inset-0 w-[200%] z-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(19, 245, 132, 0.1) 50%, transparent 55%, transparent 100%)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />

                {/* Left: Exclusive Pill */}
                <div className="relative z-10 flex items-center justify-center px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#13F584] shadow-[0_0_15px_rgba(19,245,132,0.4)]">
                    <span className="text-xs font-bold tracking-tight text-black leading-none">
                        {pillText}
                    </span>
                </div>

                {/* Right: Text */}
                <div className="relative z-10 flex items-center px-2 py-0.5 sm:px-4 sm:py-1 ms-1">
                    <span className="text-sm font-medium tracking-tight text-[#13F584] leading-none">
                        {description}
                    </span>
                </div>
            </div>
        );
    }
);

HeroBadge.displayName = "HeroBadge";
