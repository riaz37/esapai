"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button, ButtonArrow } from "@/components/ui/button";
import { HeroAnimation } from "./hero-animation";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import type { ProductHeroProps } from "@/types/props";
import { Section } from "@/components/ui/section";

export function ProductHero({ title, subtitle, tagline, exploreButton, videoSrc }: ProductHeroProps) {
  const exploreLabel = exploreButton ?? "";
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <Section
      withContainer={false}
      padding="none"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Full-viewport background animation */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <HeroAnimation
          className="w-full h-full"
          isRTL={isRTL}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className={`flex flex-col items-center text-center max-w-2xl ${isRTL ? "lg:items-end lg:text-end lg:ms-auto" : "lg:items-start lg:text-start lg:mx-0"}`}>

          <div className={`flex flex-col mb-6 items-center ${isRTL ? "lg:items-end" : "lg:items-start"}`}>
            <TypewriterTitle
              title={title}
              tagline={tagline}
              splitMode="manual"
              highlightPart="first"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              align="center-lg-left"
              staggerDelay={0.015}
              letterDuration={0.3}
            />
          </div>

          <div className="space-y-4 mb-10 max-w-lg">
            {subtitle.map((line) => (
              <p
                key={line}
                className="text-lg md:text-xl text-white/70 leading-relaxed font-normal"
              >
                {line}
              </p>
            ))}
          </div>

          <div className={`flex flex-wrap items-center justify-center gap-5 ${isRTL ? "lg:justify-end" : "lg:justify-start"}`}>
            <Button
              variant="primary"
              size="default"
              asChild
              className="pe-1.5"
            >
              <Link href="/contact" className="inline-flex items-center gap-2 group">
                <span>{exploreLabel}</span>
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
