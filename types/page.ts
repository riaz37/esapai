/**
 * Page component props type definitions
 */

import type { ReactNode } from "react";

export interface ProductSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface ServiceSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface CaseStudySlugPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export interface ProductPageClientProps {
  slug: string;
  initialProduct: import("./product").Product;
}

export interface ServicePageClientProps {
  slug: string;
  initialService: import("./service").Service;
}

export interface CaseStudyPageClientProps {
  slug: string;
  locale: string;
  initialCaseStudy: import("./case-study").CaseStudyWithUrls;
}

export interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export interface LegalParagraphProps {
  children: ReactNode;
}

export interface LegalListProps {
  items: string[];
  ordered?: boolean;
}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
