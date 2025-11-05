import React from "react";

interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {/* Main Title */}
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient-radial-white leading-tight ${titleClassName}`}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-lg md:text-xl text-center text-white-opacity-70 max-w-4xl mx-auto mb-16 ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

