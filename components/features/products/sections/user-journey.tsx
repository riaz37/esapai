"use client";

import React, { useRef, useMemo } from "react";
import ReactFlow, {
    Handle,
    Position,
    NodeProps,
    EdgeProps,
    ReactFlowProvider,
    getSmoothStepPath,
    Node,
    Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Workflow } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_JOURNEYS } from "@/config/user-journeys";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PRIMARY = "#13F584";

// Define the animation style once globally to avoid duplication in DOM
const globalEdgeStyles = `
  @keyframes dash-draw {
    from { stroke-dashoffset: 20; }
    to { stroke-dashoffset: 0; }
  }
`;

/**
 * Rebuilt Connection Line "CinematicEdge"
 * 
 * Changes from previous version:
 * 1. REMOVED GRADIENTS on paths. Gradients on horizontal/vertical SVG paths
 *    often disappear because the bounding box has 0 width or height.
 * 2. Used SOLID COLORS for robust visibility. 
 *    - Core line: Solid primary color, dashed.
 *    - Glow line: Thicker, lower opacity solid color, blurred.
 * 3. Simplified filters to ensure efficient rendering.
 */
const CinematicEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) => {

    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 16, // Slightly increased radius for better aesthetics
    });

    // Unique IDs for this specific edge instance to prevent collisions
    const markerId = `arrow-${id}`;
    const filterId = `glow-${id}`;

    return (
        <>
            <defs>
                <marker
                    id={markerId}
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={PRIMARY} />
                </marker>

                {/* Simple blur filter for the glow effect */}
                <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* 1. Underlying Glow Path (Thicker, blurred, low opacity) */}
            <path
                d={edgePath}
                fill="none"
                stroke={PRIMARY}
                strokeWidth={4}
                strokeOpacity={0.08}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#${filterId})`}
                className="react-flow__edge-path-glow"
            />

            {/* 2. Main Visible Line (Thin, distinct, animated) */}
            <path
                d={edgePath}
                fill="none"
                stroke={PRIMARY} // Solid color guarantees visibility
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5, 7" // Distinct dash pattern
                markerEnd={`url(#${markerId})`}
                style={{
                    ...style,
                    animation: "dash-draw 1s linear infinite",
                }}
            />
        </>
    );
};

const JourneyNode = ({ id, data }: NodeProps) => {
    return (
        <div className="flex flex-col items-center journey-node" data-id={id}>
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center",
                    "rounded-2xl overflow-hidden",
                    "border-2 border-white/10",
                    "transition-all duration-500 ease-out",
                    "node-content-box",
                    "min-w-[200px] max-w-[220px] p-6 sm:p-7"
                )}
                style={{
                    background:
                        "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.1) 100%)",
                    boxShadow:
                        "0 8px 32px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
                }}
            >
                {/* Handles on all slides for flexible routing */}
                <Handle type="target" position={Position.Left} id="l-in" style={{ opacity: 0 }} />
                <Handle type="source" position={Position.Left} id="l-out" style={{ opacity: 0 }} />
                <Handle type="target" position={Position.Right} id="r-in" style={{ opacity: 0 }} />
                <Handle type="source" position={Position.Right} id="r-out" style={{ opacity: 0 }} />
                <Handle type="target" position={Position.Top} id="t-in" style={{ opacity: 0 }} />
                <Handle type="source" position={Position.Top} id="t-out" style={{ opacity: 0 }} />
                <Handle type="target" position={Position.Bottom} id="b-in" style={{ opacity: 0 }} />
                <Handle type="source" position={Position.Bottom} id="b-out" style={{ opacity: 0 }} />

                <div
                    className={cn(
                        "node-icon mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                        "border border-[#13F584]/25 bg-[#13F584]/[0.08]",
                        "transition-all duration-500 ease-out"
                    )}
                >
                    <span className="text-[#13F584] [&>svg]:h-7 [&>svg]:w-7">
                        {data.icon}
                    </span>
                </div>

                <h3
                    className={cn(
                        "node-title text-center font-bold uppercase tracking-wider text-white/95",
                        "text-sm leading-tight"
                    )}
                >
                    {data.title}
                </h3>
            </div>
        </div>
    );
};

const nodeTypes = { journey: JourneyNode };
const edgeTypes = { cinematic: CinematicEdge };

interface UserJourneyProps {
    productSlug?: string;
}

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
                end: `+=${layers.length * 100}%`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            },
        });

        // Layer parallax effect
        layersRef.current.forEach((layer, i) => {
            if (i === 0) return;
            if (!layer) return;

            gsap.set(layer, { yPercent: 100 });

            tl.to(layer, {
                yPercent: 0,
                duration: 1,
                ease: "none",
            });
        });

    }, { scope: containerRef, dependencies: [layers] });

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
            {/* Inject Animation Styles */}
            <style dangerouslySetInnerHTML={{ __html: globalEdgeStyles }} />

            {/* Header */}
            <div className="absolute top-8 left-0 right-0 z-50 pointer-events-none px-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                    <Workflow className="w-5 h-5 text-[#13F584]" />
                    <span className="text-[#13F584] text-xs font-bold tracking-widest uppercase">
                        Architecture
                    </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter text-center">
                    {title || "System Architecture"}
                </h2>
                {subtitle && (
                    <p className="mt-2 text-white/60 text-sm tracking-wide uppercase">{subtitle}</p>
                )}
            </div>

            {layers.map((layer, index) => (
                <div
                    key={layer.id || index}
                    ref={(el) => { layersRef.current[index] = el; }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
                    style={{
                        zIndex: index * 10,
                        backgroundColor: '#050505',
                        boxShadow: index > 0 ? '0 -20px 60px rgba(0,0,0,0.8)' : 'none',
                    }}
                >
                    {/* Atmospheric Background */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#13F584]/5 blur-[120px] rounded-full" />
                    </div>

                    <div className="relative w-full max-w-7xl h-full mx-auto flex flex-col justify-center pt-24 pb-12 px-6">
                        {/* Layer Label */}
                        <div className="absolute top-32 left-8 border-l-2 border-[#13F584] pl-4">
                            <span className="block text-[#13F584] text-xs font-mono mb-1">LAYER 0{index + 1}</span>
                            <h3 className="text-2xl font-bold text-white">{layer.title}</h3>
                        </div>

                        {/* React Flow Canvas */}
                        <div className="w-full h-[60vh] mt-12 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden relative">
                            <ReactFlow
                                nodes={layer.nodes}
                                edges={layer.edges}
                                nodeTypes={nodeTypes}
                                edgeTypes={edgeTypes}
                                nodesDraggable={false}
                                nodesConnectable={false}
                                zoomOnScroll={false}
                                panOnDrag={false}
                                fitView
                                fitViewOptions={{ padding: 0.2 }}
                                minZoom={0.1}
                                proOptions={{ hideAttribution: true }}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
                            </ReactFlow>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export const UserJourney = ({ productSlug = "ai-framework" }: UserJourneyProps) => {
    const journeyData = PRODUCT_JOURNEYS[productSlug] ?? PRODUCT_JOURNEYS["ai-framework"];

    return (
        <ReactFlowProvider>
            <LayeredJourneyFlow
                layers={journeyData.layers || []}
                title={journeyData.journeyTitle}
                subtitle={journeyData.journeySubtitle}
            />
        </ReactFlowProvider>
    );
};
