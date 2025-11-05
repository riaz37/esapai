import React from "react";
import { cn } from "@/lib/utils";

interface FeatureDescriptionProps {
  children?: React.ReactNode;
}

export function FeatureDescription({ children }: FeatureDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-light-gray-90 font-normal",
        "text-left max-w-sm mx-0 md:text-sm my-2 leading-relaxed"
      )}
    >
      {children}
    </p>
  );
}

