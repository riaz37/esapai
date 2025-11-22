"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import FramerBackdrop from "./framer";
import Circle from "./circle";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const circleGlowRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const anim = useGSAPAnimations(sectionRef);

  useGSAP(() => {
    const tl = anim.createTimeline();

    // Entrance animations - GSAP reads initial states from CSS classes
    // Using 'to' animations - GSAP automatically reads current computed styles
    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        iconsRef.current,
        {
          opacity: 0.6,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        badgeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Continuous animations (start after entrance sequence completes)
    if (circleContainerRef.current) {
      anim.breathing(circleContainerRef.current, { delay: 0.8 });
    }
    if (circleGlowRef.current) {
      anim.glow(circleGlowRef.current, { delay: 0.8 });
    }
    if (iconsRef.current) {
      anim.float(iconsRef.current, { delay: 0.8 });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pb-32 mt-0">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          ref={backdropRef}
          className="absolute inset-0 gsap-fade-in"
        >
          <FramerBackdrop className="w-[120%] max-w-none min-h-full translate-x-[-10%] translate-y-[-5%]" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background/80" />
      </div>

      {/* Circle behind content - animated glow and breathing effect */}
      <div
        ref={circleContainerRef}
        className="absolute top-[48%] left-1/2 -translate-x-1/2 z-0 pointer-events-none"
      >
        <div ref={circleGlowRef} className="relative">
          <Circle
            className="max-w-[450px] w-auto h-auto"
            style={{ width: "450px", height: "auto" }}
          />
        </div>
      </div>

      {/* Hexagonal Icons (box.svg) - floating with glow */}
      <div
        ref={iconsRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block gsap-fade-in"
      >
        <Image
          src="/landing/box.svg"
          alt="Hexagonal icons decoration"
          width={1200}
          height={480}
          className="max-w-[1400px] w-auto h-auto opacity-60 filter drop-shadow-[0_0_20px_rgba(19,245,132,0.2)]"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Tagline Badge */}
        <div
          ref={badgeRef}
          className="hero-badge max-w-5xl gsap-slide-up"
        >
          <div className="hero-badge-exclusive">
            <span className="hero-badge-exclusive-text">Exclusive</span>
          </div>
          <div className="hero-badge-text">
            <span className="hero-badge-text-content">
              Tomorrow&apos;s Edge, Built Today
            </span>
          </div>
        </div>

        {/* Main Title - Full Width Container */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight w-full gsap-slide-up-lg"
          >
            <span className="block text-white">AI-Powered Solutions</span>
            <span className="block text-gradient-primary mt-2">
              For Modern Enterprises
            </span>
          </h1>
        </div>

        {/* Subtitle/Description */}
        <div
          ref={subtitleRef}
          className="mb-10 space-y-2 text-lg md:text-xl text-light-gray-90 max-w-3xl mx-auto gsap-fade-in"
        >
          <p>
            Transform your business with intelligent automation, voice-activated
            systems,
          </p>
          <p>and AI agents that drive productivity and innovation</p>
        </div>

        {/* CTA Button */}
        <div
          ref={buttonRef}
          className="gsap-fade-scale-in"
        >
          <Button
            variant="primary"
            className="text-base md:text-lg px-8 py-6 rounded-[40px] font-semibold shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
