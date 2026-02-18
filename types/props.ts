/**
 * Component props type definitions
 */

import type { ReactNode } from "react";
import type { CaseStudyWithUrls } from "./case-study";
import type { MissionCard } from "./product";
import type { LucideIcon } from "lucide-react";

// Hero Components
export interface ProductHeroProps {
  title: string;
  subtitle: string[];
  centerIcon?: string;
  centerIconAlt?: string;
  productSlug?: string;
  tagline?: string;
}

export interface ServiceHeroProps {
  titleMain?: string;
  titleHighlight?: string;
  subtitle: string[];
  description?: string;
  className?: string;
}

export interface CaseStudyHeroProps {
  caseStudy: CaseStudyWithUrls;
}

// Feature Components
export interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  features: FeatureBlockProps[];
}

export interface FeatureBlockProps {
  title: string;
  description: string;
}

// Section Components
export interface MissionProps {
  title?: string;
  subtitle?: string;
  cards?: MissionCard[];
}

export interface TimelineProps {
  timeline: CaseStudyWithUrls["timeline"];
}

export interface ServicesCTASectionProps {
  title?: string;
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

export interface LazySectionProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string;
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
  animate?: boolean;
}

export interface WorldProps {
  globeConfig: import("./ui").GlobeConfig;
  data: import("./three").Position[];
}

export interface StructuredDataProps {
  data: import("./seo").StructuredData | import("./seo").StructuredData[];
}

export type CircleProps = React.SVGProps<SVGSVGElement>;
