"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, ButtonArrow } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import type { ProductHeroProps } from "@/types/props";

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

export function ProductHero({ title, subtitle, centerIcon, centerIconAlt, productSlug }: ProductHeroProps) {
  const iconPath = getProductIconPath(productSlug, centerIcon);
  const iconAlt = centerIconAlt || `${title} Icon`;

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] min-h-[90vh] md:min-h-screen flex items-center pt-24 pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle Background Grid/Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Gradients/Overlays */}
        <div className="absolute inset-0 [background-image:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,3,0,0.4)_70%,rgba(0,3,0,0.8)_100%)]" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="flex flex-col items-start text-left max-w-2xl">

            <TypewriterTitle
              title={title}
              splitMode="lastWord"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6"
              align="left"
            />

            <div className="space-y-4 mb-10 max-w-lg">
              {subtitle.map((line, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-white/70 leading-relaxed font-light"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Button
                variant="primary"
                size="lg"
                asChild
              >
                <Link href="#explore" className="inline-flex items-center gap-2 group">
                  <span>Explore Solution</span>
                  <ButtonArrow />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="#features" className="flex items-center gap-2">
                  View Features
                  <ChevronRight className="w-4 h-4" />
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
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-[#13F584]/2 translate-z-0">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/HUD.png"
                >
                  <source src="/LP_animation_HomePage_Big_Intro_2X_short.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Visual Overlays */}
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* HUD Decoration Element - Simplified to 2D */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 opacity-10 pointer-events-none border-b-2 border-l-2 border-[#13F584] rounded-bl-3xl" />
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-10 pointer-events-none border-t-2 border-r-2 border-[#13F584] rounded-tr-3xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}



