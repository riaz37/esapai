"use client";

import React from "react";
import { m } from "motion/react";
import { Badge } from "@/components/ui/badge";


import { Section } from "@/components/ui/section";

export interface AboutHeroProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    titlePart1?: string;
    titlePart2?: string;
}

function TitleDisplay({ title, titlePart1, titlePart2 }: Pick<AboutHeroProps, "title" | "titlePart1" | "titlePart2">) {
    if (titlePart1 !== undefined && titlePart2 !== undefined) {
        return (
            <>
                {titlePart1}<span className="text-primary">{titlePart2}</span>
            </>
        );
    }
    if (title) {
        return <>{title}</>;
    }
    return null;
}

export const AboutHero: React.FC<AboutHeroProps> = ({
    title,
    subtitle,
    badge,
    titlePart1,
    titlePart2,
}) => {
    const displayBadge = badge ?? "";
    const displaySubtitle = subtitle ?? "";

    return (
        <Section
            padding="none"
            className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
            containerClassName="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center text-center max-w-4xl pt-32 md:pt-40 pb-12"
        >
            <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
            >
                <Badge variant="outline" className="px-4 py-1.5 text-xs sm:text-xs border-white/10 text-primary bg-white/5 backdrop-blur-sm rounded-full">
                    {displayBadge}
                </Badge>
            </m.div>

            <m.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 leading-none text-white"
            >
                <TitleDisplay title={title} titlePart1={titlePart1} titlePart2={titlePart2} />
            </m.h1>

            <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
                {displaySubtitle}
            </m.p>
        </Section>
    );
};
