"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ServiceSyncedWireframeProps {
    containerRef: React.RefObject<HTMLElement | null>;
    cardRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
}

export const ServiceSyncedWireframe = ({
    containerRef,
    cardRef,
    className,
}: ServiceSyncedWireframeProps) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current && cardRef.current) {
                const parentRect = containerRef.current.getBoundingClientRect();
                const cardRect = cardRef.current.getBoundingClientRect();

                setOffset({
                    x: cardRect.left - parentRect.left,
                    y: cardRect.top - parentRect.top,
                });
                setParentSize({
                    width: parentRect.width,
                    height: parentRect.height,
                });
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, [containerRef, cardRef]);

    // Generate organic flowing ribbon bundles - similar to footer but different curves
    const waveRibbons = useMemo(() => {
        // Different ribbon configuration for service section
        const ribbons = [
            { id: "sr1", count: 10, x: -200, y: 100, qx: 300, qy: 250, tx: 700, ty: 80, endX: 1100, endY: 200, opacity: 0.35 },
            { id: "sr2", count: 8, x: 200, y: 300, qx: 500, qy: 50, tx: 900, ty: 350, endX: 1400, endY: 150, opacity: 0.3 },
            { id: "sr3", count: 12, x: 500, y: 150, qx: 850, qy: 400, tx: 1200, ty: 100, endX: 1600, endY: 300, opacity: 0.4 },
            { id: "sr4", count: 6, x: -100, y: 400, qx: 250, qy: 200, tx: 600, ty: 450, endX: 1000, endY: 350, opacity: 0.25 },
            { id: "sr5", count: 9, x: 800, y: 50, qx: 1100, qy: 300, tx: 1400, ty: 80, endX: 1800, endY: 250, opacity: 0.32 },
        ];

        return ribbons.map(r => {
            const paths = Array.from({ length: r.count }).map((_, i) => {
                const dy = i * 7;
                const dx = i * 3;

                const d = `M ${r.x + dx},${r.y + dy} Q ${r.qx + dx},${r.qy + dy} ${r.tx + dx},${r.ty + dy} T ${r.endX + dx},${r.endY + dy}`;
                return d;
            });
            return { ...r, paths };
        });
    }, []);

    useGSAP(() => {
        if (!svgRef.current) return;

        // Dynamic organic animation
        gsap.to(svgRef.current.querySelectorAll("path"), {
            y: "random(-35, 45)",
            x: "random(-25, 25)",
            rotation: "random(-12, 12)",
            transformOrigin: "center center",
            duration: "random(3.5, 6.5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.08,
                from: "random",
                ease: "power2.inOut"
            }
        });
    }, { scope: svgRef, dependencies: [parentSize] });

    if (parentSize.width === 0) return null;

    const scaleX = parentSize.width / 1400;
    const scaleY = parentSize.height / 500;

    return (
        <div className={cn("absolute inset-0 pointer-events-none select-none overflow-hidden", className)}>
            <div
                style={{
                    width: parentSize.width,
                    height: parentSize.height,
                    transform: `translate(${-offset.x}px, ${-offset.y}px)`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${parentSize.width} ${parentSize.height}`}
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="service-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#13F584" stopOpacity="0" />
                            <stop offset="25%" stopColor="#13F584" stopOpacity="0.25" />
                            <stop offset="50%" stopColor="#13F584" stopOpacity="0.5" />
                            <stop offset="75%" stopColor="#13F584" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#13F584" stopOpacity="0" />
                        </linearGradient>

                        <filter id="service-soft-glow">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {waveRibbons.map((ribbon) => (
                        <g key={ribbon.id} opacity={ribbon.opacity} transform={`scale(${scaleX}, ${scaleY})`} filter="url(#service-soft-glow)">
                            {ribbon.paths.map((d, i) => (
                                <path
                                    key={i}
                                    d={d}
                                    stroke="url(#service-ribbon-gradient)"
                                    strokeWidth="0.5"
                                    fill="none"
                                />
                            ))}
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};
