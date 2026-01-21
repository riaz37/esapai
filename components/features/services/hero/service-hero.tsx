"use client";

import React from "react";
import { Button, ButtonArrow } from "@/components/ui/button";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { HeroBadge } from "@/components/ui/hero-badge";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import type { GlobeConfig } from "@/components/ui/globe";
import type { ServiceHeroProps } from "@/types/props";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import Frame from "@/components/shared/frame";

const World = dynamic(
  () => import("@/components/ui/globe").then((mod) => mod.World),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" aria-hidden="true" />,
  }
);

// Theme-matched globe configuration
const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#030303",
  showAtmosphere: true,
  atmosphereColor: "#13F584",
  atmosphereAltitude: 0.15,
  emissive: "#062013",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(19, 245, 132, 0.4)",
  ambientLight: "#13F584",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#13F584",
  pointLight: "#13F584",
  arcTime: 1500,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

// Global network connections data
const globeData = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: "#13F584",
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: "#13F584",
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: "#13F584",
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: "#13F584",
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#13F584",
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: "#13F584",
  },
];

export function ServiceHero({ title, subtitle }: ServiceHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-24 md:pt-32 pb-20">
      {/* Dark overlay to match main Hero style */}
      <div className="absolute inset-0 bg-black/40 z-[-1] pointer-events-none" />

      {/* Frame Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden select-none">
        <Frame className="w-full h-full max-w-[1400px] object-contain scale-125" />
      </div>


      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Side: Content */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
            <TypewriterTitle
              title={title}
              splitMode="lastWord"
              className="mb-6"
              align="left"
            />

            <div className="space-y-4 mb-8 md:mb-10 max-w-2xl">
              {subtitle.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-base md:text-lg lg:text-xl text-white/80 font-medium"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                asChild
              >
                <Link href="#solutions" className="inline-flex items-center gap-2 group">
                  <span>Get Started</span>
                  <ButtonArrow />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="#how-it-works" className="flex items-center gap-2">
                  View Features
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>


          </div>

          {/* Right Side: Globe Visual */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center items-center py-10 lg:py-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px]"
            >
              {/* Outer Glow for Globe */}
              <div className="absolute inset-x-0 bottom-1/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-md opacity-30" />
              <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full animate-pulse-slow" />

              <World globeConfig={globeConfig} data={globeData} />

              {/* Top-Right: Neural Link Status Panel */}
              <div className="absolute -top-4 -right-4 w-44 select-none">
                {/* Animated corner frame */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 140" fill="none">
                  <motion.path
                    d="M176 8 L176 0 L140 0"
                    stroke="rgba(19, 245, 132, 0.6)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M176 0 L176 100"
                    stroke="rgba(19, 245, 132, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </svg>

                <div className="relative p-4 text-[10px]">
                  {/* Status indicator */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(19, 245, 132, 0.4)",
                          "0 0 0 6px rgba(19, 245, 132, 0)",
                          "0 0 0 0 rgba(19, 245, 132, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                      className="text-primary"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ONLINE
                    </motion.span>
                  </div>

                  {/* Cycling data lines */}
                  <div className="text-white/60">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      LAT: 22.3193°N
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                    >
                      LNG: 114.1694°E
                    </motion.div>
                  </div>

                  {/* Signal strength bars */}
                  <div className="flex items-end gap-0.5 h-3 mt-2">
                    {[0.3, 0.5, 0.7, 0.9, 1].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-primary rounded-sm"
                        animate={{
                          height: [`${height * 100}%`, `${height * 60}%`, `${height * 100}%`],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                        style={{ height: `${height * 100}%` }}
                      />
                    ))}
                    <span className="text-white/60 ml-2 text-[8px]">SIG</span>
                  </div>
                </div>
              </div>

              {/* Bottom-Left: Network Activity Monitor */}
              <div className="absolute -bottom-4 -left-4 w-44 select-none">
                {/* Animated corner frame */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 120" fill="none">
                  <motion.path
                    d="M0 112 L0 120 L36 120"
                    stroke="rgba(19, 245, 132, 0.6)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M0 120 L0 20"
                    stroke="rgba(19, 245, 132, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </svg>

                <div className="relative p-4 text-[10px]">
                  {/* Activity label */}
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      className="w-1 h-1 bg-primary rounded-full"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <span className="text-white/50">NET_ACTIVITY</span>
                  </div>

                  {/* Animated waveform */}
                  <div className="flex items-center gap-px h-6 mb-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-primary/60 rounded-sm"
                        animate={{
                          height: [
                            `${Math.random() * 60 + 20}%`,
                            `${Math.random() * 80 + 20}%`,
                            `${Math.random() * 40 + 10}%`,
                            `${Math.random() * 70 + 30}%`
                          ]
                        }}
                        transition={{
                          duration: 0.8 + Math.random() * 0.4,
                          repeat: Infinity,
                          delay: i * 0.05
                        }}
                        style={{ height: "40%" }}
                      />
                    ))}
                  </div>

                  {/* Scanning line */}
                  <div className="relative h-1 bg-zinc-800/50 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-primary to-transparent"
                      animate={{ x: ["-100%", "calc(100% + 176px)"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Data throughput */}
                  <motion.div
                    className="text-white/60 mt-2 flex justify-between"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span>TX: 2.4Gb/s</span>
                    <span>RX: 1.8Gb/s</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}



