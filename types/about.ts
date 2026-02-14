/**
 * Types for About page content (founding story, etc.)
 */

export interface FoundingStoryPhase {
  id: string;
  phaseLabel?: string;
  title: string;
  body: string;
  quote?: string;
  highlight?: string;
}

export interface FoundingStoryConfig {
  hook: string;
  phases: FoundingStoryPhase[];
  visionTitle: string;
  visionBody: string;
  closing: string;
}
