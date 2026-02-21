"use client";

import React from "react";
import { m } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";

export const AboutHero: React.FC = () => {
    return (
        <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-12 px-4">
            {/* Simple gradient background to replace complex mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center max-w-4xl">
                <m.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <Badge variant="outline" className="px-4 py-1.5 text-xs sm:text-xs border-white/10 text-primary bg-white/5 backdrop-blur-sm rounded-full">
                        Legacy & Vision
                    </Badge>
                </m.div>

                <m.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] text-white"
                >
                    Our <span className="text-primary">Legacy</span>
                </m.h1>

                <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
                >
                    Building the foundation for enterprise intelligence. From humble beginnings to global infrastructure — this is our story.
                </m.p>
            </div>
        </section>
    );
};
