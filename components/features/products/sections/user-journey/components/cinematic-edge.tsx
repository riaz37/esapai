import React from "react";

const PRIMARY = "var(--color-primary)";

/**
 * Lightweight SVG Edge Renderer for Desktop
 */
export const CinematicEdge = ({
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
