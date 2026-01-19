"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    return (
        <Card
            className={cn(
                "group relative overflow-hidden p-0 py-0 gap-0 flex flex-col h-full",
                className
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
    );
}
