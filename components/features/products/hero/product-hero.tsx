"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, ButtonArrow } from "@/components/ui/button";
import { OptimizedVideo } from "@/components/ui/optimized-video";

import { ChevronRight } from "lucide-react";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import type { ProductHeroProps } from "@/types/props";
import { Section } from "@/components/ui/section";

/**
 * Maps product slugs to their corresponding icon files in the product_icons directory
 */
const getProductIconPath = (slug?: string, centerIcon?: string): string | null => {
  // If centerIcon is provided, use it
  if (centerIcon) {
    return centerIcon;
  }

  // Map product slugs to icon filenames
  const iconMap: Record<string, string> = {
    "erp": "/product_icons/Voice.svg",
    "ai-framework": "/product_icons/AI automation.svg",
    "zakra": "/product_icons/Zakra.svg",
    "jawib": "/product_icons/Jawib.svg",
    "fasih": "/product_icons/Fasih LLM.svg",

  };

  if (slug && iconMap[slug]) {
    return iconMap[slug];
  }

  return null;
};

export function ProductHero({ title, subtitle, centerIcon, centerIconAlt, productSlug, tagline }: ProductHeroProps) {
  const iconPath = getProductIconPath(productSlug, centerIcon);
  const iconAlt = centerIconAlt || `${title} Icon`;

  return (
    <Section
      withContainer={false}
      padding="md"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0">

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
              {subtitle.map((line, index) => (
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
                className="pr-1.5"
              >
                <Link href="#explore" className="inline-flex items-center gap-2 group">
                  <span>Explore Solution</span>
                  <ButtonArrow />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Visual (Video) */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[700px] aspect-[16/10] group">
              {/* Glow Decoration */}
              <div className="absolute -inset-4 bg-[#13F584]/5 blur-[60px] rounded-full group-hover:bg-[#13F584]/10 transition-all duration-700" />

              {/* Frame/Border */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#13F584]/2 translate-z-0">
                <OptimizedVideo
                  src="/LP_animation_HomePage_Big_Intro_2X_short.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  priority={true}
                  className="w-full h-full object-cover"
                />


                {/* Visual Overlays */}
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>


            </div>
          </div>

        </div>
      </div>
    </Section >
  );
}
