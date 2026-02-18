"use client";

import React, { useRef, useMemo } from "react";
import Image from "next/image";
import { Workflow } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_JOURNEYS } from "@/config/user-journeys";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PRIMARY = "#13F584";

// --- Components ---

/**
 * Lightweight SVG Edge Renderer
 * Replaces ReactFlow's edge system for maximum performance.
 */
const CinematicEdge = ({
    sourceX: sX,
    sourceY: sY,
    targetX: tX,
    targetY: tY,
}: {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}) => {
    // Calculate angle and apply offset to prevent overlapping with nodes
    // Node width is ~150px, so we offset by ~80px to reach the edge
    const dx = tX - sX;
    const dy = tY - sY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Only apply offset if nodes are far enough apart
    const offset = distance > 180 ? 80 : 0;

    const sourceX = sX + Math.cos(angle) * offset;
    const sourceY = sY + Math.sin(angle) * offset;
    const targetX = tX - Math.cos(angle) * (offset + 5); // Extra 5px for arrow breathing room
    const targetY = tY - Math.sin(angle) * (offset + 5);

    // Generate a simple smooth path (Bézier curve)
    const deltaX = Math.abs(targetX - sourceX);
    const controlPointX = deltaX * 0.4;
    const path = `M ${sourceX},${sourceY} C ${sourceX + controlPointX},${sourceY} ${targetX - controlPointX},${targetY} ${targetX},${targetY}`;

    return (
        <g className="cinematic-edge">
            {/* Background Trace */}
            <path
                d={path}
                fill="none"
                stroke={PRIMARY}
                strokeWidth={1}
                strokeOpacity={0.1}
            />

            {/* Glowing Flow */}
            <path
                d={path}
                fill="none"
                stroke={PRIMARY}
                strokeWidth={2}
                strokeOpacity={0.4}
                strokeDasharray="10, 20"
                className="animate-flow-pulse"
            />

            {/* Light Pellets for Kinetic Feedback */}
            <circle r="3" fill="#fff" className="light-pellet">
                <animateMotion
                    path={path}
                    dur="3s"
                    repeatCount="indefinite"
                    rotate="auto"
                />
            </circle>

            {/* Target Indicator */}
            <g transform={`translate(${targetX}, ${targetY})`}>
                <circle r={4} fill={PRIMARY} className="animate-pulse shadow-glow" />
                <circle r={8} fill={PRIMARY} opacity={0.3} className="animate-ping" />
            </g>
        </g>
    );
};

