"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, ButtonArrow } from "@/components/ui/button";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface CTASectionProps {
    title?: React.ReactNode;
    subtitle?: string;
    /** When provided (e.g. on product page), title/subtitle are derived from product. */
    product?: Product | null;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
}

const defaultTitle = (
    <>
        <span className="text-white">Ready to Transform </span>
        <span className="text-primary">Your Business?</span>
    </>
);
const defaultSubtitle = "Join hundreds of enterprises leveraging AI-powered automation to drive growth, efficiency, and innovation.";

export function CTASection({
    title: titleProp,
    subtitle: subtitleProp,
    product,
    primaryButtonText,
    primaryButtonHref = "/contact",
    secondaryButtonText = "Explore Products",
    secondaryButtonHref = "/products",
}: CTASectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const primaryButtonRef = useRef<HTMLAnchorElement>(null);

    const title = titleProp ?? (product
        ? (
            <>
                <span className="text-white">Ready to try </span>
                <span className="text-primary">{product.name}</span>
                <span className="text-white">?</span>
            </>
        )
        : defaultTitle);
    const subtitle = subtitleProp ?? (product?.content?.mission?.subtitle ?? defaultSubtitle);

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
            // Clear with trail effect - matching site background exactly (#09090b)
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Constant slow warp speed for smooth, consistent animation
            const speed = 2.5;

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
                    // Calculate edge fade
                    // Increased threshold to 45% for an even smoother blend
                    const edgeThreshold = height * 0.45;
                    let edgeOpacity = 1;
                    if (y < edgeThreshold) {
                        edgeOpacity = y / edgeThreshold;
                    } else if (y > height - edgeThreshold) {
                        edgeOpacity = (height - y) / edgeThreshold;
                    }

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(19, 245, 132, ${opacity * edgeOpacity})`; // Primary green color
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

        const container = sectionRef.current.querySelector(".container");
        const children = container?.querySelectorAll("h2, p, .flex > *");

        if (children) {
            gsap.fromTo(children,
                {
                    opacity: 0,
                    y: 40,
                    scale: 0.9,
                    filter: "blur(10px)"
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }
            );
        }

        // Subtle glow pulse on primary button (no continuous motion if reduced motion)
        if (!prefersReducedMotion() && primaryButtonRef.current) {
            gsap.to(primaryButtonRef.current, {
                boxShadow: "0 0 25px rgba(19,245,132,0.4)",
                duration: 2,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1,
            });
        }
    }, { scope: sectionRef });



    return (
        <section
            ref={sectionRef}
            // Seamless blend: Using mask-image for the smoothest possible edge blending
            className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-transparent"
            style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
        >
            {/* Canvas Background - z-0 */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 w-full h-full block"
            />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-8 md:mb-10 max-w-2xl mx-auto tracking-tight">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Button
                            variant="primary"
                            size="lg"
                            className="shadow-[0_0_20px_rgba(19,245,132,0.3)]"
                            asChild
                        >
                            <Link ref={primaryButtonRef} href={primaryButtonHref} className="inline-flex items-center gap-2 group">
                                <span>{primaryButtonText ?? (product ? "Get Started" : "Start Building Now")}</span>
                                <ButtonArrow />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            asChild
                        >
                            <Link href={secondaryButtonHref}>
                                {secondaryButtonText}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>


        </section>
    );
}
