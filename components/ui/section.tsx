import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  containerMaxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  background?: "dark" | "transparent" | string;
  padding?: "none" | "sm" | "md" | "lg";
  overflow?: "hidden" | "visible";
}

const containerMaxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const paddingClasses = {
  none: "",
  sm: "py-10 px-4",
  md: "py-20 px-4",
  lg: "py-32 px-4",
};

const backgroundClasses = {
  dark: "bg-dark",
  transparent: "bg-transparent",
};

export function Section({
  children,
  className = "",
  containerClassName = "",
  containerMaxWidth = "7xl",
  background = "dark",
  padding = "md",
  overflow = "hidden",
}: SectionProps) {
  const backgroundClass =
    typeof background === "string" && background in backgroundClasses
      ? backgroundClasses[background as keyof typeof backgroundClasses]
      : background === "dark"
      ? "bg-dark"
      : "";

  return (
    <section
      className={cn(
        "relative w-full",
        paddingClasses[padding],
        overflow === "hidden" ? "overflow-hidden" : "overflow-visible",
        backgroundClass,
        className
      )}
    >
      <div
        className={cn(
          "relative container mx-auto z-10",
          containerMaxWidthClasses[containerMaxWidth],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

