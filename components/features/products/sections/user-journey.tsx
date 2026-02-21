"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Workflow, ArrowDown, ChevronRight } from "lucide-react";
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
 * Lightweight SVG Edge Renderer for Desktop
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
    const dx = tX - sX;
    const dy = tY - sY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const offset = distance > 180 ? 80 : 0;

    const sourceX = sX + Math.cos(angle) * offset;
    const sourceY = sY + Math.sin(angle) * offset;
    const targetX = tX - Math.cos(angle) * (offset + 5);
    const targetY = tY - Math.sin(angle) * (offset + 5);

    const deltaX = Math.abs(targetX - sourceX);
    const controlPointX = deltaX * 0.4;
    const path = `M ${sourceX},${sourceY} C ${sourceX + controlPointX},${sourceY} ${targetX - controlPointX},${targetY} ${targetX},${targetY}`;

    return (
        <g className="cinematic-edge">
            <path d={path} fill="none" stroke={PRIMARY} strokeWidth={1} strokeOpacity={0.1} />
            <path d={path} fill="none" stroke={PRIMARY} strokeWidth={2} strokeOpacity={0.4} strokeDasharray="10, 20" className="animate-flow-pulse" />
            <circle r="3" fill="#fff" className="light-pellet">
                <animateMotion path={path} dur="3s" repeatCount="indefinite" rotate="auto" />
            </circle>
            <g transform={`translate(${targetX}, ${targetY})`}>
                <circle r={4} fill={PRIMARY} className="animate-pulse shadow-glow" />
                <circle r={8} fill={PRIMARY} opacity={0.3} className="animate-ping" />
            </g>
        </g>
    );
};

const JourneyNode = ({ node, isMobile = false }: { node: any, isMobile?: boolean }) => {
    return (
        <div
            className={cn(
                "group/node",
                isMobile ? "relative" : "absolute -translate-x-1/2 -translate-y-1/2"
            )}
            style={isMobile ? {} : {
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
                    "min-w-full md:min-w-[150px] p-4 md:p-6",
                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_40px_rgba(0,0,0,0.8)]",
                    "group-hover/node:scale-105 group-hover/node:shadow-[0_0_50px_rgba(19,245,132,0.15)]"
                )}
            >
                <div className="absolute inset-0 bg-radial-at-t from-[#13F584]/5 to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity duration-700" />

                <div
                    className="relative mb-3 md:mb-4 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl border border-white/5 bg-white/5 overflow-hidden shadow-[0_0_20px_rgba(19,245,132,0.1)] group-hover/node:shadow-[0_0_30px_rgba(19,245,132,0.2)] transition-all"
                    style={{ color: PRIMARY }}
                >
                    {node.data.image ? (
                        <Image
                            src={node.data.image}
                            alt={node.data.title}
                            fill
                            sizes="64px"
                            className="object-cover opacity-80 group-hover/node:opacity-100 transition-opacity duration-500"
                        />
                    ) : (
                        <div className="scale-75 md:scale-100 italic">
                            {node.data.icon && React.cloneElement(node.data.icon as any, {
                                size: 24,
                                strokeWidth: 1.5
                            })}
                        </div>
                    )}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#13F584]/40" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#13F584]/40" />
                </div>

                <h3 className="relative text-white/90 text-center leading-tight text-[11px] md:text-xs font-mono tracking-widest uppercase">
                    {node.data.title}
                </h3>

                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/node:opacity-100">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#13F584]/40 to-transparent -translate-y-full hover-scan-line" />
                </div>
            </div>
        </div>
    );
};

/**
 * MOBILE VIEW: Vertical Timeline/Card Layout
 */
