"use client";

import { useEffect, useState } from "react";
import { CinematicDesktopFlow } from "./desktop-flow";
import { ResponsiveMobileProblemFlow } from "./mobile-flow";
import type { Product } from "@/types/product";
import { getProductCinematicItems } from "@/config/product-cinematic-problems";

interface ProductCinematicFlowProps {
    slug: string;
    initialProduct: Product;
}

export function ProductCinematicFlow({ slug, initialProduct }: ProductCinematicFlowProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Get icons and positions from config
    const configItems = getProductCinematicItems(slug);

    // Get text content from product (Sanity)
    const textItems = initialProduct?.content?.cinematic?.problems ?? [];

    // Merge them
    const mergedProblems = configItems.map((config, index) => {
        const text = textItems[index] || {
            title: "Problem",
            description: "Description not found",
            solTitle: "Solution",
            solDesc: "Solution description not found",
            solImpact: "Impact"
        };
        return {
            ...config,
            ...text
        };
    });

    if (isMobile) {
        return (
            <div className="bg-black pt-20">
                <ResponsiveMobileProblemFlow problems={mergedProblems} />
            </div>
        );
    }

    return (
        <div className="bg-black">
            <CinematicDesktopFlow slug={slug} problems={mergedProblems} />
        </div>
    );
}
