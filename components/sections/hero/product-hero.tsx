"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
  centerIcon?: string;
  centerIconAlt?: string;
}

export function ProductHero({ title, subtitle, centerIcon, centerIconAlt }: ProductHeroProps) {
  const { scrollY } = useScroll();
  
  // Top light animation - fade out on scroll
  const topLightOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const topLightScale = useTransform(scrollY, [0, 100], [1, 0.8]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Top light effect - animated fade out on scroll */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        style={{ opacity: topLightOpacity, scale: topLightScale }}
      >
        <Image
          src="/products/Top Light.svg"
          alt="Top light decoration"
          width={1312}
          height={954}
          className="w-full max-w-[1312px] h-auto"
          priority
        />
      </motion.div>

      <div className="relative z-2 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-gradient-primary">
            {title}
          </h1>

          {/* Sub-headline */}
          <div className="mb-10 space-y-2">
            {subtitle.map((line, index) => (
              <p key={index} className="text-lg md:text-xl lg:text-2xl text-light-gray-90">
                {line}
              </p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button variant="primary" size="lg" className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" asChild>
              <Link href="#explore">Explore Solution</Link>
            </Button>
            <Button 
              variant="watch-demo" 
              size="lg" 
              className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" 
              asChild
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>

          {/* Product Images - Watermakr and VoiceERP */}
          <div className="relative w-full mt-10 flex justify-center">
            <div className="relative w-full max-w-[1400px]">
              <Image
                src="/products/Watermakr.svg"
                alt="Watermark"
                width={1600}
                height={1000}
                className="w-full h-auto mx-auto"
                priority
              />

              {centerIcon && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <Image
                    src={centerIcon}
                    alt={centerIconAlt || "Product Icon"}
                    width={640}
                    height={640}
                    className="w-[60%] md:w-[50%] lg:w-[45%] xl:w-[40%] h-auto drop-shadow-[0_10px_40px_rgba(0,255,170,0.35)]"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

