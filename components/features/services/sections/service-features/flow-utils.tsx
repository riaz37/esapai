"use client";

import { useId, useEffect } from "react";

export function CentralNodeIcon() {
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
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="color-mix(in srgb, var(--color-primary) 30%, transparent)" />
                </radialGradient>
            </defs>

            <circle
                cx="40"
                cy="40"
                r="35"
                stroke="color-mix(in srgb, var(--color-primary) 60%, transparent)"
                strokeWidth="2"
                fill="none"
                filter={`url(#${uniqueId})`}
            />
            <circle
                cx="40"
                cy="40"
                r="25"
                stroke="color-mix(in srgb, var(--color-primary) 70%, transparent)"
                strokeWidth="2"
                fill="none"
                filter={`url(#${uniqueId})`}
            />
            <circle
                cx="40"
                cy="40"
                r="15"
                stroke="color-mix(in srgb, var(--color-primary) 80%, transparent)"
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

export function ConnectionDotsMarkers() {
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
            circleStart.setAttribute('fill', 'color-mix(in srgb, var(--color-primary) 80%, transparent)');
            circleStart.setAttribute('stroke', 'var(--color-primary)');
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
            circleEnd.setAttribute('fill', 'color-mix(in srgb, var(--color-primary) 80%, transparent)');
            circleEnd.setAttribute('stroke', 'var(--color-primary)');
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
