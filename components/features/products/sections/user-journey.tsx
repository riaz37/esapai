"use client";

import React, { useRef, useMemo } from "react";
import ReactFlow, {
    Handle,
    Position,
    NodeProps,
    ConnectionLineType,
    ReactFlowProvider,
    getStraightPath,
    EdgeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { Workflow } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/section-header";
import { PRODUCT_JOURNEYS } from "@/config/user-journeys";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PRIMARY = "#13F584";
const PRIMARY_RGB = "19, 245, 132";

// --- Edge: soft gradient stroke + animated traveler ---
const CinematicEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
}: EdgeProps) => {
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const duration = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
        return 2.5 + (Math.abs(hash) % 300) / 100;
    }, [id]);

    return (
        <>
            <path
                d={edgePath}
                fill="none"
                stroke={`url(#edge-glow-${id})`}
                strokeWidth={12}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.15}
                className="react-flow__edge-path"
            />
            <path
                d={edgePath}
                fill="none"
                stroke={`url(#edge-stroke-${id})`}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="react-flow__edge-path"
                style={style}
            />
            <circle r="4" fill={PRIMARY} opacity={0.9}>
                <animateMotion dur={`${duration}s`} repeatCount="indefinite" path={edgePath} />
            </circle>
            <defs>
                <linearGradient id={`edge-glow-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={0} />
                    <stop offset="50%" stopColor={PRIMARY} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`edge-stroke-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={PRIMARY} stopOpacity={0.9} />
                </linearGradient>
            </defs>
        </>
    );
};

// --- Node: glass card with step badge, icon ring, and active glow ---
const JourneyNode = ({ id, data }: NodeProps) => {
    const stepNum = id.replace(/step/i, "").padStart(2, "0");

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
                <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
                <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />

                {/* Step number badge */}
                <span
                    className="absolute top-3 left-3 font-mono text-[11px] font-semibold tracking-[0.2em] text-[#13F584]/80 node-step-badge"
                    aria-hidden
                >
                    {stepNum}
                </span>

                {/* Icon */}
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

                {/* Active glow — toggled by GSAP from active step */}
                <div
                    className="node-glow pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#13F584]/50 opacity-0 transition-opacity duration-500"
                    style={{
                        boxShadow:
                            "inset 0 0 60px -12px rgba(19,245,132,0.35), 0 0 48px -16px rgba(19,245,132,0.25)",
                    }}
                    aria-hidden
                />
            </div>
        </div>
    );
};

const nodeTypes = { journey: JourneyNode };
const edgeTypes = { cinematic: CinematicEdge };

interface UserJourneyProps {
    productSlug?: string;
}

const STEP_DURATION = 2.4;
const OVERVIEW_DURATION = 1.8;

