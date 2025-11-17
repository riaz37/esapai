"use client";

import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark pt-32 pb-20">
      {/* Frame SVG centered (shared with Service Hero) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none">
        <Image
          src="/services/frame.svg"
          alt="Frame decoration"
          width={300}
          height={300}
          className="w-auto h-auto opacity-90"
          priority
        />
      </div>

      <div className="relative z-2 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-gradient-primary">
            About Us
          </h1>

          {/* Sub-headline */}
          <div className="mb-10 space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-light-gray-90">
              Where Innovation Meets Productivity
            </p>
            <p className="text-base md:text-lg text-white-opacity-70 max-w-3xl mx-auto">
              Driven by agents, powered by automation, built for what's next. 
              We're a team of visionaries dedicated to transforming how businesses 
              operate through cutting-edge AI technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

