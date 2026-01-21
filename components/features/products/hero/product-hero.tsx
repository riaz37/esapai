"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Button, ButtonArrow } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { HeroBadge } from "@/components/ui/hero-badge";
import Frame from "@/components/shared/frame";
import { InteractiveProductIconHalo } from "@/components/ui/interactive-product-icon-halo";
import { LazyThreeWrapper } from "@/components/three/lazy-three-wrapper";
import GridFloor from "@/components/shared/grid-floor";
import type { ProductHeroProps } from "@/types/props";

const ProductHaloFlow = dynamic(
  () =>
    import("@/components/shared/product-halo-flow").then((m) => m.ProductHaloFlow),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" aria-hidden="true" />,
  }
);

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
    "domain-expansion": "/product_icons/Industry Automation.svg",
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
    <section className="relative w-full overflow-hidden bg-dark min-h-screen flex flex-col justify-center pt-24 pb-12">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden w-full">
        <div className="absolute inset-0 w-full h-full left-0 right-0">
          <div className="absolute inset-0 w-full h-full left-0 right-0 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full left-0 right-0 pointer-events-auto">
              <div className="absolute inset-0 w-full h-full">
                <LazyThreeWrapper
                  fallback={
                    <div className="absolute inset-0 w-full h-full opacity-60 min-h-[400px] bg-transparent" />
                  }
                >
                  <GridFloor className="opacity-60" perspective="dramatic" />
                </LazyThreeWrapper>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,3,0,0.2)_50%,rgba(0,3,0,0.4)_70%,rgba(0,3,0,0.6)_100%)]" />
            <div className="absolute top-0 left-0 right-0 h-[15%] pointer-events-none [background-image:linear-gradient(to_bottom,rgba(0,3,0,0.85)_0%,rgba(0,3,0,0.4)_40%,rgba(0,3,0,0.15)_70%,transparent_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none [background-image:linear-gradient(to_top,rgba(0,3,0,0.9)_0%,rgba(0,3,0,0.4)_60%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 left-0 w-[2%] pointer-events-none [background-image:linear-gradient(to_right,rgba(0,3,0,0.5)_0%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 right-0 w-[2%] pointer-events-none [background-image:linear-gradient(to_left,rgba(0,3,0,0.5)_0%,transparent_100%)]" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-6">
            <TypewriterTitle
              title={title}
              splitMode="lastWord"
              className="mb-3 sm:mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              align="center"
            />

            <div className="mb-6 space-y-1.5 sm:space-y-2">
              {subtitle.map((line, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-light-gray-90"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
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

          <div className="relative z-20 flex items-center justify-center">
            <div className="w-full h-[40vh] min-h-[300px] max-h-[500px] relative">
              <ProductHaloFlow
                haloScale={1.0}
                centerNode={{
                  title: title,
                  icon: (
                    <InteractiveProductIconHalo scale={1.0} intensity="high">
                      {iconPath ? (
                        <Image
                          src={iconPath}
                          alt={iconAlt}
                          width={96}
                          height={96}
                          priority
                          sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                        />
                      ) : (
                        <svg
                          width="96"
                          height="96"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                        >
                          <path
                            d="M12 2L2 7L12 12L22 7L12 2Z"
                            stroke="#13F584"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 17L12 22L22 17"
                            stroke="#13F584"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12L12 17L22 12"
                            stroke="#13F584"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </InteractiveProductIconHalo>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



