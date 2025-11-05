"use client";

import React from "react";
import { FeatureCard } from "@/components/ui/feature-card";
import { FeatureTitle } from "@/components/ui/feature-title";
import { FeatureDescription } from "@/components/ui/feature-description";
import { FeatureSkeleton } from "@/components/ui/feature-skeletons";

export interface AceternityFeature3Item {
  title: string;
  description: string;
  skeleton?: "image" | "gallery" | "youtube" | "globe";
  skeletonProps?: {
    imageUrl?: string;
    galleryImages?: string[];
    youtubeUrl?: string;
    youtubeThumbnail?: string;
  };
  className?: string;
}

interface AceternityFeatures3Props {
  title?: string;
  subtitle?: string;
  features: AceternityFeature3Item[];
  className?: string;
}

export function AceternityFeatures3({ 
  title, 
  subtitle, 
  features, 
  className 
}: AceternityFeatures3Props) {
  if (!features || features.length === 0) {
    return null;
  }

  // Default grid classes for features if not provided
  const defaultClassNames = [
    "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
    "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
    "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
    "col-span-1 lg:col-span-3 border-b lg:border-none",
  ];

  return (
    <div className={`relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-dark ${className || ""}`}>
      {(title || subtitle) && (
        <div className="px-8">
          {title && (
            <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-bold text-gradient-radial-white">
              {title}
            </h4>
          )}

          {subtitle && (
            <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-light-gray-90 text-center font-normal">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border border-white-opacity-20 rounded-[32px]">
          {features.map((feature, index) => {
            const featureClassName = feature.className || defaultClassNames[index % defaultClassNames.length];

            return (
              <FeatureCard key={feature.title} className={featureClassName}>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                <div className="h-full w-full">
                  <FeatureSkeleton skeleton={feature.skeleton} props={feature.skeletonProps} />
                </div>
              </FeatureCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}


