import React, { useRef, useMemo, useEffect } from 'react';
import ReactFlow, {
    Background,
    Handle,
    Position,
    NodeProps,
    Edge,
    Node,
    ConnectionLineType,
    ReactFlowProvider,
    getBezierPath,
    EdgeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
    Plus,
    Workflow,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from '@/components/ui/section-header';
import { PRODUCT_JOURNEYS } from '@/config/user-journeys';

// Register GSAP plugins safely
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Custom Edge with Deterministic Pulsing Traveler ---
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
    // Use React Flow's native bezier logic for accurate connection lines
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    // Generate a stable, deterministic duration based on the Edge ID to prevent hydration mismatches
    // This replaces Math.random() with a hash-based approach
    const duration = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
        // Result between 2s and 4s
        return 2 + (Math.abs(hash) % 200) / 100;
    }, [id]);

    return (
        <>
            <path
                id={id}
                style={{ ...style, strokeWidth: 2, stroke: '#13F584', opacity: 0.15 }}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            {/* Pulsing Traveler */}
            <circle r="2" fill="#13F584" className="filter drop-shadow-[0_0_8px_#13F584]">
                <animateMotion
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                    path={edgePath}
                />
            </circle>
        </>
    );
};

// --- Custom Node Component ---
const JourneyNode = ({ data }: NodeProps) => {
    const isLarge = data.size === 'lg';

    // Note: 'data.active' here is the initial React state. 
    // GSAP animations will manipulate the DOM style directly for performance,
    // working on top of this base structure.

    return (
        <div className="flex flex-col items-center group">
            <div
                className={`
                  relative flex flex-col items-center justify-center 
                  bg-[#0A0A0A]
                  border border-white/10 rounded-2xl
                  ${isLarge ? 'p-8 min-w-[180px]' : 'p-6 min-w-[140px]'}
                  transition-all duration-300
                  group-hover:border-[#13F584]/40
                  ${data.active ? 'border-[#13F584]/80 shadow-[0_0_50px_-12px_rgba(19,245,132,0.3)]' : ''}
                `}
            >
                {/* Invisible handles for React Flow functionality */}
                <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
                <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
                <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
                <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />

                <div className={`
                    mb-3 text-[#13F584] transition-transform duration-300
                    ${isLarge ? 'scale-125' : ''} 
                    ${data.active ? 'scale-110' : ''}
                `}>
                    {data.icon}
                </div>

                <h3 className={`font-bold tracking-wider text-center ${isLarge ? 'text-lg' : 'text-sm'} uppercase text-white/90`}>
                    {data.title}
                </h3>

                {data.items && (
                    <div className="mt-4 w-full flex flex-col gap-1">
                        {data.items.map((item: string, i: number) => (
                            <div key={i} className="text-[9px] px-2 py-1 bg-white/5 border border-white/5 rounded-md text-white/60 text-center uppercase tracking-tight">
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

// Define nodeTypes and edgeTypes outside component to prevent unnecessary re-renders
const nodeTypes = { journey: JourneyNode };
const edgeTypes = { cinematic: CinematicEdge };

interface UserJourneyProps {
    productSlug?: string;
}

const UserJourneyFlow = ({ productSlug = 'ai-framework' }: UserJourneyProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Get journey data for the specific product, fallback to AI Framework
    const journeyData = useMemo(() => {
        return PRODUCT_JOURNEYS[productSlug] || PRODUCT_JOURNEYS['ai-framework'];
    }, [productSlug]);

    const { nodes: initialNodes, edges: initialEdges, cinematicSequence } = journeyData;

    // Calculate the center of the graph dynamically
    const graphCenter = useMemo(() => {
        if (!initialNodes || initialNodes.length === 0) return { x: 500, y: 300 };
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        initialNodes.forEach(node => {
            minX = Math.min(minX, node.position.x);
            maxX = Math.max(maxX, node.position.x);
            minY = Math.min(minY, node.position.y);
            maxY = Math.max(maxY, node.position.y);
        });

        // Add approximate half-node dimensions (150px wide, 80px tall) to center on mass
        // We add padding to X and Y to find true visual center
        return {
            x: (minX + maxX) / 2 + 75,
            y: (minY + maxY) / 2 + 50
        };
    }, [initialNodes]);

    useGSAP(() => {
        if (!containerRef.current || !cinematicSequence || cinematicSequence.length === 0) return;

        // Dynamic Sequence Calculation: Center "Overview" steps based on current viewport
        const processedSequence = cinematicSequence.map(step => {
            if (step.targetId === '') {
                // It's an overview step -> Center it!
                // Formula: ScreenCenter - (GraphCenter * Zoom)
                // Add y-offset to clear header (moved from top-16 to top-32, roughly 128px)
                const x = (window.innerWidth / 2) - (graphCenter.x * step.zoom);
                const y = (window.innerHeight / 2) - (graphCenter.y * step.zoom) + 120; // +120px to push down below header 
                return { ...step, position: { x, y } };
            }
            return step;
        });

        // Camera Proxy State
        const initialState = processedSequence[0] || { x: 500, y: 150, zoom: 1 };
        const state = {
            x: initialState.position.x,
            y: initialState.position.y,
            zoom: initialState.zoom,
            nodeHighlight: initialState.targetId || ''
        };

        const updateVisuals = () => {
            // 1. Viewport Transform
            const viewport = containerRef.current?.querySelector('.react-flow__viewport') as HTMLElement;
            if (viewport) {
                gsap.set(viewport, {
                    transform: `translate(${state.x}px, ${state.y}px) scale(${state.zoom})`,
                    transformOrigin: '0 0'
                });
            }

            // 2. Highlight Logic (Scoped to this container to avoid phantom highlights)
            // Using straight DOM manipulation for performance (avoiding React state update loop)
            const nodes = containerRef.current?.querySelectorAll('.react-flow__node');
            nodes?.forEach(node => {
                const inner = node.querySelector('.group > div') as HTMLElement;
                if (!inner) return;

                const id = node.getAttribute('data-id');
                if (id === state.nodeHighlight) {
                    inner.style.borderColor = '#13F584';
                    inner.style.boxShadow = '0 0 50px -12px rgba(19,245,132,0.3)';
                } else {
                    // Reset to default styles (matching the CSS in JourneyNode)
                    inner.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    inner.style.boxShadow = 'none';
                }
            });
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=600%", // Extends the scroll distance for a cinematic feel
                pin: true,    // Pins the section while animating
                scrub: 1.2,   // Smooth scrubbing
                invalidateOnRefresh: true, // Recalculate on resize
            },
            onUpdate: updateVisuals
        });

        // Initialize state
        tl.set(state, {
            nodeHighlight: initialState.targetId || '',
            x: initialState.position.x,
            y: initialState.position.y,
            zoom: initialState.zoom
        });

        // Force initial update to prevent flash of unstyled content
        updateVisuals();

        // Fade out header as soon as user scrubs
        if (headerRef.current) {
            tl.to(headerRef.current, { opacity: 0, duration: 0.5 }, 0);
        }

        // Build Cinematic Sequence Dynamically
        // Skip the first item as it's the initial state
        processedSequence.slice(1).forEach((step, i) => {
            tl.to(state, {
                nodeHighlight: step.targetId,
                x: step.position.x,
                y: step.position.y,
                zoom: step.zoom,
                duration: step.duration,
                onStart: () => {
                    // Dramatic 3D Tilt per step transition
                    gsap.to(".journey-stage", {
                        rotationX: (Math.random() - 0.5) * 10,
                        rotationY: (Math.random() - 0.5) * 10,
                        duration: 1.5,
                        ease: "power2.inOut"
                    });
                }
            });
        });

        // 3D Perspective Animation tied to scroll
        tl.to(".journey-stage", {
            rotationX: 15,
            rotationY: -5,
            duration: 6,
            ease: "none"
        }, 0);

    }, { scope: containerRef, dependencies: [journeyData] }); // Dependency ensures update on product change

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden perspective-[2000px]">
            {/* Header Layer */}
            <div ref={headerRef} className="absolute top-32 left-0 right-0 z-30 pointer-events-none">
                <SectionHeader
                    title="User Journey"
                    subtitle="Experience the seamless flow of intelligent automation"
                    badge="Live Flow"
                    badgeIcon={Workflow}
                    align="center"
                />
            </div>

            {/* React Flow Layer - Animated Stage */}
            <div className="journey-stage w-full h-full transform-gpu transition-transform duration-700 ease-out will-change-transform">
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
                    <Background color="#13F584" gap={40} size={1} />
                </ReactFlow>
            </div>

            {/* Visual Effect Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 blur-[150px] bg-radial-gradient from-[#13F584]/30 to-transparent rounded-full" />
            </div>
        </section>
    );
};

// Export wrapped in Provider to ensure internal React Flow hooks work if we ever need them
export const UserJourney = ({ productSlug }: UserJourneyProps) => (
    <ReactFlowProvider>
        <UserJourneyFlow productSlug={productSlug} />
    </ReactFlowProvider>
);
