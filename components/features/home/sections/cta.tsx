"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface CTASectionProps {
    title?: string;
    subtitle?: string;
    /** When provided (e.g. on product page), title/subtitle are derived from product. */
    product?: Product | null;
    primaryButtonText?: string;
    primaryButtonHref?: string;
}

export function CTASection({
    title: titleProp,
    subtitle: subtitleProp,
    product,
    primaryButtonText,
    primaryButtonHref = "/contact",
}: CTASectionProps) {
    const t = useTranslations("CTA");
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const primaryButtonRef = useRef<HTMLAnchorElement>(null);

    const title = titleProp ?? (product?.content?.cta?.title
        ?? (product ? t("productFallbackTitle", { name: product.name }) : t("title")));
    const subtitle = subtitleProp ?? (product?.content?.cta?.subtitle
        ?? product?.content?.mission?.subtitle ?? t("subtitle"));
    const displayPrimaryButtonText = primaryButtonText
        || product?.content?.cta?.buttonText
        || (product ? t("productFallbackButton") : t("button"));

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
            // Clear the canvas completely for a fully transparent background blending
            ctx.clearRect(0, 0, width, height);

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

                // Calculate trail (previous position)
                const trailLength = speed * 5;
                const px = cx + (star.x / (star.z + trailLength)) * width;
                const py = cy + (star.y / (star.z + trailLength)) * height;

                // Calculate size and brightness based on depth (z)
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


    }, { scope: sectionRef });



    return (
        <Section
            ref={sectionRef}
            padding="md"
            background="transparent"
            withContainer={false}
            // Seamless blend: Using mask-image for the smoothest possible edge blending
            className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden"
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
            <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-center">
                <div className="max-w-[1400px] mx-auto">

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight mb-4 md:mb-6">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white/70 leading-relaxed max-w-3xl tracking-tight mx-auto mb-8 md:mb-10">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Button
                            variant="primary"
                            size="default"
                            asChild
                        >
                            <Link href={primaryButtonHref} className="inline-flex items-center gap-2 group">
                                <span>{displayPrimaryButtonText}</span>
                                <ButtonArrow size="default" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>


        </Section>
    );
}
