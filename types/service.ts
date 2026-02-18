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
    heroTitle?: React.ReactNode; // Keeping for compatibility temporarily
  };
  features?: {
    title?: string;
    subtitle?: string;
    items?: { title: string; description: string }[];
  };
  youtubeVideo?: {
    videoId?: string;
    title?: string;
  };
  processSteps?: { duration?: string; title: string; description: string }[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  content?: ServiceContent;
}
