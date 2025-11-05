"use client";

import { useId } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

interface FeatureBlockProps {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  features: FeatureBlockProps[];
}

export function ServiceFeatures({
  title = "Protect your organization from any threat",
  subtitle = "Security AI Platform to Protect the Entire Enterprise. Break Down Security. Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.",
  features,
}: ServiceFeaturesProps) {
  // Ensure we have exactly 5 features
  const displayFeatures = features.slice(0, 5);
  const topRowFeatures = displayFeatures.slice(0, 2);
  const bottomRowFeatures = displayFeatures.slice(2, 5);

  return (
    <Section>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
      />

      {/* Features Layout */}
      <div className="relative max-w-6xl mx-auto">
        {/* Top Row - 2 blocks */}
        <div className="relative flex flex-col md:flex-row justify-center gap-8 mb-8 md:mb-16">
          {topRowFeatures.map((feature, index) => (
            <FeatureBlock
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Bottom Row - 3 blocks */}
        <div className="relative flex flex-col md:flex-row justify-center gap-8">
          {bottomRowFeatures.map((feature, index) => (
            <FeatureBlock
              key={index + 2}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FeatureBlock({ title, description }: FeatureBlockProps) {
  return (
    <div className="relative product-card p-6 md:p-8 flex-1 max-w-md mx-auto md:mx-0 group">
      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-radial-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base md:text-lg text-light-gray-90 leading-relaxed mb-6">
        {description}
      </p>

      {/* Target Icon with Arrow */}
      <div className="flex items-center justify-center mt-4">
        <TargetIcon />
      </div>

      {/* Green glow effect on hover */}
      <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-[32px] shadow-glow-primary-feature" />
      </div>
    </div>
  );
}

function TargetIcon() {
  const uniqueId = useId();
  
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-90"
    >
      {/* Glow filter */}
      <defs>
        <filter id={uniqueId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer circle */}
      <circle
        cx="40"
        cy="40"
        r="35"
        stroke="rgba(19, 245, 132, 0.6)"
        strokeWidth="2"
        fill="none"
        filter={`url(#${uniqueId})`}
      />
      {/* Middle circle */}
      <circle
        cx="40"
        cy="40"
        r="25"
        stroke="rgba(19, 245, 132, 0.7)"
        strokeWidth="2"
        fill="none"
        filter={`url(#${uniqueId})`}
      />
      {/* Inner circle */}
      <circle
        cx="40"
        cy="40"
        r="15"
        stroke="rgba(19, 245, 132, 0.8)"
        strokeWidth="2"
        fill="none"
        filter={`url(#${uniqueId})`}
      />
      {/* Center dot */}
      <circle
        cx="40"
        cy="40"
        r="5"
        fill="rgba(19, 245, 132, 0.9)"
        filter={`url(#${uniqueId})`}
      />
      {/* Arrow */}
      <path
        d="M 20 40 L 30 40 M 25 35 L 30 40 L 25 45"
        stroke="rgba(19, 245, 132, 1)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${uniqueId})`}
      />
    </svg>
  );
}

