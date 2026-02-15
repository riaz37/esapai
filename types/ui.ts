/**
 * UI component type definitions
 */

import type { ReactNode } from "react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  ambientIntensity?: number;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  directionalRightLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type SectionProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "className" | "children"
> & {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerMaxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "5xl" | "7xl" | "wide" | "full" | "standard";
  background?: "dark" | "transparent" | string;
  padding?: "none" | "sm" | "md" | "lg";
  overflow?: "hidden" | "visible";
  withContainer?: boolean;
};

export interface ProductFeatureItem {
  title: string;
  description: string;
  className?: string;
}
