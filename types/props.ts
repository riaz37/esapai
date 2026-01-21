/**
 * Component props type definitions
 */

import type { ReactNode, MouseEvent, CSSProperties } from "react";
import type { Product } from "./product";
import type { Service } from "./service";
import type { CaseStudyWithUrls } from "./case-study";
import type { MissionCard, AutomationFeature } from "./product";
import type { TeamMember } from "./ui";
import type { PerformanceMetric } from "./product";
import type * as THREE from "three";
import type { LucideIcon } from "lucide-react";

// Hero Components
export interface ProductHeroProps {
  title: string;
  subtitle: string[];
  centerIcon?: string;
  centerIconAlt?: string;
  productSlug?: string;
}

export interface ServiceHeroProps {
  title: string;
  subtitle: string[];
  description?: string;
}

export interface CaseStudyHeroProps {
  caseStudy: CaseStudyWithUrls;
}

// Feature Components
export interface ProductFeaturesProps {
  title?: string;
  subtitle?: string;
  features: import("./ui").ProductFeatureItem[];
  className?: string;
}

export interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  features: FeatureBlockProps[];
}

export interface FeatureBlockProps {
  title: string;
  description: string;
}

export interface AutomationHubProps {
  title?: string;
  subtitle?: string;
  features?: AutomationFeature[];
}

export interface AutomationHubFeatureCardProps {
  title: string;
  description: string;
  className?: string;
  index: number;
}

// Section Components
export interface MissionProps {
  title?: string;
  subtitle?: string;
  cards?: MissionCard[];
}

export interface TeamProps {
  members?: TeamMember[];
}

export interface TimelineProps {
  timeline: CaseStudyWithUrls["timeline"];
}

export interface TimelineEntryProps {
  entry: CaseStudyWithUrls["timeline"][0];
  entryRef: (el: HTMLDivElement | null) => void;
}

export interface ServicesGridSectionProps {
  services: Service[];
}

export interface ServicesHeaderSectionProps {
  title: string;
  subtitle: string;
  subtitleClassName?: string;
}

export interface ServicesCTASectionProps {
  text: string;
  buttonText: string;
  buttonHref: string;
}

// UI Components
export interface AnimatedSVGLoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white" | "gray";
  className?: string;
}

export interface GlobalLoaderProps {
  className?: string;
  message?: string;
  subMessage?: string;
}

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  glowColor?: string;
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface InteractiveProductIconHaloProps {
  children: ReactNode;
  scale?: number;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export interface BurstParticle {
  id: string;
  x: number;
  y: number;
  color: string;
}

export interface ParticleItemProps {
  x: number;
  y: number;
  color: string;
}

export interface GridFloorProps {
  className?: string;
  perspective?: "normal" | "dramatic";
}

export interface InstancedGridProps {
  gridSize: number;
}

export interface ConcaveFloorProps {
  className?: string;
  intensity?: number;
}

export type RingParticle = {
  x: number;
  y: number;
  z: number;
  baseScale: number;
  angle: number;
  ringIndex: number;
  phase: number;
};

export interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

export interface LazyThreeWrapperProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export interface LazySectionProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string;
}

export interface ServiceItemProps {
  title: string | ReactNode;
  description?: string;
  iconPosition: "left" | "right";
  layout?: "stacked" | "absolute";
  positionClassName?: string;
  positionStyle?: CSSProperties;
  descriptionClassName?: string;
  iconSrc?: string;
  iconAlt?: string;
  className?: string;
  href?: string;
}

export interface MissionCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ElementType;
  className?: string;
}

export interface TeamCardProps {
  member: TeamMember;
  isLarge?: boolean;
  isWide?: boolean;
  className?: string;
}

export interface FeatureCardProps {
  children?: ReactNode;
  className?: string;
}

export interface CaseStudyCardProps {
  caseStudy: CaseStudyWithUrls;
}

export interface FeatureTitleProps {
  children: ReactNode;
  className?: string;
}

export interface FeatureDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface SectionHeaderProps {
  title: string | ReactNode;
  subtitle?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  align?: "center" | "left" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export interface UITimelineEntry {
  title: string;
  content: ReactNode;
}

export type BackgroundRippleEffectProps = {
  rows?: number;
  cols?: number;
  cellSize?: number;
  className?: string;
  gridClassName?: string;
  mask?: boolean;
  interactive?: boolean;
  auto?: boolean;
  autoIntervalMs?: number;
  triggerPoint?: { x: number; y: number } | null;
  triggerKey?: number;
};

export type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
  style?: CSSProperties;
};

export type CellStyle = CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

export interface GridUniforms extends Record<string, THREE.IUniform<any>> {
  uTime: THREE.IUniform<number>;
  uColorMain: THREE.IUniform<THREE.Color>;
  uColorAccent: THREE.IUniform<THREE.Color>;
}

export interface WorldProps {
  globeConfig: import("./ui").GlobeConfig;
  data: import("./three").Position[];
}

export interface StructuredDataProps {
  data: import("./seo").StructuredData | import("./seo").StructuredData[];
}

export interface CardContentRefs {
  icon: HTMLElement | null;
  title: HTMLElement | null;
  description: HTMLElement | null;
  cta: HTMLElement | null;
}

export type CircleProps = React.SVGProps<SVGSVGElement>;

export interface PerformanceMetricProps {
  metric: PerformanceMetric;
  index: number;
}

export interface PerformanceSectionProps {
  metrics?: PerformanceMetric[];
}
