"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
    radius?: number;
    color?: string;
}

export function Spotlight({
    children,
    className,
    intensity = 0.15,
    radius = 400,
    color = "19, 245, 132", // Default to ESAP green
}: SpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseEnter = useCallback(() => setOpacity(1), []);
    const handleMouseLeave = useCallback(() => setOpacity(0), []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn("relative overflow-hidden group/spotlight", className)}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-30"
                style={{
                    opacity,
                    background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, rgba(${color}, ${intensity}), transparent 80%)`,
                }}
            />
            {children}
        </div>
    );
}
