"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AboutHero } from "@/components/features/about/hero";
import { LazySection } from "@/components/ui/lazy-section";

// --- Dynamic imports for below-fold sections (code-split + no SSR) ---
const AboutNarrative = dynamic(() => import("@/components/features/about/narrative").then(mod => mod.AboutNarrative), {
    ssr: false,
});

const AboutHistory = dynamic(() => import("@/components/features/about/history").then(mod => mod.AboutHistory), {
    ssr: false,
});

export function AboutPageClient() {
    return (
        <div className="relative">
            <AboutHero />

            <LazySection minHeight="800px">
                <AboutNarrative />
            </LazySection>

            <LazySection minHeight="600px">
                <AboutHistory />
            </LazySection>
        </div>
    );
}
