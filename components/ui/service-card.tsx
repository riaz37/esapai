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

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !contentRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        gsap.to(contentRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const onMouseLeave = () => {
        if (!contentRef.current) return;
        gsap.to(contentRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
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
                    "group relative overflow-hidden p-0 py-0 gap-0 flex flex-col h-full transform-style-3d will-change-transform",
                )}
            >
                {/* Visual/Illustration Area - Empty for now */}
                <div className="relative flex-1 min-h-[200px] z-0 pointer-events-none" />

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
