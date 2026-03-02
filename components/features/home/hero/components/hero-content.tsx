"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/routing";
import { Button, ButtonArrow } from "@/components/ui/button";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { HeroBadge } from "@/components/ui/hero-badge";

interface HeroContentProps {
    title: string;
    subtitle: string;
    badgePill?: string;
    badgeDescription?: string;
    ctaButtonText: string;
    ctaButtonHref: string;
    badgeRef: React.RefObject<HTMLDivElement | null>;
    subtitleRef: React.RefObject<HTMLDivElement | null>;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
    (
        {
            title,
            subtitle,
            badgePill,
            badgeDescription,
            ctaButtonText,
            ctaButtonHref,
            badgeRef,
            subtitleRef,
            buttonRef,
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center text-center"
            >
                {/* Tagline Badge */}
                <HeroBadge
                    ref={badgeRef}
                    pillText={badgePill ?? ""}
                    description={badgeDescription ?? ""}
                />

                {/* Main Title - Kinetic Typography */}
                <div className="hero-main-title w-full max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden">
                    <TypewriterTitle
                        title={title.split(" / ")[0] || title}
                        splitMode="secondLine"
                        secondLine={title.split(" / ")[1]}
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 leading-none w-full"
                        align="center"
                        mainTextClassName="mt-1 sm:mt-2"
                        staggerDelay={0.015}
                        letterDuration={0.3}
                    />
                </div>

                {/* Subtitle/Description */}
                <div
                    ref={subtitleRef}
                    className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/70 max-w-3xl mx-auto px-2 sm:px-4 gsap-fade-in-optimized"
                >
                    {subtitle.includes("\n") ? (
                        subtitle.split("\n").map((line, i) => <p key={i}>{line}</p>)
                    ) : (
                        <p>{subtitle}</p>
                    )}
                </div>

                {/* CTA Button */}
                <Button
                    ref={buttonRef}
                    variant="primary"
                    size="default"
                    className="gsap-scale-in-optimized"
                    asChild
                >
                    <Link href={ctaButtonHref} className="inline-flex items-center gap-2 group">
                        <span>{ctaButtonText}</span>
                        <ButtonArrow size="default" />
                    </Link>
                </Button>
            </div>
        );
    }
);

HeroContent.displayName = "HeroContent";
