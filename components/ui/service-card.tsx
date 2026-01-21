"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export interface ServiceCardProps {
    title: string;
    description: string;
    className?: string;

}

export function ServiceCard({
    title,
    description,
    className,
}: ServiceCardProps) {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const onMouseMove = () => {
        // 3D tilt removed for consistency with site-wide design
    };

    const onMouseLeave = () => {
        // 3D tilt removed
    };

    return (
        <div
            ref={cardRef}
            className={cn("perspective-[1000px] h-full", className)}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <Card
                ref={contentRef}
                className={cn(
                    "group relative overflow-hidden p-0 py-0 gap-0 flex flex-col h-full transition-all duration-300",
                )}
            >
                {/* Visual/Illustration Area */}
                <div className="relative flex-1 min-h-[160px] z-0 flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/2 blur-[80px] rounded-full opacity-50" />

                    {/* Light Sweep/Shimmer Effect */}
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-[200%] group-hover:animate-light-sweep skew-x-[-20deg]" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 pt-4 relative z-40 pointer-events-none">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-base text-white/60 leading-relaxed">
                        {description}
                    </p>
                </div>
            </Card>
        </div>
    );
}
