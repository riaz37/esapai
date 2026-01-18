"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SyncedWireframeProps {
    containerRef: React.RefObject<HTMLElement | null>;
    cardRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
    animationTriggered?: boolean;
}

export const SyncedWireframe = ({
    containerRef,
    cardRef,
    className,
    animationTriggered = false,
}: SyncedWireframeProps) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
    const svgRef = useRef<SVGSVGElement>(null);
    const hasAnimatedIn = useRef(false);

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

    // Generate organic flowing ribbon bundles
    const waveRibbons = useMemo(() => {
        // 1400x700 is our logical coordinate space
        const ribbons = [
            { id: "r1", count: 12, x: -250, y: 180, qx: 200, qy: 50, tx: 550, ty: 250, endX: 900, endY: 180, opacity: 0.4 },
            { id: "r2", count: 10, x: 400, y: 80, qx: 750, qy: 400, tx: 1100, ty: 100, endX: 1600, endY: 250, opacity: 0.3 },
            { id: "r3", count: 14, x: 700, y: 220, qx: 1050, qy: -50, tx: 1400, ty: 300, endX: 1800, endY: 200, opacity: 0.35 },
            { id: "r4", count: 8, x: -100, y: 480, qx: 350, qy: 600, tx: 800, ty: 450, endX: 1300, endY: 550, opacity: 0.25 },
        ];

        return ribbons.map(r => {
            const paths = Array.from({ length: r.count }).map((_, i) => {
                // Offset each path slightly to create the ribbon volume
                const dy = i * 8;
                const dx = i * 4;

                const d = `M ${r.x + dx},${r.y + dy} Q ${r.qx + dx},${r.qy + dy} ${r.tx + dx},${r.ty + dy} T ${r.endX + dx},${r.endY + dy}`;
                return d;
            });
            return { ...r, paths };
        });
    }, []);

    // Enhanced entrance animation - ribbon growth effect
    useGSAP(() => {
        if (!svgRef.current || hasAnimatedIn.current) return;

        const paths = svgRef.current.querySelectorAll("path");

        // Set initial state - ribbons start invisible with stroke-dashoffset
        paths.forEach((path) => {
            const length = path.getTotalLength ? path.getTotalLength() : 1000;
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0,
            });
        });

    }, { scope: svgRef, dependencies: [parentSize] });

    // Trigger growth animation when footer animation completes
    useGSAP(() => {
        if (!svgRef.current || !animationTriggered || hasAnimatedIn.current) return;

        hasAnimatedIn.current = true;
        const paths = svgRef.current.querySelectorAll("path");
        const groups = svgRef.current.querySelectorAll("g");

        // Grow ribbons in with drawing effect
        gsap.to(paths, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            stagger: {
                each: 0.02,
                from: "start",
            },
            onComplete: () => {
                // After ribbons draw in, start the floating animation
                startFloatingAnimation();
            }
        });

        // Increase glow intensity during entrance
        gsap.fromTo(groups,
            { filter: "url(#wave-soft-glow) brightness(1.5)" },
            {
                filter: "url(#wave-soft-glow) brightness(1)",
                duration: 1.5,
                ease: "power2.out",
            }
        );

        function startFloatingAnimation() {
            if (!svgRef.current) return;

            // Dynamic, "alive" organic animation
            gsap.to(svgRef.current.querySelectorAll("path"), {
                y: "random(-40, 50)",
                x: "random(-30, 30)",
                rotation: "random(-15, 15)",
                transformOrigin: "center center",
                duration: "random(3, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.1,
                    from: "random",
                    ease: "power2.inOut"
                }
            });
        }

    }, { scope: svgRef, dependencies: [animationTriggered] });

    // Fallback: Start floating animation after timeout if not triggered
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!hasAnimatedIn.current && svgRef.current) {
                hasAnimatedIn.current = true;
                const paths = svgRef.current.querySelectorAll("path");

                // Quick fade in and start floating
                gsap.to(paths, {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: 0.5,
                });

                gsap.to(paths, {
                    y: "random(-40, 50)",
                    x: "random(-30, 30)",
                    rotation: "random(-15, 15)",
                    transformOrigin: "center center",
                    duration: "random(3, 6)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.1,
                        from: "random",
                        ease: "power2.inOut"
                    },
                    delay: 0.5,
                });
            }
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    if (parentSize.width === 0) return null;

    const scaleX = parentSize.width / 1400;
    const scaleY = parentSize.height / 700;

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
                        <linearGradient id="wave-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#13F584" stopOpacity="0" />
                            <stop offset="25%" stopColor="#13F584" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#13F584" stopOpacity="0.6" />
                            <stop offset="75%" stopColor="#13F584" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#13F584" stopOpacity="0" />
                        </linearGradient>

                        <filter id="wave-soft-glow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {waveRibbons.map((ribbon) => (
                        <g key={ribbon.id} opacity={ribbon.opacity} transform={`scale(${scaleX}, ${scaleY})`} filter="url(#wave-soft-glow)">
                            {ribbon.paths.map((d, i) => (
                                <path
                                    key={i}
                                    d={d}
                                    stroke="url(#wave-ribbon-gradient)"
                                    strokeWidth="0.6"
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
