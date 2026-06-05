"use client";

import { useEffect, useRef } from "react";
import { getViewportPerformanceProfile } from "@/lib/utils/performance-utils";

const STANDARD_STAR_COUNT = 800;
const LARGE_DISPLAY_STAR_COUNT = 300;
const LARGE_DISPLAY_MAX_WIDTH = 1920;
const LARGE_DISPLAY_MAX_HEIGHT = 1080;

export function useStarWarp() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; o: number }[] = [];
        let width = 0;
        let height = 0;
        let starCount = STANDARD_STAR_COUNT;

        const initStars = () => {
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width,
                    o: Math.random(),
                });
            }
        };

        const resize = () => {
            const profile = getViewportPerformanceProfile();
            const scale = profile.isLargeDisplay
                ? Math.min(
                    1,
                    LARGE_DISPLAY_MAX_WIDTH / Math.max(window.innerWidth, 1),
                    LARGE_DISPLAY_MAX_HEIGHT / Math.max(window.innerHeight, 1),
                )
                : 1;

            width = Math.round(window.innerWidth * scale);
            height = Math.round(window.innerHeight * scale);
            starCount = profile.isLargeDisplay ? LARGE_DISPLAY_STAR_COUNT : STANDARD_STAR_COUNT;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.addEventListener("resize", resize);
        resize();

        if (prefersReduced) {
            return () => window.removeEventListener("resize", resize);
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;
            const speed = 2.5;

            stars.forEach((star) => {
                star.z -= speed;

                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                const x = cx + (star.x / star.z) * width;
                const y = cy + (star.y / star.z) * height;

                const trailLength = speed * 5;
                const px = cx + (star.x / (star.z + trailLength)) * width;
                const py = cy + (star.y / (star.z + trailLength)) * height;

                const opacity = (1 - star.z / width);

                if (x >= 0 && x < width && y >= 0 && y < height) {
                    const edgeThreshold = height * 0.45;
                    let edgeOpacity = 1;
                    if (y < edgeThreshold) {
                        edgeOpacity = y / edgeThreshold;
                    } else if (y > height - edgeThreshold) {
                        edgeOpacity = (height - y) / edgeThreshold;
                    }

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(19, 245, 132, ${opacity * edgeOpacity})`;
                    ctx.lineWidth = (1 - star.z / width) * 3;
                    ctx.lineCap = "round";
                    ctx.moveTo(x, y);
                    ctx.lineTo(px, py);
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        // Only animate while the canvas is visible in the viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!animationFrameId) draw();
                } else {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = 0;
                }
            },
            { threshold: 0 }
        );
        observer.observe(canvas);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return { canvasRef };
}
