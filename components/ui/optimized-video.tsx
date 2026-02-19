"use client";

import React, { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    poster?: string;
    className?: string;
    priority?: boolean;
    threshold?: number;
    rootMargin?: string;
}

/**
 * A video component that defers loading and playback until it's close to the viewport.
 * Uses Intersection Observer via framer-motion's useInView.
 */
export function OptimizedVideo({
    src,
    poster,
    className,
    priority = false,
    threshold = 0.1,
    rootMargin = "200px 0px",
    ...props
}: OptimizedVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(priority);

    // Use rootMargin to start loading before it's actually visible
    const isInView = useInView(containerRef, {
        once: true,
        margin: rootMargin as any,
        amount: threshold,
    });

    useEffect(() => {
        if (isInView && !shouldLoad) {
            setShouldLoad(true);
        }
    }, [isInView, shouldLoad]);

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden w-full h-full", className)}>
            {shouldLoad ? (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    className="w-full h-full object-cover"
                    {...props}
                >
                    <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
                </video>
            ) : (
                <div className="w-full h-full bg-neutral-900/50 flex items-center justify-center">
                    {poster && (
                        <img
                            src={poster}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover opacity-50"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