const JourneyNode = ({ node }: { node: any }) => {
    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 group/node"
            style={{
                left: node.position.x,
                top: node.position.y,
            }}
        >
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center",
                    "rounded-2xl overflow-hidden",
                    "border border-white/10 hover:border-[#13F584]/50 transition-all duration-500",
                    "bg-white/[0.03] backdrop-blur-3xl",
                    "min-w-[110px] md:min-w-[150px] p-3.5 md:p-6",
                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_40px_rgba(0,0,0,0.8)]",
                    "group-hover/node:scale-105 group-hover/node:shadow-[0_0_50px_rgba(19,245,132,0.15)]"
                )}
            >
                {/* Node Glow Backdrop */}
                <div className="absolute inset-0 bg-radial-at-t from-[#13F584]/5 to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity duration-700" />

                {/* Node Image/Icon Container */}
                <div
                    className="relative mb-4 w-18 h-18 flex items-center justify-center rounded-2xl border border-white/5 bg-white/5 overflow-hidden shadow-[0_0_20px_rgba(19,245,132,0.1)] group-hover/node:shadow-[0_0_30px_rgba(19,245,132,0.2)] transition-all"
                    style={{ color: PRIMARY }}
                >
                    {node.data.image ? (
                        <Image
                            src={node.data.image}
                            alt={node.data.title}
                            fill
                            sizes="72px"
                            unoptimized
                            className="object-cover opacity-80 group-hover/node:opacity-100 transition-opacity duration-500"
                        />
                    ) : (
                        <>
                            <div className="md:hidden">
                                {React.cloneElement(node.data.icon as any, { size: 20 })}
                            </div>
                            <div className="hidden md:block">
                                {React.cloneElement(node.data.icon as any, { size: 28 })}
                            </div>
                        </>
                    )}

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#13F584]/40" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#13F584]/40" />
                </div>

                <h3 className="relative text-white/90 text-center leading-tight text-label-caps">
                    {node.data.title}
                </h3>

                {/* Visual scan light effect on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/node:opacity-100">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#13F584]/40 to-transparent -translate-y-full hover-scan-line" />
                </div>
            </div>
        </div>
    );
};

const LayeredJourneyFlow = ({
    layers,
    title,
    subtitle
}: {
    layers: any[],
    title?: string,
    subtitle?: string
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current || layers.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${(layers.length + 0.5) * 70}%`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Initial state for all layers
        layersRef.current.forEach((layer, i) => {
            if (!layer) return;
            // First layer starts visible, others start below the fold
            if (i === 0) {
                gsap.set(layer, { opacity: 1 });
            } else {
                gsap.set(layer, { yPercent: 100 });
            }
        });

        // Layer Reveal Orchestration
        layersRef.current.forEach((layer, i) => {
            if (!layer) return;

            if (i === 0) {
                // First layer is already visible, no animation needed
            } else {
                // Subsequent layers curtain wipe with 3D tilt
                tl.to(layer, {
                    yPercent: 0,
                    duration: 1,
                    ease: "none"
                });
            }

            // --- Cinematic Reveal Sequence (Applied ONLY to subsequent layers for entrance) ---
            if (i > 0) {
                // 3D perspective "tilt-in" effect
                const surface = layer.querySelector(".architecture-surface");
                if (surface) {
                    tl.fromTo(surface,
                        { rotateX: 10, translateZ: -100, opacity: 0 },
                        { rotateX: 0, translateZ: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                        "-=0.5"
                    );
                }

                // Sequential "Power-on" for nodes and edges
                const nodes = layer.querySelectorAll(".group\\/node");
                const edges = layer.querySelectorAll(".cinematic-edge");

                if (nodes.length > 0) {
                    tl.fromTo(nodes,
                        { scale: 0.5, opacity: 0, filter: "brightness(2)" },
                        { scale: 1, opacity: 1, filter: "brightness(1)", duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
                        "-=0.4"
                    );
                }

                if (edges.length > 0) {
                    tl.fromTo(edges,
                        { opacity: 0, strokeDashoffset: 100 },
                        { opacity: 1, strokeDashoffset: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" },
                        "-=0.6"
                    );
                }
            }
        });

    }, { scope: containerRef, dependencies: [layers] });

    return (
        <div className="relative w-full">
            <style jsx global>{`
                @keyframes dash-move {
                    from { stroke-dashoffset: 100; }
                    to { stroke-dashoffset: 0; }
                }
                .perspective-stage {
                    perspective: 1500px;
                    perspective-origin: center center;
                }
                .architecture-surface {
                    transform-style: preserve-3d;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                @keyframes flow-pulse {
                    0% { stroke-dashoffset: 100; opacity: 0.2; }
                    50% { opacity: 0.8; }
                    100% { stroke-dashoffset: 0; opacity: 0.2; }
                }
                .animate-flow-pulse {
                    animation: flow-pulse 3s linear infinite;
                }
                .shadow-glow {
                    filter: drop-shadow(0 0 8px #13F584);
                }
            `}</style>

            {/* Header Overlay - Standard Flow */}
            <div className="container mx-auto px-6 py-12 sm:py-24 pb-0">
                <SectionHeader
                    title={title || "System Architecture"}
                    subtitle={subtitle}
                    badge="Architecture"
                    badgeIcon={Workflow}
                    animate={true}
                    className="mb-10"
                    titleClassName="text-4xl md:text-5xl lg:text-6xl max-w-4xl"
                    subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4"
                />
            </div>

            {/* Pinned Layers Container - Removed -mt-20 on mobile to clear navbar */}
            <div ref={containerRef} className="relative w-full h-[110vh] overflow-hidden md:-mt-20">

                {layers.map((layer, index) => (
                    <div
                        key={layer.id || index}
                        ref={(el) => { layersRef.current[index] = el; }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
                        style={{
                            zIndex: index * 10,
                            backgroundColor: '#09090b',
                            boxShadow: index > 0 ? '0 -30px 100px rgba(0,0,0,0.9)' : 'none',
                        }}
                    >

                        {/* Background Gradients */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-at-t from-[#13F584]/5 to-transparent opacity-50" />
                        </div>

                        <div className="relative w-full max-w-[1400px] h-full mx-auto flex flex-col justify-center pt-20 md:pt-20 pb-8 md:pb-32 px-4 md:px-8 perspective-stage">
                            {/* Scrollable Wrapper for Mobile - Allows panning nodes on small screens */}
                            <div className="relative w-full h-full overflow-x-auto md:overflow-visible no-scrollbar pb-10">
                                <div
                                    className="relative w-[850px] md:w-full h-[75vh] min-h-[600px] mt-10 md:mt-10 architecture-surface rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                                >
                                    {/* SVG Edges Layer */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                        {layer.edges.map((edge: any) => {
                                            const sourceNode = layer.nodes.find((n: any) => n.id === edge.source);
                                            const targetNode = layer.nodes.find((n: any) => n.id === edge.target);

                                            if (!sourceNode || !targetNode) return null;

                                            return (
                                                <CinematicEdge
                                                    key={edge.id}
                                                    sourceX={sourceNode.position.x}
                                                    sourceY={sourceNode.position.y}
                                                    targetX={targetNode.position.x}
                                                    targetY={targetNode.position.y}
                                                />
                                            );
                                        })}
                                    </svg>

                                    {/* HTML Nodes Layer */}
                                    <div className="absolute inset-0">
                                        {layer.nodes.map((node: any) => (
                                            <JourneyNode key={node.id} node={node} />
                                        ))}
                                    </div>

                                    {/* Internal Stage Title Overlay */}
                                    <div className="absolute top-8 left-8 z-20 pointer-events-none">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-mono font-bold text-[#13F584] text-label-caps tracking-cinematic-widest">
                                                    Stage {['One', 'Two', 'Three', 'Four', 'Five'][index] || index + 1}
                                                </span>
                                            </div>
                                            <h4 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                                                {layer.title}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const UserJourney = ({ productSlug = "ai-framework" }: { productSlug?: string }) => {
    const journeyData = useMemo(() =>
        PRODUCT_JOURNEYS[productSlug] ?? PRODUCT_JOURNEYS["ai-framework"],
        [productSlug]
    );

    return (
        <LayeredJourneyFlow
            layers={journeyData.layers || []}
            title={journeyData.journeyTitle}
            subtitle={journeyData.journeySubtitle}
        />
    );
};
