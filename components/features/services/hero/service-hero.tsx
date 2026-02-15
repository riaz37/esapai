"use client";

import React from "react";
import { Button, ButtonArrow } from "@/components/ui/button";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { BadgeChip } from "@/components/ui/badge-chip";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import type { GlobeConfig } from "@/components/ui/globe";
import type { ServiceHeroProps } from "@/types/props";
import { ArrowRight, ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";

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
  globeColor: "#062013",
  showAtmosphere: true,
  atmosphereColor: "#13F584",
  atmosphereAltitude: 0.1,
  emissive: "#062013",
  emissiveIntensity: 0.9,
  shininess: 0.9,
  polygonColor: "rgba(19, 245, 132, 0.4)",
  ambientLight: "#13F584",
  ambientIntensity: 0.8,
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#13F584",
  directionalRightLight: "#ffffff",
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

import { Section } from "@/components/ui/section";


export function ServiceHero({ title, subtitle }: ServiceHeroProps) {
  return (
    <Section
      padding="none"
      className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden pt-24 pb-12 !px-0"
      containerClassName="relative z-10 container mx-auto px-6 md:px-12"
      containerMaxWidth="standard"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

        {/* Left Side: Content */}
        <div className="flex flex-col items-start text-left max-w-2xl relative z-20">
          {typeof title === "string" ? (
            <TypewriterTitle
              title={title}
              splitMode="lastWord"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6"
              align="left"
            />
          ) : (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6 text-left leading-[1.1]">
              {title}
            </h1>
          )}

          <div className="space-y-4 mb-10 max-w-lg">
            {subtitle.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-lg md:text-xl text-white/70 leading-relaxed font-light"
              >
                {line}
                {index < subtitle.length - 1 && <br className="hidden md:block" />}
              </motion.p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5">
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
        <div className="relative flex justify-center lg:justify-end items-center py-10 lg:py-0 overflow-visible">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] -mr-32 lg:-mr-40"
          >


            <World globeConfig={globeConfig} data={globeData} />
          </motion.div>
        </div>

      </div>
    </Section>
  );
}
