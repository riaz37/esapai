/**
 * Product-related type definitions
 */

export interface MissionCard {
  title: string;
  description: string;
  icon?: any; // Generic type to allow component or string
  image?: string;
}

interface AutomationFeature {
  title: string;
  description: string;
}

export interface PerformanceMetric {
  value: string;
  label: string;
}

export interface ProductContent {
  hero?: {
    subtitle?: string[];
    centerIcon?: string;
    centerIconAlt?: string;
    /** Hero background video (e.g. /productvideo1.mp4). When set, used as cinematic hero background. Falls back to gradient when not set. */
    demoVideo?: string;
    /** Complementary tagline for the hero title (e.g. Knowledge Synthesis) */
    tagline?: string;
  };
  mission?: {
    title?: string;
    subtitle?: string;
    cards?: MissionCard[];
  };
  automationHub?: {
    title?: string;
    subtitle?: string;
    features?: AutomationFeature[];
  };
  youtubeVideo?: {
    videoId?: string;
    title?: string;
  };
  performance?: {
    metrics?: PerformanceMetric[];
  };
  aceternityFeatures?: {
    title?: string;
    subtitle?: string;
    features?: { title: string; description: string; className?: string }[];
    className?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  menuDescription?: string; // Shorter description for navbar menu
  slug: string;
  icon?: string;
  content?: ProductContent;
}
