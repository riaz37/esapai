"use client";

import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { getViewportPerformanceProfile } from "@/lib/utils/performance-utils";

interface ShutterCanvasProps {
    side: "left" | "right";
    frameCount?: number;
    className?: string;
}

export interface ShutterCanvasHandle {
    setFrame: (progress: number) => void;
}

const LARGE_DISPLAY_MAX_CANVAS_WIDTH = 2048;
const LARGE_DISPLAY_MAX_CANVAS_HEIGHT = 1152;

export const ShutterCanvas = React.forwardRef<ShutterCanvasHandle, ShutterCanvasProps>(({
    side,
    frameCount = 169,
    className
}, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bitmapsRef = useRef<(ImageBitmap | null)[]>([]);
    const lastFrameIndexRef = useRef<number>(-1);
    const desiredProgressRef = useRef<number>(0);
    const isLoadingRef = useRef<boolean>(true);

    // Generate frame paths
    const framePaths = useMemo(() => {
        return Array.from({ length: frameCount }, (_, i) => {
            const frameNum = (i + 1).toString().padStart(3, "0");
            // Support both png and webp (assuming they might be converted)
            return `/assets/shutter/${side}/frame_${frameNum}.webp`;
        });
    }, [side, frameCount]);

    const priorityFrameIndices = useMemo(() => {
        const openingFrameCount = Math.min(12, frameCount);
        const spreadFrameCount = Math.min(8, frameCount);
        const indices = new Set<number>();

        for (let index = 0; index < openingFrameCount; index += 1) {
            indices.add(index);
        }

        for (let index = 0; index < spreadFrameCount; index += 1) {
            const spreadIndex = Math.round((index / Math.max(1, spreadFrameCount - 1)) * (frameCount - 1));
            indices.add(spreadIndex);
        }

        return Array.from(indices).sort((a, b) => a - b);
    }, [frameCount]);

    const resolveFrameIndex = useCallback((targetFrameIndex: number) => {
        const bitmaps = bitmapsRef.current;

        if (bitmaps[targetFrameIndex]) {
            return targetFrameIndex;
        }

        for (let offset = 1; offset < frameCount; offset += 1) {
            const previousIndex = targetFrameIndex - offset;
            if (previousIndex >= 0 && bitmaps[previousIndex]) {
                return previousIndex;
            }

            const nextIndex = targetFrameIndex + offset;
            if (nextIndex < frameCount && bitmaps[nextIndex]) {
                return nextIndex;
            }
        }

        if (lastFrameIndexRef.current >= 0 && bitmaps[lastFrameIndexRef.current]) {
            return lastFrameIndexRef.current;
        }

        return -1;
    }, [frameCount]);

    const drawFrame = useCallback((progress: number) => {
        desiredProgressRef.current = progress;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const targetFrameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(progress * frameCount))
        );
        const resolvedFrameIndex = resolveFrameIndex(targetFrameIndex);
        if (resolvedFrameIndex < 0) return;

        const profile = getViewportPerformanceProfile();
        const dpr = profile.isLargeDisplay ? 1 : Math.min(profile.dpr, 1.5);
        const rect = canvas.getBoundingClientRect();

        const rawWidth = Math.round(rect.width * dpr);
        const rawHeight = Math.round(rect.height * dpr);
        const scale = profile.isLargeDisplay
            ? Math.min(
                1,
                LARGE_DISPLAY_MAX_CANVAS_WIDTH / Math.max(rawWidth, 1),
                LARGE_DISPLAY_MAX_CANVAS_HEIGHT / Math.max(rawHeight, 1),
            )
            : 1;
        const newWidth = Math.round(rawWidth * scale);
        const newHeight = Math.round(rawHeight * scale);

        if (canvas.width !== newWidth || canvas.height !== newHeight) {
            canvas.width = newWidth;
            canvas.height = newHeight;
            lastFrameIndexRef.current = -1;
        }

        if (resolvedFrameIndex === lastFrameIndexRef.current) return;

        const bitmap = bitmapsRef.current[resolvedFrameIndex];
        if (!bitmap) return;

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

        ctx.drawImage(bitmap, Math.round(offsetX), Math.round(offsetY), Math.round(drawWidth), Math.round(drawHeight));
        lastFrameIndexRef.current = resolvedFrameIndex;
    }, [frameCount, resolveFrameIndex]);

    // Preload images as Bitmaps for faster drawing
    useEffect(() => {
        let isMounted = true;
        isLoadingRef.current = true;
        const profile = getViewportPerformanceProfile();
        if (profile.shouldReduceMotion) {
            isLoadingRef.current = false;
            return () => { isMounted = false; };
        }

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
        if (isIOS) return () => { isMounted = false; };

        const loadImages = async () => {
            const bitmaps: (ImageBitmap | null)[] = new Array(frameCount).fill(null);
            const loadFrame = async (frameIndex: number) => {
                if (bitmaps[frameIndex]) return;

                const path = framePaths[frameIndex];

                try {
                    const response = await fetch(path);
                    const blob = await response.blob();
                    bitmaps[frameIndex] = await createImageBitmap(blob);
                } catch (e) {
                    console.error(`Failed to load frame: ${path}`, e);
                }
            };

            // Prime both the opening motion and later pinned states with representative frames.
            await Promise.all(priorityFrameIndices.map((frameIndex) => loadFrame(frameIndex)));

            if (!isMounted) return;
            bitmapsRef.current = bitmaps;
            isLoadingRef.current = false;

            // Draw initial frame after a short delay to ensure canvas dimensions are settled
            setTimeout(() => {
                if (isMounted) drawFrame(0);
            }, 100);

            // 2. Load the rest progressively so we don't block the main thread
            const remainingFrameIndices = Array.from({ length: frameCount }, (_, index) => index)
                .filter((index) => !priorityFrameIndices.includes(index));
            let currentIndex = 0;
            const chunkSize = 20;

            const loadNextChunk = async () => {
                if (!isMounted || currentIndex >= remainingFrameIndices.length) return;

                const end = Math.min(currentIndex + chunkSize, remainingFrameIndices.length);
                const chunkPromises = remainingFrameIndices
                    .slice(currentIndex, end)
                    .map((frameIndex) => loadFrame(frameIndex));

                await Promise.all(chunkPromises);
                currentIndex = end;

                if (!isMounted) return;
                drawFrame(desiredProgressRef.current);

                // Schedule the next chunk
                if (typeof window.requestIdleCallback === "function") {
                    window.requestIdleCallback(() => loadNextChunk());
                } else {
                    setTimeout(loadNextChunk, 50);
                }
            };

            // Start background loading
            loadNextChunk();
        };

        loadImages();
        return () => {
            isMounted = false;
            bitmapsRef.current.forEach(bm => bm?.close());
            bitmapsRef.current = [];
        };
    }, [drawFrame, frameCount, framePaths, priorityFrameIndices]);

    // Auto-redraw on resize
    useEffect(() => {
        const handleResize = () => {
            if (!isLoadingRef.current && bitmapsRef.current.length > 0) {
                lastFrameIndexRef.current = -1;
                drawFrame(desiredProgressRef.current);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [drawFrame, frameCount]);

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
