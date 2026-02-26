"use client";

import { useMemo, useId, useEffect } from "react";
import React from "react";

import ReactFlow, {
  Node,
  Edge,
  ConnectionMode,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Layers } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

import type { ServiceFeaturesProps, FeatureBlockProps } from "@/types/props";

// Custom Central Node Component
function CentralNode({ data }: { data: { label: string } }) {
  return (
    <Card className="min-w-[180px] md:min-w-[200px] p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center">
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <div className="w-20 h-20 mb-4 flex items-center justify-center">
          <CentralNodeIcon />
        </div>
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-radial-white text-center">
          {data.label}
        </CardTitle>
      </div>
    </Card>
  );
}

// Custom Feature Node Component
function FeatureNode({ data }: { data: FeatureBlockProps }) {
  return (
    <Card className="min-w-[240px] sm:min-w-[260px] max-w-[300px] sm:max-w-[320px] p-5 sm:p-6 md:p-7 lg:p-8">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: "rgba(19, 245, 132, 0.8)" }}
      />
      <div className="pointer-events-none">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gradient-radial-white">
          {data.title}
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-light-gray-90 leading-relaxed">
          {data.description}
        </CardDescription>
      </div>
    </Card>
  );
}

function CentralNodeIcon() {
  const uniqueId = useId();

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-90"
    >
      <defs>
        <filter id={uniqueId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`gradient-${uniqueId}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(19, 245, 132, 1)" />
          <stop offset="100%" stopColor="rgba(19, 245, 132, 0.3)" />
        </radialGradient>
      </defs>

      <circle
        cx="40"
        cy="40"
        r="35"
        stroke="rgba(19, 245, 132, 0.6)"
        strokeWidth="2"
        fill="none"
        filter={`url(#${uniqueId})`}
      />
      <circle
        cx="40"
        cy="40"
        r="25"
        stroke="rgba(19, 245, 132, 0.7)"
        strokeWidth="2"
        fill="none"
        filter={`url(#${uniqueId})`}
      />
      <circle
        cx="40"
        cy="40"
        r="15"
        stroke="rgba(19, 245, 132, 0.8)"
        strokeWidth="2"
        fill="none"
        filter={`url(#${uniqueId})`}
      />
      <circle
        cx="40"
        cy="40"
        r="8"
        fill={`url(#gradient-${uniqueId})`}
        filter={`url(#${uniqueId})`}
      />
    </svg>
  );
}

const nodeTypes = {
  central: CentralNode,
  feature: FeatureNode,
};

function ConnectionDotsMarkers() {
  useEffect(() => {
    const addMarkers = () => {
      const svg = document.querySelector('.service-features-flow svg');
      if (!svg) return;
      if (svg.querySelector('#connection-dot-start')) return;

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

      const markerStart = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
      markerStart.setAttribute('id', 'connection-dot-start');
      markerStart.setAttribute('markerWidth', '8');
      markerStart.setAttribute('markerHeight', '8');
      markerStart.setAttribute('refX', '4');
      markerStart.setAttribute('refY', '4');
      markerStart.setAttribute('markerUnits', 'userSpaceOnUse');

      const circleStart = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circleStart.setAttribute('cx', '4');
      circleStart.setAttribute('cy', '4');
      circleStart.setAttribute('r', '3');
      circleStart.setAttribute('fill', 'rgba(19, 245, 132, 0.8)');
      circleStart.setAttribute('stroke', 'rgba(19, 245, 132, 1)');
      circleStart.setAttribute('stroke-width', '2');
      markerStart.appendChild(circleStart);

      const markerEnd = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
      markerEnd.setAttribute('id', 'connection-dot-end');
      markerEnd.setAttribute('markerWidth', '8');
      markerEnd.setAttribute('markerHeight', '8');
      markerEnd.setAttribute('refX', '4');
      markerEnd.setAttribute('refY', '4');
      markerEnd.setAttribute('markerUnits', 'userSpaceOnUse');

      const circleEnd = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circleEnd.setAttribute('cx', '4');
      circleEnd.setAttribute('cy', '4');
      circleEnd.setAttribute('r', '3');
      circleEnd.setAttribute('fill', 'rgba(19, 245, 132, 0.8)');
      circleEnd.setAttribute('stroke', 'rgba(19, 245, 132, 1)');
      circleEnd.setAttribute('stroke-width', '2');
      markerEnd.appendChild(circleEnd);

      defs.appendChild(markerStart);
      defs.appendChild(markerEnd);
      svg.insertBefore(defs, svg.firstChild);
    };

    addMarkers();
    const timeout = setTimeout(addMarkers, 100);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}

export function ServiceFeatures({
  title = "Protect your organization from any threat",
  subtitle = "Security AI Platform to Protect the Entire Enterprise. Break Down Security. Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.",
  badge,
  centralNode,
  features = [],
}: ServiceFeaturesProps) {
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
  }, [features]);

  return (
    <Section padding="md" className="scroll-mt-20 md:scroll-mt-32">
      <SectionHeader
        badge={badge ?? ""}
        badgeIcon={Layers}
        title={title}
        subtitle={subtitle}
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
