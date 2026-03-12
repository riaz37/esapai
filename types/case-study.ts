/**
 * Case study-related type definitions
 */

import type { SanityImage } from "./sanity";

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  images: Array<SanityImage>;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  subtitle: string;
  tags: string[];
  thumbnail?: SanityImage | null;
  heroImages: Array<SanityImage>;
  timeline: TimelineEntry[];
  publishedAt: string;
  featured: boolean;
}

export interface CaseStudyWithUrls extends Omit<CaseStudy, "heroImages" | "timeline" | "slug" | "thumbnail"> {
  slug: string;
  thumbnail?: {
    url: string;
    alt?: string;
  } | null;
  heroImages: Array<{
    url: string;
    alt?: string;
  }>;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    images: Array<{
      url: string;
      alt?: string;
    }>;
  }>;
}

export interface CaseStudyListingParams {
  locale?: string;
  page?: number | string | string[];
  pageSize?: number | string | string[];
  tag?: string | string[] | null;
}

export interface PaginatedCaseStudiesResult {
  items: CaseStudyWithUrls[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  activeTag: string | null;
  availableTags: string[];
}
