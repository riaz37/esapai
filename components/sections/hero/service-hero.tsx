"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ServiceHeroProps {
  title: string;
  subtitle: string[];
  description?: string;
}

export function ServiceHero({ title, subtitle }: ServiceHeroProps) {
  // Split title into parts - last word gets gradient, rest is white
  const titleWords = title.split(' ');
  const lastWord = titleWords.pop() || '';
  const firstPart = titleWords.join(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Frame SVG centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <Image
          src="/services/frame.svg"
          alt="Frame decoration"
          width={300}
          height={300}
          className="w-auto h-auto opacity-90"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title - Full Width Container */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 overflow-hidden mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight w-full">
              {firstPart && <span className="block text-white">{firstPart}</span>}
              <span className="block text-gradient-primary mt-2">{lastWord}</span>
            </h1>
          </div>

          {/* Subtitle/Description */}
          <div className="mb-10 space-y-2 text-lg md:text-xl text-light-gray-90 max-w-3xl mx-auto">
            {subtitle.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button variant="primary" size="lg" className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px] shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all" asChild>
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

