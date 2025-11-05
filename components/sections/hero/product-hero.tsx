"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
  description?: string;
  centerIcon?: string;
  centerIconAlt?: string;
}

export function ProductHero({ 
  title, 
  subtitle, 
  centerIcon = "/products/voiceerp.svg",
  centerIconAlt = "Product Icon"
}: ProductHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Top Light SVG */}
      <div className="absolute top-0 left-0 right-0 z-[1]">
        <Image
          src="/products/Top Light.svg"
          alt="Top Light"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <div className="relative z-[2] container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-gradient-primary">
            {title}
          </h1>

          {/* Sub-headline */}
          <div className="mb-4 space-y-2">
            {subtitle.map((line, index) => (
              <p key={index} className="text-lg md:text-xl lg:text-2xl text-light-gray-90">
                {line}
              </p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
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

          {/* Voice ERP Icon and Element Icons Network */}
          <div className="relative mt-0 h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Watermark Background - Full Width */}
            <div className="absolute left-1/2 -translate-x-1/2 w-screen h-full z-0 flex items-center justify-center overflow-hidden">
              <Image
                src="/products/Watermakr.svg"
                alt="Watermark"
                width={1920}
                height={1080}
                className="w-full h-full object-cover opacity-40"
                priority
              />
            </div>


            {/* Left Side Elements - 4 elements with different sizes, evenly spaced */}
            <div className="absolute left-[6%] top-[15%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/element1.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </div>
            <div className="absolute left-[6%] top-[30%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/element2.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              />
            </div>
            <div className="absolute left-[6%] top-[55%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/element3.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </div>
            <div className="absolute left-[6%] top-[75%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/elemnet4.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
              />
            </div>

            {/* Right Side Elements - 4 elements with different sizes, evenly spaced */}
            <div className="absolute right-[6%] top-[15%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/element5.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
              />
            </div>
            <div className="absolute right-[6%] top-[30%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/element6.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </div>
            <div className="absolute right-[6%] top-[55%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/element7.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
              />
            </div>
            <div className="absolute right-[6%] top-[75%] z-[2] transform -translate-y-1/2">
              <Image
                src="/products/element8.svg"
                alt="Element"
                width={100}
                height={100}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
              />
            </div>

            {/* Central Product Icon - Bigger size */}
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3]">
              <Image
                src={centerIcon}
                alt={centerIconAlt}
                width={300}
                height={300}
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 filter-glow-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
