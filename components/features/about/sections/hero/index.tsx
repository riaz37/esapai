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
    videoId?: string;
    videoSrc?: string;
    videoPoster?: string;
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
    videoId,
    videoSrc,
    videoPoster,
}) => {
    const displayBadge = badge ?? "";
    const displaySubtitle = subtitle ?? "";

    return (
        <Section
            padding="none"
            className="relative flex items-center justify-center overflow-hidden"
            containerClassName="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center text-center max-w-4xl pt-28 md:pt-36 pb-12"
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

            {/*
              NOTE: This inline <video> branch is currently unused — `about-page.tsx`
              passes only `videoId` (YouTube). Kept for future direct-hosted hero
              videos. If you wire up `videoSrc`, also pass `videoPoster`.
            */}
            {videoSrc ? (
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="relative w-full max-w-3xl mx-auto mt-12 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <video
                        src={videoSrc}
                        poster={videoPoster}
                        preload="metadata"
                        autoPlay
                        muted
                        loop
                        playsInline
                        disableRemotePlayback
                        disablePictureInPicture
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </m.div>
            ) : videoId ? (
                <m.a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="group relative block w-full max-w-3xl mx-auto mt-12 aspect-video rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Thumbnail */}
                    <img
                        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-7 h-7 text-white ms-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </m.a>
            ) : null}
        </Section>
    );
};
