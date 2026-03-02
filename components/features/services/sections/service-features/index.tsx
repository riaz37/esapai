"use client";

import { useMemo } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import ReactFlow, {
    Node,
    Edge,
    ConnectionMode,
} from "reactflow";
import "reactflow/dist/style.css";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Layers } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

import type { ServiceFeaturesProps } from "@/types/props";
import { ConnectionDotsMarkers } from "./flow-utils";
import { CentralNode, FeatureNode } from "./feature-nodes";

const nodeTypes = {
    central: CentralNode,
    feature: FeatureNode,
};

export function ServiceFeatures({
    title,
    subtitle,
    badge,
    centralNode,
    features = [],
}: ServiceFeaturesProps) {
    const t = useTranslations("Service.features");
    const resolvedTitle = title ?? t("defaultTitle");
    const resolvedSubtitle = subtitle ?? t("defaultSubtitle");
    const displayFeatures = features.slice(0, 5);

    const { nodes, edges } = useMemo(() => {
        const nodesList: Node[] = [];
        const edgesList: Edge[] = [];

        const centerX = typeof window !== 'undefined' && window.innerWidth >= 1280 ? 600 : 500;
        const centerY = typeof window !== 'undefined' && window.innerWidth >= 1280 ? 450 : 400;

        nodesList.push({
            id: "central",
            type: "central",
            position: { x: centerX - 100, y: centerY - 100 },
            data: { label: centralNode ?? "Core Service" },
            draggable: false,
        });

        const positions = [
            { x: centerX - 420, y: centerY - 320, angle: -Math.PI / 4 },
            { x: centerX + 280, y: centerY - 340, angle: Math.PI / 4 },
            { x: centerX + 450, y: centerY + 40, angle: 0 },
            { x: centerX + 220, y: centerY + 350, angle: Math.PI / 3 },
            { x: centerX - 380, y: centerY + 300, angle: -Math.PI / 2 },
        ];

        displayFeatures.forEach((feature, index) => {
            const pos = positions[index] || {
                x: centerX + 420 * Math.cos((index * 2 * Math.PI) / displayFeatures.length),
                y: centerY + 420 * Math.sin((index * 2 * Math.PI) / displayFeatures.length),
                angle: (index * 2 * Math.PI) / displayFeatures.length,
            };

            const nodeId = `feature-${index}`;

            nodesList.push({
                id: nodeId,
                type: "feature",
                position: { x: pos.x - 125, y: pos.y - 100 },
                data: feature,
                draggable: false,
            });

            edgesList.push({
                id: `edge-central-${index}`,
                source: "central",
                target: nodeId,
                type: "bezier",
                animated: true,
                style: {
                    stroke: "rgba(19, 245, 132, 0.6)",
                    strokeWidth: 2.5,
                },
            });

            if (index < displayFeatures.length - 1) {
                edgesList.push({
                    id: `edge-${index}-${index + 1}`,
                    source: nodeId,
                    target: `feature-${index + 1}`,
                    type: "bezier",
                    animated: true,
                    style: {
                        stroke: "rgba(19, 245, 132, 0.5)",
                        strokeWidth: 2,
                    },
                });
            }

            if (index === 0 && displayFeatures.length > 2) {
                edgesList.push({
                    id: `edge-0-${displayFeatures.length - 1}`,
                    source: nodeId,
                    target: `feature-${displayFeatures.length - 1}`,
                    type: "bezier",
                    animated: true,
                    style: {
                        stroke: "rgba(19, 245, 132, 0.5)",
                        strokeWidth: 2,
                    },
                });
            }

            if (index < displayFeatures.length - 2) {
                edgesList.push({
                    id: `edge-${index}-${index + 2}`,
                    source: nodeId,
                    target: `feature-${index + 2}`,
                    type: "bezier",
                    animated: false,
                    style: {
                        stroke: "rgba(19, 245, 132, 0.35)",
                        strokeWidth: 1.5,
                        strokeDasharray: "4,4",
                    },
                });
            }
        });

        return { nodes: nodesList, edges: edgesList };
    }, [features, centralNode, displayFeatures]);

    return (
        <Section padding="md" className="scroll-mt-20 md:scroll-mt-32">
            <SectionHeader
                badge={badge ?? ""}
                badgeIcon={Layers}
                title={resolvedTitle}
                subtitle={resolvedSubtitle}
                subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4"
            />

            {/* Mobile/Tablet View - Vertically Stacked Cards */}
            <div className="block lg:hidden max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col gap-4">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="p-4 sm:p-5 md:p-6"
                        >
                            <CardTitle className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gradient-radial-white">
                                {feature.title}
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm md:text-base text-light-gray-90 leading-relaxed">
                                {feature.description}
                            </CardDescription>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Desktop View - Interactive Graph */}
            <div className="hidden lg:block relative w-full h-[600px] lg:h-[700px] xl:h-[800px] max-w-[1400px] mx-auto service-features-flow">
                <ConnectionDotsMarkers />
                <style>{`
          .service-features-flow { touch-action: pan-y; }
          .service-features-flow .react-flow__viewport { pointer-events: none; }
          .service-features-flow .react-flow__pane { cursor: default; }
          .service-features-flow .react-flow__edge-path {
            stroke: rgba(19, 245, 132, 0.6);
            stroke-width: 2;
          }
          .service-features-flow .react-flow__edge.selected .react-flow__edge-path {
            stroke: rgba(19, 245, 132, 0.9);
          }
          .service-features-flow .react-flow__edge.animated .react-flow__edge-path {
            filter: drop-shadow(0 0 3px rgba(19, 245, 132, 0.5));
          }
          .service-features-flow .react-flow__handle {
            opacity: 0;
            pointer-events: auto;
            width: 0;
            height: 0;
          }
          .service-features-flow .react-flow__edge-path {
            marker-start: url(#connection-dot-start);
            marker-end: url(#connection-dot-end);
          }
          .service-features-flow .react-flow__node { pointer-events: auto; }
          .service-features-flow .react-flow__controls {
            display: none !important;
          }
          .service-features-flow .react-flow__minimap,
          .service-features-flow .react-flow__attribution {
            display: none !important;
          }
        `}</style>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    connectionMode={ConnectionMode.Loose}
                    fitView
                    fitViewOptions={{
                        padding: 0.15,
                        maxZoom: 0.8,
                        minZoom: 0.6,
                    }}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    elementsSelectable={false}
                    panOnDrag={[1, 2]}
                    panOnScroll={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    preventScrolling={false}
                    className="bg-transparent"
                />
            </div>
        </Section>
    );
}
