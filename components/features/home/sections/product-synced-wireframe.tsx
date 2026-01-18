"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductSyncedWireframeProps {
    containerRef?: React.RefObject<HTMLElement | null>;
    cardRef?: React.RefObject<HTMLDivElement | null>;
    className?: string;
    parentSize?: { width: number; height: number };
}

export const ProductSyncedWireframe = ({
    containerRef,
    cardRef,
    className,
    parentSize: propParentSize,
}: ProductSyncedWireframeProps) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
    const svgRef = useRef<SVGSVGElement>(null);
    const internalContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updatePosition = () => {
            if (propParentSize) {
                setParentSize(propParentSize);
                return;
            }

            if (containerRef?.current && cardRef?.current) {
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
            } else if (internalContainerRef.current) {
                const rect = internalContainerRef.current.getBoundingClientRect();
                setParentSize({ width: rect.width, height: rect.height });
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, [containerRef, cardRef, propParentSize]);

    // Creative Redesign: "Neural Data Flow"
    // Concept: Data/Energy flowing from the "Identity" (Input/Left) to the "Action" (Video/Right)
    const waveRibbons = useMemo(() => {
        const ribbons = [

            // 1. The "Uplink" (Bottom Left -> Top Center)
            // MOVED: Started lower and further left to avoid text column
            {
                id: "uplink",
                count: 12,
                x: -150, y: 650,
                qx: 100, qy: 500,
                tx: 400, ty: 50,
                endX: 900, endY: 0,
                opacity: 0.15,
                strokeWidth: 0.4
            },

            // 2. The "Synapse Bridge" (Left Content -> Right Video)
            // MOVED: Routed BELOW the text area to avoid overlap
            // Starts bottom-left, curves under text, then rises to video
            {
                id: "synapse_bridge",
                count: 20,
                x: 50, y: 550,         // Start well below text title area
                qx: 450, qy: 600,      // Dip slightly or stay low mid-card
                tx: 850, ty: 350,      // Rise sharply to video center
                endX: 1300, endY: 200, // Exiting out top-right
                opacity: 0.6,          // High visibility
                strokeWidth: 0.9
            },

            // 3. The "Video Halo" (Surrounding the Video)
            // Wraps the video to show it's the focal point of the energy
            {
                id: "halo_top",
                count: 8,
                x: 700, y: 100,
                qx: 950, qy: -50,
                tx: 1200, ty: 100,
                endX: 1300, endY: 300,
                opacity: 0.25,
                strokeWidth: 0.5
            },
            {
                id: "halo_bottom",
                count: 8,
                x: 700, y: 500,
                qx: 950, qy: 650,
                tx: 1200, ty: 500,
                endX: 1300, endY: 300,
                opacity: 0.25,
                strokeWidth: 0.5
            },

            // 4. "Data Pulses" (Fast, thin lines cutting through)
            // Adjusted to follow new bridge path roughly
            {
                id: "pulse_1",
                count: 4,
                x: 0, y: 580,
                qx: 500, qy: 620,
                tx: 900, ty: 350,
                endX: 1400, endY: 250,
                opacity: 0.4,
                strokeWidth: 0.3
            },

            // 5. "Background Network" (Faint mesh)
            {
                id: "net_1", count: 5, x: -50, y: 100, qx: 600, qy: 600, tx: 1200, ty: 0, endX: 1400, endY: 100, opacity: 0.08, strokeWidth: 0.2
            },
            {
                id: "net_2", count: 5, x: -50, y: 500, qx: 600, qy: 0, tx: 1200, ty: 600, endX: 1400, endY: 500, opacity: 0.08, strokeWidth: 0.2
            }

        ];

        return ribbons.map(r => {
            const paths = Array.from({ length: r.count }).map((_, i) => {
                const spread = r.count * 3;
                const dy = (i * 5) - spread;
                const dx = (i * 2) - (spread / 2);

                // More organic variance for "Neural" look
                const phase = i / r.count;
                const rQy = r.qy + dy + Math.sin(phase * Math.PI * 4) * 20;
                const rTy = r.ty + dy + Math.cos(phase * Math.PI * 4) * 20;
                const rTx = r.tx + dx + Math.sin(phase * Math.PI * 2) * 10;

                const d = `M ${r.x + dx},${r.y + dy} Q ${r.qx + dx},${rQy} ${rTx},${rTy} T ${r.endX + dx},${r.endY + dy}`;
                return d;
            });
            return { ...r, paths };
        });
    }, []);

    useGSAP(() => {
        if (!svgRef.current) return;

        // Neural "Breathing" Animation
        gsap.to(svgRef.current.querySelectorAll("path"), {
            y: "random(-15, 15)",
            x: "random(-10, 10)",
            rotation: "random(-3, 3)", // Subtle rotation
            transformOrigin: "center center",
            duration: "random(3, 7)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.03,
                from: "center", // Pulse from center out
                ease: "power1.inOut"
            }
        });

    }, { scope: svgRef, dependencies: [parentSize] });

    if (parentSize.width === 0) return <div ref={internalContainerRef} className={cn("absolute inset-0 pointer-events-none", className)} />;

    const baseWidth = 1200;
    const baseHeight = 600;
    const scaleX = parentSize.width / baseWidth;
    const scaleY = parentSize.height / baseHeight;

    return (
        <div ref={internalContainerRef} className={cn("absolute inset-0 pointer-events-none select-none overflow-hidden", className)}>
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
                        {/* More Vibrant Neural Gradient */}
                        <linearGradient id="neural-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="0%" stopColor="#13F584" stopOpacity="0" />
                            <stop offset="10%" stopColor="#13F584" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#13F584" stopOpacity="1" />
                            <stop offset="90%" stopColor="#13F584" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#13F584" stopOpacity="0" />
                        </linearGradient>

                        <filter id="neural-glow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {waveRibbons.map((ribbon) => (
                        <g key={ribbon.id} opacity={ribbon.opacity} transform={`scale(${scaleX}, ${scaleY})`} filter="url(#neural-glow)">
                            {ribbon.paths.map((d, i) => (
                                <path
                                    key={i}
                                    d={d}
                                    stroke="url(#neural-gradient)"
                                    strokeWidth={ribbon.strokeWidth}
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
