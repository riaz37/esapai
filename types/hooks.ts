/**
 * Hook-related type definitions
 */

import type { Product } from "./product";
import type { Service } from "./service";
import type { CaseStudyWithUrls } from "./case-study";

export interface UseProductContentOptions {
  initialProduct?: Product | null;
}

export interface UseProductContentResult {
  product: Product | null;
  loading: boolean;
  isFetching: boolean;
  error: string | null;
}

export interface UseServiceContentOptions {
  initialService?: Service | null;
}

export interface UseServiceContentResult {
  service: Service | null;
  loading: boolean;
  isFetching: boolean;
  error: string | null;
}

export interface UseCaseStudyContentOptions {
  enabled?: boolean;
  initialCaseStudy?: CaseStudyWithUrls | null;
  revalidateOnMount?: boolean;
}

export interface UseCaseStudyContentResult {
  caseStudy: CaseStudyWithUrls | null;
  loading: boolean;
  isFetching: boolean;
  error: string | null;
}

// Note: UseInViewOptions and InViewMargin are defined inline in use-intersection-animation.ts
// to avoid importing the function at type level
// InViewMargin is defined inline in use-intersection-animation.ts
// to avoid circular dependencies with motion/react
