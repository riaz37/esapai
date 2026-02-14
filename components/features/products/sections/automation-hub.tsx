"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { AutomationFeature } from "@/types/product";
import type { AutomationHubProps, AutomationHubFeatureCardProps } from "@/types/props";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";


const defaultTitle = "Intelligent Automation Hub";
const defaultSubtitle =
  "Security AI Platform to Protect the Entire Enterprise. Break Down Security. Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.";
const defaultFeatures: AutomationFeature[] = [
  {
    title: "Adaptive Legacy Bridge",
    description:
      "Seamlessly wraps around existing systems to enable smart AI enhancements without disruption",
  },
  {
    title: "Voice Command Suite",
    description:
      "Optimized interfaces for both developers and end-users to maximize efficiency and adoption.",
  },
  {
    title: "Dual User Access",
    description:
      "Full voice control for effortless operation across all platform functions and workflows.",
  },
  {
    title: "Collaborative Workflow",
    description:
      "Integrates human expertise with AI for refined and reliable automation processes.",
  },
];

export function AutomationHub({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  features = defaultFeatures,
}: AutomationHubProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  return (
    <Section ref={sectionRef} className="relative">
      <div ref={glowRef} className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>

      <div ref={headerRef}>
        <SectionHeader
          title={title}
          titleClassName="text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          subtitle={subtitle}
          subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
        />
      </div>

      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {features.map((feature, index) => {
          const zigZagOffsets = [
            "lg:translate-y-0",
            "lg:translate-y-10 xl:translate-y-12",
            "lg:-translate-y-6 xl:-translate-y-8",
            "lg:translate-y-6 xl:translate-y-8",
          ];

          return (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              className={zigZagOffsets[index % zigZagOffsets.length]}
              index={index}
            />
          );
        })}
      </div>
    </Section>
  );
}


function FeatureCard({ title, description, className, index }: AutomationHubFeatureCardProps) {
  const floatSequences = [
    [0, -14, 4, 10, 0],
    [0, 10, -6, 8, 0],
    [0, -10, 6, -4, 0],
    [0, 12, -8, 6, 0],
  ];

  const sequence = floatSequences[index % floatSequences.length];

  return (
    <motion.div
      data-gsap="automation-card"
      className={cn(
        "relative overflow-hidden transition-transform duration-500 ease-out",
        className
      )}
      animate={{ y: sequence, rotate: [0, 0.5, 0, -0.5, 0] }}
      transition={{
        duration: 8 + index * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative p-8 h-full flex flex-col">
        <div className="relative w-full h-64 flex items-center justify-center mb-6">
          <Image
            src="/products/automationhub.svg"
            alt={title}
            width={300}
            height={300}
            className="w-full h-full max-w-[220px] max-h-[220px] object-contain filter-glow-primary"
          />
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-4 text-left text-gradient-radial-white">
          {title}
        </h3>

        <p className="text-base md:text-lg text-left text-light-gray-90 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}



