"use client";

import { useMemo } from "react";
import { Node, Edge } from "reactflow";

interface UseServiceFeaturesFlowProps {
    centralNode?: string;
    features: Array<{ title: string; description: string }>;
}

export function useServiceFeaturesFlow({ centralNode, features }: UseServiceFeaturesFlowProps) {
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
            { x: centerX - 420, y: centerY - 320 },
            { x: centerX + 280, y: centerY - 340 },
            { x: centerX + 450, y: centerY + 40 },
            { x: centerX + 220, y: centerY + 350 },
            { x: centerX - 380, y: centerY + 300 },
        ];

        displayFeatures.forEach((feature, index) => {
            const pos = positions[index] || {
                x: centerX + 420 * Math.cos((index * 2 * Math.PI) / displayFeatures.length),
                y: centerY + 420 * Math.sin((index * 2 * Math.PI) / displayFeatures.length),
            };

            const nodeId = `feature-${index}`;

            nodesList.push({
                id: nodeId,
                type: "feature",
                position: { x: pos.x - 125, y: pos.y - 100 },
                data: feature,
                draggable: false,
            });

            // Primary connections from central
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

            // Sequential connections
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

            // Loop back connection
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

            // Secondary mesh connections
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
    }, [centralNode, displayFeatures]);

    return { nodes, edges };
}
