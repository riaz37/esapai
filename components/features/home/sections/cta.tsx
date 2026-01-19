"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import { Button } from "@/components/ui/button";

export function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const isHoveredRef = useRef(false);

    // Sync ref with state
    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    // Star Warp Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; o: number }[] = [];
        let width = 0;
        let height = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const cx = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const cy = 0;

        const initStars = () => {
            stars = [];
            for (let i = 0; i < 800; i++) { // Increased star count
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
            height = window.innerHeight; // Full viewport height for better immersion
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            // Clear with trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Speed factor based on hover
            const targetSpeed = isHoveredRef.current ? 15 : 2;
            const currentSpeed = (stars as any).speed || 2;
            // Smooth speed transition
            (stars as any).speed = currentSpeed + (targetSpeed - currentSpeed) * 0.1;
            const speed = (stars as any).speed;

            stars.forEach((star) => {
                // Move star closer
                star.z -= speed;

                // Reset if behind camera
                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                // Project 3D coordinates to 2D
                const x = cx + (star.x / star.z) * width;
                const y = cy + (star.y / star.z) * height;

                // Calculate size and brightness based on depth (z)
                const size = (1 - star.z / width) * 4;
                const opacity = (1 - star.z / width);

                if (x >= 0 && x < width && y >= 0 && y < height) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(19, 245, 132, ${opacity})`; // Primary green color
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
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

    useGSAP(() => {
        if (!sectionRef.current) return;

        const content = sectionRef.current.querySelector(".container");
        if (content) {
            gsap.fromTo(content,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                    filter: "blur(10px)"
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    ease: "expo.out",
                }
            );
        }
    }, { scope: sectionRef });



    return (
        <section
            ref={sectionRef}
            // Seamless blend: Fully transparent to show global background + Warp on top
            className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-transparent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Canvas Background - z-0 */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 w-full h-full block opacity-80" // Slightly transparent to blend better
                style={{ opacity: 0.8 }}
            />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                        <span className="text-white">Ready to Transform </span>
                        <span className="text-primary">Your Business?</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-8 md:mb-10 max-w-2xl mx-auto tracking-tight">
                        Join hundreds of enterprises leveraging AI-powered automation to drive growth, efficiency, and innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Button
                            variant="primary"
                            size="lg"
                            asChild
                        >
                            <Link href="/contact" className="flex items-center gap-2">
                                Start Building Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                        >
                            <Link href="/products">
                                Explore Products
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>


        </section>
    );
}
