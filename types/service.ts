/**
 * Service-related type definitions
 */

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  duration?: string;
  title: string;
  description: string;
}

export interface ServiceContent {
  hero?: {
    subtitle?: string[];
    centerIcon?: string;
    centerIconAlt?: string;
  };
  features?: {
    title?: string;
    subtitle?: string;
    items?: ServiceFeature[];
  };
  youtubeVideo?: {
    videoId?: string;
    title?: string;
  };
  processSteps?: ServiceProcessStep[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  content?: ServiceContent;
}