const UserJourneyFlow = ({ productSlug = "ai-framework" }: UserJourneyProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headerStepTitleRef = useRef<HTMLSpanElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);
    const captionTextRef = useRef<HTMLParagraphElement>(null);
    const stepDotsRef = useRef<HTMLDivElement>(null);

    const journeyData = useMemo(
        () => PRODUCT_JOURNEYS[productSlug] ?? PRODUCT_JOURNEYS["ai-framework"],
        [productSlug]
    );

    const { nodes: initialNodes, edges: initialEdges, cinematicSequence } = journeyData;

    const graphCenter = useMemo(() => {
        if (!initialNodes?.length) return { x: 400, y: 200 };
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        initialNodes.forEach((node) => {
            minX = Math.min(minX, node.position.x);
            maxX = Math.max(maxX, node.position.x);
            minY = Math.min(minY, node.position.y);
            maxY = Math.max(maxY, node.position.y);
        });
        return { x: (minX + maxX) / 2 + 60, y: (minY + maxY) / 2 + 40 };
    }, [initialNodes]);

    const stepNodes = useMemo(
        () =>
            initialNodes
                .filter((n) => n.id && String(n.id).startsWith("step"))
                .sort((a, b) => String(a.id).localeCompare(String(b.id))),
        [initialNodes]
    );

    const processedSequence = useMemo(() => {
        if (!cinematicSequence?.length) return [];
        const w = typeof window !== "undefined" ? window.innerWidth : 0;
        const h = typeof window !== "undefined" ? window.innerHeight : 0;
        return cinematicSequence.map((step) => {
            if (step.targetId === "") {
                const x = w / 2 - graphCenter.x * step.zoom;
                const y = h / 2 - graphCenter.y * step.zoom;
                return { ...step, position: { x, y } };
            }
            const node = initialNodes.find((n) => n.id === step.targetId);
            if (node && typeof node.position.x === "number" && typeof node.position.y === "number") {
                const x = w / 2 - node.position.x * step.zoom;
                const y = h / 2 - node.position.y * step.zoom;
                return { ...step, position: { x, y } };
            }
            return { ...step, position: step.position ?? { x: 0, y: 0 } };
        });
    }, [cinematicSequence, initialNodes, graphCenter]);

    useGSAP(() => {
        if (!containerRef.current || !processedSequence.length) return;

        const reducedMotion = prefersReducedMotion();
        const stepDur = reducedMotion ? 0.4 : STEP_DURATION;
        const overviewDur = reducedMotion ? 0.3 : OVERVIEW_DURATION;

        const state = {
            x: processedSequence[0].position.x,
            y: processedSequence[0].position.y,
            zoom: processedSequence[0].zoom,
        };

        // Step start times: step 0 = overview [0, overviewDur), step 1 = first focus [overviewDur, overviewDur+stepDur), ...
        const stepStartTimes: number[] = [0];
        for (let i = 1; i < processedSequence.length; i++) {
            stepStartTimes.push(overviewDur + (i - 1) * stepDur);
        }

        const getCurrentStepIndex = (time: number): number => {
            let idx = 0;
            for (let i = 0; i < processedSequence.length; i++) {
                if (time >= stepStartTimes[i]) idx = i;
            }
            return Math.min(idx, processedSequence.length - 1);
        };

        const updateVisuals = () => {
            const viewport = containerRef.current?.querySelector(".react-flow__viewport") as HTMLElement;
            if (viewport) {
                gsap.set(viewport, {
                    transform: `translate(${state.x}px, ${state.y}px) scale(${state.zoom})`,
                    transformOrigin: "0 0",
                });
            }

            const tl = gsap.getById("journey-timeline") as gsap.core.Timeline | undefined;
            const currentTime = tl ? tl.time() : 0;
            const stepIndex = getCurrentStepIndex(currentTime);
            const currentStep = processedSequence[stepIndex];
            const activeNodeId = currentStep?.targetId ?? "";

            // Node highlight from current step (stays in sync with scroll)
            containerRef.current?.querySelectorAll(".journey-node").forEach((wrapper) => {
                const id = (wrapper as HTMLElement).getAttribute("data-id");
                const box = wrapper.querySelector(".node-content-box") as HTMLElement;
                const glow = wrapper.querySelector(".node-glow") as HTMLElement;
                const icon = wrapper.querySelector(".node-icon") as HTMLElement;
                if (!box) return;

                const isActive = id === activeNodeId;
                if (isActive) {
                    box.style.borderColor = `rgba(${PRIMARY_RGB}, 0.5)`;
                    box.style.boxShadow = `0 12px 40px -12px rgba(${PRIMARY_RGB}, 0.35), 0 0 0 1px rgba(${PRIMARY_RGB}, 0.2) inset`;
                    if (glow) glow.style.opacity = "1";
                    if (icon) icon.style.transform = "scale(1.08)";
                } else {
                    box.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    box.style.boxShadow =
                        "0 8px 32px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset";
                    if (glow) glow.style.opacity = "0";
                    if (icon) icon.style.transform = "scale(1)";
                }
            });

            const captionText = currentStep?.caption ?? "";
            if (captionTextRef.current) captionTextRef.current.textContent = captionText;
            if (captionRef.current) {
                gsap.set(captionRef.current, { opacity: captionText ? 1 : 0 });
            }

            const currentNode = initialNodes.find((n) => n.id === activeNodeId);
            const stepTitle = (currentNode?.data?.title as string) ?? "Overview";
            if (headerStepTitleRef.current) headerStepTitleRef.current.textContent = stepTitle;

            stepDotsRef.current?.querySelectorAll("[data-node-id]").forEach((el) => {
                const nodeId = (el as HTMLElement).getAttribute("data-node-id");
                const active = nodeId === activeNodeId;
                (el as HTMLElement).style.opacity = active ? "1" : "0.45";
                (el as HTMLElement).style.transform = active ? "scale(1.25)" : "scale(1)";
                (el as HTMLElement).style.background = active ? PRIMARY : "rgba(255,255,255,0.18)";
            });
        };

        const tl = gsap.timeline({
            id: "journey-timeline",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=600%",
                pin: true,
                scrub: reducedMotion ? 0.5 : 1.5,
                invalidateOnRefresh: true,
            },
            onUpdate: updateVisuals,
        });

        tl.set(state, {
            x: processedSequence[0].position.x,
            y: processedSequence[0].position.y,
            zoom: processedSequence[0].zoom,
        });
        updateVisuals();

        if (headerRef.current) {
            tl.to(headerRef.current, { opacity: 0.6, duration: 0.8 }, 0);
        }

        // Smooth camera: sequential tweens, one per step, with consistent duration and smooth ease
        processedSequence.slice(1).forEach((step, i) => {
            const duration = i === 0 ? overviewDur : stepDur;
            tl.to(state, {
                x: step.position.x,
                y: step.position.y,
                zoom: step.zoom,
                duration,
                ease: "power3.inOut",
            });
        });

        // Slight exit scale for next section (at end of timeline)
        const journeyStage = containerRef.current?.querySelector(".journey-stage") as HTMLElement;
        if (!reducedMotion && journeyStage) {
            tl.to(
                journeyStage,
                { scale: 0.98, opacity: 0.96, duration: 1.2, ease: "power3.inOut" },
                "-=0.8"
            );
        }
    }, { scope: containerRef, dependencies: [journeyData, processedSequence] });

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#050505] overflow-hidden"
        >
            {/* Header */}
            <div
                ref={headerRef}
                className="absolute top-24 left-0 right-0 z-30 pointer-events-none px-4 transition-opacity duration-500"
            >
                <SectionHeader
                    title={journeyData.journeyTitle ?? "User Journey"}
                    subtitle={
                        journeyData.journeySubtitle ??
                        "Experience the seamless flow of intelligent automation"
                    }
                    badge="Live Flow"
                    badgeIcon={Workflow}
                    align="center"
                />
                <p className="mt-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-[#13F584]/90">
                    <span ref={headerStepTitleRef}>Overview</span>
                </p>
            </div>

            {/* React Flow graph */}
            <div className="journey-stage absolute inset-0">
                <ReactFlow
                    nodes={initialNodes}
                    edges={initialEdges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    zoomOnScroll={false}
                    panOnDrag={false}
                    proOptions={{ hideAttribution: true }}
                >
                    <div className="absolute inset-0 bg-[#0a0a0a]/30" aria-hidden />
                </ReactFlow>
            </div>

            {/* Caption */}
            <div
                ref={captionRef}
                className="absolute bottom-32 left-1/2 z-20 w-full max-w-xl -translate-x-1/2 px-4 opacity-0 transition-opacity duration-300"
            >
                <p
                    ref={captionTextRef}
                    className="text-center text-sm font-medium uppercase tracking-[0.18em] text-[#13F584]/95 md:text-base"
                />
            </div>

            {/* Step dots */}
            <div
                ref={stepDotsRef}
                className="absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/10 bg-[#0a0a0a]/90 px-5 py-3 backdrop-blur-md"
            >
                {stepNodes.map((node) => (
                    <span
                        key={node.id}
                        data-node-id={node.id}
                        className="h-2.5 w-2.5 rounded-full bg-white/20 transition-all duration-300 ease-out"
                        style={{ opacity: 0.45 }}
                        aria-hidden
                    />
                ))}
            </div>

            {/* Overlays */}
            <div className="pointer-events-none absolute inset-0 z-10">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
                <div
                    className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(19,245,132,0.15) 0%, transparent 55%)",
                    }}
                />
            </div>
        </section>
    );
};

export const UserJourney = ({ productSlug }: UserJourneyProps) => (
    <ReactFlowProvider>
        <UserJourneyFlow productSlug={productSlug} />
    </ReactFlowProvider>
);
