"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
  centerIcon?: string;
  centerIconAlt?: string;
}

export function ProductHero({ title, subtitle, centerIcon, centerIconAlt }: ProductHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>

      {/* Center Icon */}
      {centerIcon && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none">
          <Image
            src={centerIcon}
            alt={centerIconAlt || "Product icon"}
            width={400}
            height={400}
            className="w-auto h-auto max-w-[300px] md:max-w-[400px] opacity-90"
            priority
          />
        </div>
      )}

      <div className="relative z-[2] container mx-auto px-4 pt-32 pb-20">
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
        </div>
      </div>
    </section>
  );
}

