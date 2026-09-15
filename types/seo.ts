/**
 * SEO and metadata type definitions
 */

export interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  type?: "website" | "article" | "product" | "service";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  /** Locale this page is rendered for. Drives the self-referencing canonical and hreflang alternates. */
  locale?: string;
}

/**
 * Base interface for structured data
 */
export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ArticleSchemaOptions {
  headline: string;
  description: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author?: string | string[];
  publisher?: {
    name: string;
    logo?: string;
  };
  url: string;
  /** Locale this schema is rendered for — used to build the locale-prefixed mainEntityOfPage URL. */
  locale: string;
  /** CSS selectors identifying the DOM regions (e.g. headline, summary) that answer voice/AI-assistant queries. */
  speakable?: string[];
}

export interface ProductSchemaOptions {
  name: string;
  description: string;
  image?: string | string[];
  url: string;
  brand?: string;
  category?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
  /** Locale this schema is rendered for — used to build the locale-prefixed url. */
  locale: string;
}

export interface ServiceSchemaOptions {
  name: string;
  description: string;
  image?: string | string[];
  url: string;
  provider?: {
    name: string;
    url?: string;
  };
  areaServed?: string;
  serviceType?: string;
  /** Locale this schema is rendered for — used to build the locale-prefixed url. */
  locale: string;
}
