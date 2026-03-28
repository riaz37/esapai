"use client";

import React from "react";
import ReactFlow, { ConnectionMode, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { CentralNode, FeatureNode } from "./feature-nodes";
import { ConnectionDotsMarkers } from "./flow-utils";

const nodeTypes = {
    central: CentralNode,
    feature: FeatureNode,
};

interface FlowContainerProps {
    nodes: Node[];
    edges: Edge[];
}

export function FlowContainer({ nodes, edges }: FlowContainerProps) {
    return (
        <div className="relative w-full h-[600px] lg:h-[700px] xl:h-[800px] max-w-[1400px] mx-auto service-features-flow">
            <ConnectionDotsMarkers />
            <style>{`
                .service-features-flow { touch-action: pan-y; }
                .service-features-flow .react-flow__viewport { pointer-events: none; }
                .service-features-flow .react-flow__pane { cursor: default; }
                .service-features-flow .react-flow__edge-path {
                    stroke: color-mix(in srgb, var(--color-primary) 60%, transparent);
                    stroke-width: 2;
                }
                .service-features-flow .react-flow__edge.selected .react-flow__edge-path {
                    stroke: color-mix(in srgb, var(--color-primary) 90%, transparent);
                }
                .service-features-flow .react-flow__edge.animated .react-flow__edge-path {
                    filter: drop-shadow(0 0 3px color-mix(in srgb, var(--color-primary) 50%, transparent));
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
    );
}
