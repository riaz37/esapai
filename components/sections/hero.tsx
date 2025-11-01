"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden -mt-0">
      {/* Frame in top left - hidden on scroll */}
      <div
        className={`fixed top-0 left-0 z-20 pointer-events-none transition-opacity duration-300 ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/landing/frame.svg"
          alt="Frame decoration"
          width={300}
          height={300}
          className="w-auto h-auto"
          priority
        />
      </div>

      {/* Circle behind content */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 z-0 pointer-events-none">
        <Image
          src="/landing/circle.svg"
          alt="Circle decoration"
          width={600}
          height={608}
          className="w-auto h-auto"
          priority
        />
      </div>

      {/* Hexagonal Icons (box.svg) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block w-full">
        <Image
          src="/landing/box.svg"
          alt="Hexagonal icons decoration"
          width={100}
          height={100}
          className="w-full h-auto opacity-90"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-5xl">
        {/* Tagline Badge */}
        <div className="hero-badge">
          <div className="hero-badge-exclusive">
            <span className="hero-badge-exclusive-text">Exclusive</span>
          </div>
          <div className="hero-badge-text">
            <span className="hero-badge-text-content">
              Tomorrow&apos;s Edge, Built Today
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gradient-primary">
          <span className="block">Smartly Built for</span>
          <span className="">What&apos;s Next</span>
        </h1>

        {/* Subtitle/Description */}
        <div className="mb-10 space-y-2 text-lg md:text-xl text-light-gray-90 max-w-3xl">
          <p>Where Innovation Meets Productivity Driven by agents</p>
          <p>Powered by automation Built for what&apos;s next</p>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          className="text-base md:text-lg px-8 py-6 rounded-[40px] font-semibold shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
