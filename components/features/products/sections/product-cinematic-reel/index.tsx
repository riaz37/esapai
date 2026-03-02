"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useProductCinematicReel } from "@/lib/hooks/use-product-cinematic-reel";

import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Layers } from "lucide-react";
import type { Product } from "@/types/product";


const DEFAULT_REEL_IMAGES = [
    '/productimages/Slide-22.png',
    '/productimages/Slide-23.png',
    '/productimages/Slide-24.png',
];



interface ProductCinematicReelSectionProps {
    product: Product | null;
}

export function ProductCinematicReelSection({ product }: ProductCinematicReelSectionProps) {
    const archTitle = product?.content?.architecture?.title ?? "";
    const archBadge = product?.content?.architecture?.badge ?? "";
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    const reelImages = product?.content?.architecture?.reelImages ?? DEFAULT_REEL_IMAGES;
    const productLabel = product?.name ?? "ESAP";
    const architectureSubtitle = product?.content?.architecture?.subtitle
        ?? `Architecture — ${productLabel}. Detailed visualization of the ESAP engine components.`;



    useProductCinematicReel({
        containerRef,
        imagesRef,
        reelImages,
    });

    return (
        <div className="relative w-full">
            {/* Desktop Header - Outside pinned Section */}
            <div className="hidden md:block container mx-auto px-6 pt-20 pb-0 relative z-20">
                <SectionHeader
                    title={archTitle}
                    subtitle={architectureSubtitle}
                    badge={archBadge}
                    badgeIcon={Layers}
                    align="center"
                    animate={true}
                />
            </div>

            {/* Pinned Section - GSAP pins this element. overflow must be visible for pin to work. */}
            <Section
                ref={containerRef}
                padding="none"
                background="dark"
                className="relative md:-mt-20"
                withContainer={false}
                overflow="visible"
            >
                {/* Mobile Header - Inside pinned Section to avoid scrolling out of view */}
                <div className="mobile-section-header block md:hidden absolute top-0 inset-x-0 w-full container mx-auto px-6 pt-24 pb-0 z-50 pointer-events-auto">
                    <SectionHeader
                        title={archTitle}
                        subtitle={architectureSubtitle}
                        badge={archBadge}
                        badgeIcon={Layers}
                        align="center"
                        className="mb-0"
                        animate={false}
                    />
                </div>

                {/* The Kinetic 3D Deck Stage - Visual clipping happens here */}
                <div className="relative w-full h-[100svh] md:h-[110vh] overflow-hidden">
                    <div className="deck-stage absolute inset-0 z-10 flex items-center justify-center pointer-events-none transform-gpu pt-20 md:pt-0" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                            {reelImages.map((src, idx) => (
                                <div
                                    key={src}
                                    ref={(el) => { imagesRef.current[idx] = el; }}
                                    className="absolute w-[90vw] md:w-[70vw] h-[50vh] sm:h-[60vh] md:h-[75vh] will-change-transform"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={src}
                                            alt={`Blade ${idx}`}
                                            fill
                                            sizes="(max-width: 768px) 90vw, 70vw"
                                            className="object-contain md:object-cover"
                                        />
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 blur-2xl -z-10 opacity-30" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Edge Masking */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-15" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-15" />
                </div>
            </Section>
        </div>
    );
}
