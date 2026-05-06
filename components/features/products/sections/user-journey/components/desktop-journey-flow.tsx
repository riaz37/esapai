import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { CinematicEdge } from "./cinematic-edge";
import { JourneyNode } from "./journey-node";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

type JourneyNodeData = {
    id: string;
    position: { x: number; y: number };
    data: {
        image?: string;
        title?: string;
        icon?: React.ReactElement;
    } & Record<string, unknown>;
};

type JourneyLayerData = {
    id: string;
    title: string;
    nodes: JourneyNodeData[];
    edges: { id: string; source: string; target: string }[];
};

/**
 * DESKTOP VIEW: Layered Pinning Layout (Fixed Coordinates)
 */
export const DesktopJourneyFlow = ({
    layers,
    stages,
    isRTL
}: {
    layers: JourneyLayerData[],
    stages: string[],
    isRTL: boolean
}) => {
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
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
                    style={{
                        zIndex: index * 10
                    }}
                >
                    <div className="relative w-full max-w-[1400px] h-full flex flex-col justify-center px-6 md:px-12 pt-12">
                        <Card className="relative w-full h-[70vh] min-h-[600px] architecture-surface" spotlight={true}>

                            {/* SVG Edges */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                viewBox="0 0 1400 600"
                                preserveAspectRatio="none"
                                style={isRTL ? { transform: "scaleX(-1)" } : undefined}
                            >
                                {layer.edges.map((edge) => {
                                    const sourceNode = layer.nodes.find((n) => n.id === edge.source);
                                    const targetNode = layer.nodes.find((n) => n.id === edge.target);
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
                                {layer.nodes.map((node) => (
                                    <JourneyNode key={node.id} node={node} isRTL={isRTL} />
                                ))}
                            </div>

                            {/* Title Component inside the surface */}
                            <div className="absolute top-8 start-8 md:top-12 md:start-12">
                                <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                                    {stages[index] ?? `Stage ${index + 1}`}
                                </span>
                                <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                                    {layer.title}
                                </h4>
                            </div>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    );
};
