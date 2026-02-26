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

export interface CinematicProblemText {
  title: string;
  description: string;
  solTitle: string;
  solDesc: string;
  solImpact: string;
}

export interface JourneyLayer {
  title: string;
  nodes: string[];
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
  exploreButton?: string;
  outcomes?: {
    title?: string;
    badge?: string;
  };
  demo?: {
    title?: string;
    subtitle?: string;
    badge?: string;
  };
  cta?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
  architecture?: {
    title?: string;
    badge?: string;
    subtitle?: string;
    reelImages?: string[];
  };
  cinematic?: {
    challenges?: {
      badge?: string;
      titlePart1?: string;
      titlePart2?: string;
      subtitle?: string;
    };
    narrative?: {
      introLine?: string;
      problemsIntroLine?: string;
      epiphanyPreLine?: string;
      solutionIntroLine?: string;
      recapLine?: string;
    };
    problems?: CinematicProblemText[];
  };
  journey?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    stages?: string[];
    layers?: JourneyLayer[];
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
