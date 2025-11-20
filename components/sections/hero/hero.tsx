"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-visible pb-32 mt-0">
      {/* Circle behind content - animated glow and breathing effect */}
      <motion.div
        className="absolute top-[48%] left-1/2 -translate-x-1/2 z-0 pointer-events-none"
        style={{ rotate: 15 }}
        animate={{
          scale: [1, 1.08, 1.05, 1.08, 1],
          opacity: [0.8, 1, 0.9, 1, 0.8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="relative"
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(19,245,132,0.3))",
              "drop-shadow(0 0 40px rgba(19,245,132,0.6))",
              "drop-shadow(0 0 30px rgba(19,245,132,0.4))",
              "drop-shadow(0 0 50px rgba(19,245,132,0.7))",
              "drop-shadow(0 0 20px rgba(19,245,132,0.3))",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/landing/circle.svg"
            alt="Circle decoration"
            width={450}
            height={456}
            className="max-w-[450px] w-auto h-auto"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Hexagonal Icons (box.svg) - floating with glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/landing/box.svg"
          alt="Hexagonal icons decoration"
          width={1200}
          height={480}
          className="max-w-[1400px] w-auto h-auto opacity-90 filter drop-shadow-[0_0_20px_rgba(19,245,132,0.3)]"
          priority
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Tagline Badge */}
        <div className="hero-badge max-w-5xl">
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight w-full">
            <span className="block text-white">AI-Powered Solutions</span>
            <span className="block text-gradient-primary mt-2">For Modern Enterprises</span>
          </h1>
        </div>

        {/* Subtitle/Description */}
        <div className="mb-10 space-y-2 text-lg md:text-xl text-light-gray-90 max-w-3xl mx-auto">
          <p>Transform your business with intelligent automation, voice-activated systems,</p>
          <p>and AI agents that drive productivity and innovation</p>
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
