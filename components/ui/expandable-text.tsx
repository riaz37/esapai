"use client";

import React, { useState } from "react";
import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
    text: string;
    maxChars?: number;
    readMoreLabel?: string;
    showLessLabel?: string;
    className?: string;
    textClassName?: string;
}

export function ExpandableText({
    text,
    maxChars = 250,
    readMoreLabel = "Read More",
    showLessLabel = "Show Less",
    className,
    textClassName
}: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLong = text.length > maxChars;

    return (
        <div className={cn("mb-4 sm:mb-5 md:mb-6", className)}>
            <m.div
                initial={false}
                animate={{
                    height: isExpanded || !isLong ? "auto" : "4.8em",
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden"
            >
                <p className={cn(
                    "text-sm sm:text-base md:text-lg text-white/60 leading-relaxed",
                    !isExpanded && isLong && "line-clamp-3",
                    textClassName
                )}>
                    {text}
                </p>
            </m.div>

            {isLong && (
                <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsExpanded(!isExpanded);
                        }
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-primary hover:text-primary transition-all duration-300 cursor-pointer select-none group/readmore text-sm font-semibold border-none bg-transparent p-0"
                >
                    <span className="group-hover/readmore:underline underline-offset-4 decoration-primary/30">
                        {isExpanded ? showLessLabel : readMoreLabel}
                    </span>
                    <m.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                    >
                        <ArrowRight className={cn("w-3.5 h-3.5 transition-transform", !isExpanded && "group-hover/readmore:translate-x-0.5")} />
                    </m.span>
                </div>
            )}
        </div>
    );
}
