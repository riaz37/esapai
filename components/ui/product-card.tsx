"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Button, ButtonArrow } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { OptimizedVideo } from "@/components/ui/optimized-video";



interface ProductCardProps {
    product: Product;
    index: number;
    videoRef?: (el: HTMLVideoElement | null) => void;
    className?: string;
}

export function ProductCard({ product, index: _index, videoRef: _videoRef, className }: ProductCardProps) {
    const t = useTranslations("Home.showcase");
    const cardRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);

    const _iconSrc = product.icon ?? product.content?.hero?.centerIcon;
    const _iconAlt = product.content?.hero?.centerIconAlt ?? `${product.name} icon`;

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        // Magnetic Button
        if (buttonRef.current) {
            const btnRect = buttonRef.current.getBoundingClientRect();
            const btnX = e.clientX - btnRect.left - btnRect.width / 2;
            const btnY = e.clientY - btnRect.top - btnRect.height / 2;

            // Only apply magnetic if close enough
            const dist = Math.sqrt(btnX * btnX + btnY * btnY);
            if (dist < 120) {
                gsap.to(buttonRef.current, {
                    x: btnX * 0.45,
                    y: btnY * 0.45,
                    duration: 0.3,
                });
            } else {
                gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.6 });
            }
        }
    };

    const onMouseLeave = () => {
        gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.6 });
    };

    return (
        <div
            className="h-full w-full"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <Card
                ref={cardRef}
                className={cn(
                    "h-full overflow-hidden transition-all duration-500 group relative will-change-transform",
                    className
                )}
            >
                {/* Cinematic Sheen Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine pointer-events-none" />

                <div className="relative h-full flex flex-col md:flex-row items-center p-6 sm:p-8 md:p-12 gap-6 md:gap-12 z-10">

                    {/* Left Side: Content */}
                    <div className="flex-1 text-start space-y-4 z-10">
                        <div className="space-y-2">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight">
                                {t(`products.${product.id}.name`)}
                            </h3>
                        </div>

                        <p className="text-base md:text-lg text-gray-400 font-normal leading-relaxed max-w-lg">
                            {t(`products.${product.id}.description`)}
                        </p>

                        <div ref={buttonRef} className="inline-block mt-2 md:mt-8">
                            <Button variant="primary" size="default" asChild>
                                <Link href={`/product/${product.slug}`} className="inline-flex items-center gap-2 group/link">
                                    <span>{t("explore")}</span>
                                    <ButtonArrow className="ms-0" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 relative w-full h-[280px] sm:h-[320px] md:h-full flex items-center justify-center">
                        <div className="relative w-full h-full bg-white/[0.02] rounded-2xl overflow-hidden flex items-center justify-center z-20 backdrop-blur-sm border border-white/5">
                            {product.content?.hero?.demoVideo ? (
                                <div className="relative w-full h-full">
                                    <OptimizedVideo
                                        src={product.content.hero.demoVideo}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay for cinematic feel */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                                </div>
                            ) : (
                                // Fallback UI
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div className="flex justify-between items-start opacity-40">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20">
                                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent translate-x-1"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 opacity-30">
                                        <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                        <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
}
