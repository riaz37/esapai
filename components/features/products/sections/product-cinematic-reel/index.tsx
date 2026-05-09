"use client";

import { useRef } from "react";
import { useProductCinematicReel } from "@/lib/hooks/use-product-cinematic-reel";
import { Section } from "@/components/ui/section";
import type { Product } from "@/types/product";
import { ReelHeader } from "./reel-header";
import { ReelStage } from "./reel-stage";

const DEFAULT_REEL_IMAGES = [
    '/product-images/Slide-22.webp',
    '/product-images/Slide-23.webp',
    '/product-images/Slide-24.webp',
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
            <ReelHeader
                title={archTitle}
                subtitle={architectureSubtitle}
                badge={archBadge}
            />

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
                <ReelHeader
                    title={archTitle}
                    subtitle={architectureSubtitle}
                    badge={archBadge}
                    isMobile
                />

                {/* The Kinetic 3D Deck Stage */}
                <ReelStage images={reelImages} imagesRef={imagesRef} />
            </Section>
        </div>
    );
}
