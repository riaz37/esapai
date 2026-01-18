"use client";

import { cn } from "@/lib/utils";

interface SectionMaskProps {
    children: React.ReactNode;
    className?: string;
    fadeTop?: boolean;
    fadeBottom?: boolean;
    topThreshold?: string; // e.g. "15%"
    bottomThreshold?: string; // e.g. "85%"
}

export function SectionMask({
    children,
    className,
    fadeTop = true,
    fadeBottom = true,
    topThreshold = "15%",
    bottomThreshold = "85%",
}: SectionMaskProps) {
    // Construct the mask image string based on props
    const getMaskImage = () => {
        const stops = [];

        if (fadeTop) {
            stops.push("transparent");
            stops.push(`black ${topThreshold}`);
        } else {
            stops.push("black 0%");
        }

        if (fadeBottom) {
            stops.push(`black ${bottomThreshold}`);
            stops.push("transparent");
        } else {
            stops.push("black 100%");
        }

        const gradient = `linear-gradient(to bottom, ${stops.join(", ")})`;
        return gradient;
    };

    const maskStyle = {
        maskImage: getMaskImage(),
        WebkitMaskImage: getMaskImage(),
    };

    return (
        <div className={cn("relative w-full", className)} style={maskStyle}>
            {children}
        </div>
    );
}
