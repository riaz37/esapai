/**
 * Service-related type definitions
 */

interface ServiceContent {
  hero?: {
    subtitle?: string[];
    centerIcon?: string;
    centerIconAlt?: string;
    /** Main part of the title */
    titleMain?: string;
    /** Highlighted part of the title */
    titleHighlight?: string;
    heroTitle?: React.ReactNode;
    demoVideo?: string;
    heroVideo?: string;
  };
  features?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    centralNode?: string;
    items?: { title: string; description: string }[];
  };
  youtubeVideo?: {
    videoId?: string;
    title?: string;
  };
  problem?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    items?: { title: string; description: string }[];
  };
  process?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    steps?: { title: string; description: string }[];
  };
  beforeAfter?: {
    label?: string;
    title?: string;
  };
  cta?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  content?: ServiceContent;
}
