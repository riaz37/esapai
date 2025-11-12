"use client";

import { useMemo, useId, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  ConnectionMode,
  Handle,
  Position,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

interface FeatureBlockProps {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  features: FeatureBlockProps[];
}

// Custom Central Node Component
function CentralNode({ data }: { data: { label: string } }) {
  return (
    <div className="relative product-card p-8 md:p-10 min-w-[200px] group">
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
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 mb-4 flex items-center justify-center">
          <CentralNodeIcon />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gradient-radial-white text-center">
          {data.label}
        </h3>
      </div>
      <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-[32px] shadow-glow-primary-feature" />
      </div>
    </div>
  );
}

// Custom Feature Node Component
function FeatureNode({ data }: { data: FeatureBlockProps }) {
  return (
    <div className="relative product-card p-6 md:p-8 min-w-[250px] max-w-[300px] group">
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
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-radial-white">
        {data.title}
      </h3>
      <p className="text-base md:text-lg text-light-gray-90 leading-relaxed">
        {data.description}
      </p>
      <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-[32px] shadow-glow-primary-feature" />
      </div>
    </div>
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

// Component to add SVG markers for connection dots
function ConnectionDotsMarkers() {
  useEffect(() => {
    // Find the React Flow SVG and add marker definitions
    const addMarkers = () => {
      const svg = document.querySelector('.service-features-flow svg');
      if (!svg) return;

      // Check if markers already exist
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

    // Try to add markers immediately and also after a short delay
    addMarkers();
    const timeout = setTimeout(addMarkers, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  return null;
}

export function ServiceFeatures({
  title = "Protect your organization from any threat",
  subtitle = "Security AI Platform to Protect the Entire Enterprise. Break Down Security. Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.",
  features,
}: ServiceFeaturesProps) {
  const displayFeatures = features.slice(0, 5);

  // Calculate positions for network/web structure
  const { nodes, edges } = useMemo(() => {
    const nodesList: Node[] = [];
    const edgesList: Edge[] = [];

    // Central node at the center
    const centerX = 600;
    const centerY = 400;
    
    nodesList.push({
      id: "central",
      type: "central",
      position: { x: centerX - 100, y: centerY - 100 },
      data: { label: "Core Service" },
      draggable: false,
    });

    // Create an organic, dynamic layout - not just a circle
    // Mix of radial and offset positions for more visual interest
    const positions = [
      // Top-left area
      { x: centerX - 450, y: centerY - 300, angle: -Math.PI / 4 },
      // Top-right area  
      { x: centerX + 300, y: centerY - 350, angle: Math.PI / 4 },
      // Right area
      { x: centerX + 500, y: centerY + 50, angle: 0 },
      // Bottom-right area
      { x: centerX + 250, y: centerY + 400, angle: Math.PI / 3 },
      // Bottom-left area
      { x: centerX - 400, y: centerY + 350, angle: -Math.PI / 2 },
    ];

    displayFeatures.forEach((feature, index) => {
      const pos = positions[index] || {
        x: centerX + 400 * Math.cos((index * 2 * Math.PI) / displayFeatures.length),
        y: centerY + 400 * Math.sin((index * 2 * Math.PI) / displayFeatures.length),
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

      // Connect central node to each feature with curved bezier edges (web-like)
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

      // Create interconnections between features (web/network effect)
      // Connect each feature to the next one, and some to non-adjacent ones
      if (index < displayFeatures.length - 1) {
        // Connect to next feature
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

      // Connect first to last (closing the web)
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

      // Add some cross-connections for more complexity (skip one)
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
  }, [displayFeatures]);

  return (
    <Section>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
      />

      <div className="relative w-full h-[700px] md:h-[900px] max-w-7xl mx-auto service-features-flow">
        <ConnectionDotsMarkers />
        <style dangerouslySetInnerHTML={{ __html: `
          .service-features-flow {
            touch-action: pan-y;
          }
          .service-features-flow .react-flow__viewport {
            pointer-events: none;
          }
          .service-features-flow .react-flow__pane {
            cursor: default;
          }
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
          .service-features-flow .react-flow__node {
            pointer-events: auto;
          }
          .service-features-flow .react-flow__controls {
            background: rgba(1, 1, 1, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }
          .service-features-flow .react-flow__controls-button {
            background: rgba(19, 245, 132, 0.1);
            border: 1px solid rgba(19, 245, 132, 0.3);
            color: rgba(19, 245, 132, 0.8);
            transition: all 0.2s;
          }
          .service-features-flow .react-flow__controls-button:hover {
            background: rgba(19, 245, 132, 0.2);
            color: rgba(19, 245, 132, 1);
          }
          .service-features-flow .react-flow__minimap,
          .service-features-flow .react-flow__attribution {
            display: none !important;
          }
        `}} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{
            padding: 0.3,
            maxZoom: 1.5,
            minZoom: 0.3,
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={[1, 2]}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={true}
          preventScrolling={false}
          className="bg-transparent"
        >
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </Section>
  );
}