const MobileJourneyFlow = ({ layers }: { layers: any[] }) => {
    return (
        <div className="flex flex-col gap-12 px-4 pb-24">
            {layers.map((layer, index) => (
                <div key={layer.id} className="relative group">
                    {/* Stage Label */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px] bg-[#13F584]/30" />
                        <span className="text-[10px] font-mono font-bold text-[#13F584] tracking-[0.2em] uppercase">
                            Stage {['One', 'Two', 'Three', 'Four', 'Five'][index] || index + 1}
                        </span>
                    </div>

                    {/* Stage Card */}
                    <div className="relative p-6 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[#13F584]/20 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <h4 className="text-2xl font-bold text-white mb-8 tracking-tight">
                            {layer.title}
                        </h4>

                        {/* Nodes Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {layer.nodes.map((node: any) => (
                                <JourneyNode key={node.id} node={node} isMobile={true} />
                            ))}
                        </div>

                        {/* Edge Visualizer for Mobile (Simplified) */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-30 group-last:hidden">
                            <ArrowDown size={32} className="text-[#13F584] animate-bounce" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

/**
 * DESKTOP VIEW: Layered Pinning Layout (Fixed Coordinates)
 */
const DesktopJourneyFlow = ({ layers }: { layers: any[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current || layers.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${(layers.length + 0.5) * 80}%`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        layersRef.current.forEach((layer, i) => {
            if (!layer) return;
            if (i > 0) {
                gsap.set(layer, { yPercent: 100 });
                tl.to(layer, {
                    yPercent: 0,
                    duration: 1,
                    ease: "none"
                }, ">");
            }

            // Elements Entrance
            const surface = layer.querySelector(".architecture-surface");
            const nodes = layer.querySelectorAll(".group\\/node");
            const edges = layer.querySelectorAll(".cinematic-edge");

            if (i > 0) {
                if (surface) {
                    tl.fromTo(surface,
                        { rotateX: 10, translateZ: -100, opacity: 0 },
                        { rotateX: 0, translateZ: 0, opacity: 1, duration: 0.8 },
                        "-=0.6"
                    );
                }
                if (nodes.length) {
                    tl.fromTo(nodes,
                        { scale: 0.8, opacity: 0 },
                        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5 },
                        "-=0.4"
                    );
                }
            }
        });

    }, { scope: containerRef, dependencies: [layers] });

    return (
        <div ref={containerRef} className="relative w-full h-[110vh] overflow-hidden">
            {layers.map((layer, index) => (
                <div
                    key={layer.id}
                    ref={(el) => { layersRef.current[index] = el; }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    style={{
                        zIndex: index * 10,
                        backgroundColor: '#09090b',
                        boxShadow: index > 0 ? '0 -50px 100px rgba(0,0,0,0.9)' : 'none'
                    }}
                >
                    <div className="relative w-full max-w-[1400px] h-full flex flex-col justify-center px-12 pt-12">
                        <div className="relative w-full h-[70vh] min-h-[600px] architecture-surface rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)]">

                            {/* SVG Edges */}
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

                            {/* Nodes */}
                            <div className="absolute inset-0">
                                {layer.nodes.map((node: any) => (
                                    <JourneyNode key={node.id} node={node} />
                                ))}
                            </div>

                            {/* Title Component inside the surface */}
                            <div className="absolute top-12 left-12">
                                <span className="text-xs font-mono font-bold text-[#13F584] tracking-[0.3em] uppercase mb-2 block">
                                    Stage {['One', 'Two', 'Three', 'Four', 'Five'][index] || index + 1}
                                </span>
                                <h4 className="text-5xl font-bold text-white tracking-tighter">
                                    {layer.title}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const UserJourney = ({ productSlug = "ai-framework" }: { productSlug?: string }) => {
    const journeyData = useMemo(() => PRODUCT_JOURNEYS[productSlug] || PRODUCT_JOURNEYS["ai-framework"], [productSlug]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <Section className="relative w-full" padding="md">
            <style jsx global>{`
                @keyframes flow-pulse {
                    0% { stroke-dashoffset: 100; opacity: 0.2; }
                    50% { opacity: 0.8; }
                    100% { stroke-dashoffset: 0; opacity: 0.2; }
                }
                .animate-flow-pulse { animation: flow-pulse 3s linear infinite; }
                .shadow-glow { filter: drop-shadow(0 0 8px #13F584); }
                .hover-scan-line { animation: scan 2s linear infinite; }
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(500%); }
                }
            `}</style>

            <div className="w-full mx-auto px-0 mb-10">
                <SectionHeader
                    title={journeyData.journeyTitle || "System Architecture"}
                    subtitle={journeyData.journeySubtitle}
                    badge="Architecture"
                    badgeIcon={Workflow}
                    animate={true}
                    titleClassName="text-4xl md:text-5xl lg:text-7xl"
                    subtitleClassName="text-base md:text-xl text-white/50 max-w-2xl"
                />
            </div>

            {isMobile ? (
                <MobileJourneyFlow layers={journeyData.layers} />
            ) : (
                <DesktopJourneyFlow layers={journeyData.layers} />
            )}
        </Section>
    );
};
