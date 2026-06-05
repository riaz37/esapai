"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    webmSrc?: string;
    av1Src?: string;
    poster?: string;
    className?: string;
    priority?: boolean;
    threshold?: number;
    playThreshold?: number;
    rootMargin?: string;
}

export function OptimizedVideo({
    src,
    webmSrc,
    av1Src,
    poster,
    className,
    priority = false,
    threshold = 0.1,
    playThreshold = 0.25,
    rootMargin = "200px 0px",
    autoPlay,
    preload,
    ...props
}: OptimizedVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const isInView = useInView(containerRef, {
        once: true,
        amount: threshold,
        margin: rootMargin as `${number}px ${number}px`,
    });

    const isVisible = useInView(containerRef, {
        once: false,
        amount: playThreshold,
    });

    const shouldLoad = priority || isInView;

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !autoPlay) return;
        if (isVisible) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [isVisible, autoPlay]);

    useEffect(() => {
        const onVisibility = () => { if (document.hidden) videoRef.current?.pause(); };
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden w-full h-full", className)}>
            {shouldLoad ? (
                <video
                    ref={videoRef}
                    poster={poster}
                    preload={preload ?? (priority ? "auto" : "none")}
                    {...(priority ? { fetchPriority: "high" } : {})}
                    className="w-full h-full object-cover"
                    {...props}
                >
                    {av1Src && <source src={av1Src} type="video/webm; codecs=av01" />}
                    {webmSrc && <source src={webmSrc} type="video/webm" />}
                    <source src={src} type="video/mp4" />
                </video>
            ) : (
                <div aria-hidden="true" className="w-full h-full bg-neutral-900">
                    {poster && (
                        <Image
                            src={poster}
                            alt=""
                            fill
                            priority={priority}
                            sizes="100vw"
                            className="object-cover opacity-50"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
