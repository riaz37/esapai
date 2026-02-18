import React from "react";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types/ui";

const containerMaxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
  wide: "max-w-[1400px]",
  full: "max-w-full",
  standard: "", // Uses default tailwind container max-widths
};

const paddingClasses = {
  none: "",
  sm: "py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12",
  md: "py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12",
  lg: "py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12",
};

const backgroundClasses = {
  dark: "bg-[#09090b]", // Solid background to prevent bleed-through
  transparent: "bg-transparent",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section(
    {
      children,
      className = "",
      containerClassName = "",
      containerMaxWidth = "wide",
      background = "dark",
      padding = "md",
      overflow = "hidden",
      withContainer = true,
      ...props
    },
    ref
  ) {
    const backgroundClass =
      typeof background === "string" && background in backgroundClasses
        ? backgroundClasses[background as keyof typeof backgroundClasses]
        : background === "dark"
          ? "bg-[#09090b]"
          : "";

    // Content inside the section - either wrapped in a container or not
    const content = withContainer ? (
      <div
        className={cn(
          "relative container mx-auto z-10",
          containerMaxWidthClasses[containerMaxWidth],
          containerClassName
        )}
      >
        {children}
      </div>
    ) : (
      children
    );

    return (
      <section
        ref={ref}
        {...props}
        className={cn(
          "relative w-full",
          paddingClasses[padding],
          overflow === "hidden" ? "overflow-hidden" : "overflow-visible",
          backgroundClass,
          className
        )}
      >
        {content}
      </section>
    );
  }
);

