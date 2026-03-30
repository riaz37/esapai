"use client";

import { Link } from "@/i18n/routing";
import { Button, ButtonArrow } from "@/components/ui/button";
import { HeroAnimation } from "./hero-animation";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import type { ProductHeroProps } from "@/types/props";
import { Section } from "@/components/ui/section";

export function ProductHero({ title, subtitle, tagline, exploreButton, videoSrc }: ProductHeroProps) {
  const exploreLabel = exploreButton ?? "";

  return (
    <Section
      withContainer={false}
      padding="none"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start max-w-2xl mx-auto lg:mx-0">

            <div className="flex flex-col mb-6 items-center lg:items-start">
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

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
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

          {/* Right Visual (Video) */}
          <div className="relative flex items-center justify-center lg:justify-end mt-16 lg:mt-0">
            <div 
              className="relative w-[150%] lg:w-[200%] max-w-[1400px] aspect-video scale-[1.5] lg:scale-[2.4] lg:-translate-x-[20%] lg:translate-y-[10%] mix-blend-screen pointer-events-none"
              style={{
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 100%)",
                WebkitMaskImage: "-webkit-radial-gradient(50% 20%, ellipse 80% 80%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)"
              }}
            >
              <HeroAnimation
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </Section >
  );
}
