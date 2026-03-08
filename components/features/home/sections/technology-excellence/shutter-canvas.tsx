"use client";

import React, { useRef, useEffect, useMemo } from "react";

interface ShutterCanvasProps {
    side: "left" | "right";
    progress: number; // 0 to 1
    frameCount?: number;
    className?: string;
}

export const ShutterCanvas: React.FC<ShutterCanvasProps> = ({
    side,
    progress,
    frameCount = 169,
    className
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Generate frame paths
    const framePaths = useMemo(() => {
        return Array.from({ length: frameCount }, (_, i) => {
            const frameNum = (i + 1).toString().padStart(3, "0");
            return `/assets/shutter/${side}/frame_${frameNum}.png`;
        });
    }, [side, frameCount]);

    // Preload images
    useEffect(() => {
        imagesRef.current = framePaths.map((path) => {
            const img = new Image();
            img.src = path;
            return img;
        });
    }, [framePaths]);

    // Draw frame on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate which frame to show
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
        );

        const img = imagesRef.current[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
            // Handle DPI scaling
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw image with cover behavior
            const imgAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = canvas.width / canvas.height;

            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasAspect > imgAspect) {
                drawHeight = canvas.width / imgAspect;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgAspect;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    }, [progress, frameCount]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: "100%", height: "100%", display: "block" }}
        />
    );
};
