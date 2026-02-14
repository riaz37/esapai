"use client";

import React from "react";
import { FeatureCard, FeatureTitle, FeatureDescription } from "@/components/ui";
import type { ProductFeatureItem } from "@/types/ui";
import type { ProductFeaturesProps } from "@/types/props";

export type { ProductFeatureItem };

export function ProductFeatures({
  title,
  subtitle,
  features,
  className,
}: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  const defaultClassNames = [
    "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
    "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
    "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
    "col-span-1 lg:col-span-3 border-b lg:border-none",
  ];

  return (
    <div
      className={`relative z-20 py-10 lg:py-40 max-w-[1400px] mx-auto bg-dark ${className || ""
        }`}
    >
      {(title || subtitle) && (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12">
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
            const featureClassName =
              feature.className ||
              defaultClassNames[index % defaultClassNames.length];

            return (
              <FeatureCard key={feature.title} className={featureClassName}>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}



