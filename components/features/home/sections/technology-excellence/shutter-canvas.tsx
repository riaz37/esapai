"use client";

import React, { useRef, useEffect, useMemo } from "react";

interface ShutterCanvasProps {
    side: "left" | "right";
    frameCount?: number;
    className?: string;
}

export interface ShutterCanvasHandle {
    setFrame: (progress: number) => void;
}

export const ShutterCanvas = React.forwardRef<ShutterCanvasHandle, ShutterCanvasProps>(({
    side,
    frameCount = 169,
    className
}, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bitmapsRef = useRef<(ImageBitmap | null)[]>([]);
    const lastFrameIndexRef = useRef<number>(-1);
    const isLoadingRef = useRef<boolean>(true);

    // Generate frame paths
    const framePaths = useMemo(() => {
        return Array.from({ length: frameCount }, (_, i) => {
            const frameNum = (i + 1).toString().padStart(3, "0");
            // Support both png and webp (assuming they might be converted)
            return `/assets/shutter/${side}/frame_${frameNum}.png`;
        });
    }, [side, frameCount]);

    // Preload images as Bitmaps for faster drawing
    useEffect(() => {
        let isMounted = true;
        isLoadingRef.current = true;

        const loadImages = async () => {
            const bitmaps = await Promise.all(
                framePaths.map(async (path) => {
                    try {
                        const response = await fetch(path);
                        const blob = await response.blob();
                        return await createImageBitmap(blob);
                    } catch (e) {
                        console.error(`Failed to load frame: ${path}`, e);
                        return null;
                    }
                })
            );

            if (isMounted) {
                bitmapsRef.current = bitmaps;
                isLoadingRef.current = false;
                // Draw initial frame
                drawFrame(0);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, [framePaths]);

    const drawFrame = (progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: disable alpha if possible
        if (!ctx) return;

        // Calculate which frame to show
        const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(progress * frameCount))
        );

        // Avoid redundant draws
        if (frameIndex === lastFrameIndexRef.current) return;

        const bitmap = bitmapsRef.current[frameIndex];
        if (!bitmap) return;

        // Handle DPI scaling
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
        }

        // Draw image with cover behavior
        const imgAspect = bitmap.width / bitmap.height;
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

        // Round coordinates for performance
        ctx.drawImage(bitmap, Math.round(offsetX), Math.round(offsetY), Math.round(drawWidth), Math.round(drawHeight));
        lastFrameIndexRef.current = frameIndex;
    };

    // Expose imperative API
    React.useImperativeHandle(ref, () => ({
        setFrame: (progress: number) => {
            drawFrame(progress);
        }
    }));

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: "100%", height: "100%", display: "block" }}
        />
    );
});

ShutterCanvas.displayName = "ShutterCanvas";
