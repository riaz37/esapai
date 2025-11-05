import React from "react";

interface FeatureTitleProps {
  children?: React.ReactNode;
}

export function FeatureTitle({ children }: FeatureTitleProps) {
  return (
    <h3 className="max-w-5xl mx-auto text-left tracking-tight text-gradient-radial-white text-xl md:text-2xl md:leading-snug font-bold mb-2">
      {children}
    </h3>
  );
}

