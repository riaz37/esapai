"use client";

import Image from "next/image";
import type { AutomationFeature } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

interface AutomationHubProps {
  title?: string;
  subtitle?: string;
  features?: AutomationFeature[];
}

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
  return (
    <Section className="relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>

      <SectionHeader
        title={title}
        titleClassName="text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        subtitle={subtitle}
        subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
      />

      {/* Feature Cards Grid - 4 columns side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </Section>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="relative overflow-hidden group">
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Feature Graphic */}
        <div className="relative w-full h-64 flex items-center justify-center mb-6">
          <Image
            src="/products/automationhub.svg"
            alt={title}
            width={300}
            height={300}
            className="w-full h-full max-w-[220px] max-h-[220px] object-contain filter-glow-primary"
          />
        </div>

        {/* Card Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-left text-gradient-radial-white">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-base md:text-lg text-left text-light-gray-90 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
