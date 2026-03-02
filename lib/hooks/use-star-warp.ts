"use client";

import { useEffect, useRef } from "react";

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

        const initStars = () => {
            stars = [];
            for (let i = 0; i < 800; i++) {
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width,
                    o: Math.random(),
                });
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        window.addEventListener("resize", resize);
        resize();

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

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return { canvasRef };
}
