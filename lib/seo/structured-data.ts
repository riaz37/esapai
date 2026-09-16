import { SEO_CONFIG, getFullUrl, getLocalizedUrl } from "./config";
import type {
  StructuredData,
  BreadcrumbItem,
  ArticleSchemaOptions,
  ProductSchemaOptions,
  ServiceSchemaOptions,
} from "@/types/seo";

/**
 * Canonical @id for the single Organization node emitted once in the root
 * layout. Other schema (Article publisher, Service provider, ContactPage
 * mainEntity, etc.) reference this by @id instead of duplicating the
 * Organization object inline on every page.
 */
const ORGANIZATION_ID = `${SEO_CONFIG.baseUrl}/#organization`;

/**
 * Canonical @id for the single WebSite node emitted once in the root layout.
 */
const WEBSITE_ID = `${SEO_CONFIG.baseUrl}/#website`;

type CollectionPageSchemaOptions = {
  name: string;
  description: string;
  url: string;
  items: Array<{
    headline: string;
    url: string;
    image?: string;
  }>;
  /** Locale this schema is rendered for — used to build locale-prefixed URLs. */
  locale: string;
};

/**
 * Generate Organization structured data (JSON-LD)
 */
export function generateOrganizationSchema(): StructuredData {
  const { organization } = SEO_CONFIG;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    name: organization.name,
    url: organization.url,
    logo: { "@type": "ImageObject", url: organization.logo },
    description: organization.description,
    address: {
      "@type": "PostalAddress",
      ...organization.address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      ...organization.contactPoint,
    },
    knowsAbout: organization.knowsAbout,
    ...(organization.sameAs.length > 0 && {
      sameAs: organization.sameAs,
    }),
  };
}

/**
 * Generate Website structured data (JSON-LD)
 */
export function generateWebsiteSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    description: SEO_CONFIG.defaultDescription,
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList structured data (JSON-LD)
 */

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  locale: string
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getLocalizedUrl(locale, item.url),
    })),
  };
}

/**
 * Generate Article structured data (JSON-LD) for case studies
 */

export function generateArticleSchema(
  options: ArticleSchemaOptions
): StructuredData {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    url,
    locale,
    speakable,
  } = options;

  const schema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    ...(dateModified && { dateModified }),
    ...(speakable &&
      speakable.length > 0 && {
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: speakable,
        },
      }),
    ...(author && {
      author: Array.isArray(author)
        ? author.map((name) => ({
            "@type": "Person",
            name,
          }))
        : {
            "@type": "Person",
            name: author,
          },
    }),
    // Publisher is always ESAP AI itself in this codebase — reference the
    // single canonical Organization node by @id instead of duplicating its
    // name/logo inline on every article.
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getLocalizedUrl(locale, url),
    },
  };

  if (image) {
    schema.image = Array.isArray(image)
      ? image.map((img) => getFullUrl(img))
      : getFullUrl(image);
  }

  return schema;
}

/**
 * Generate SoftwareApplication structured data (JSON-LD) for product pages.
 *
 * Uses `SoftwareApplication` rather than `Product` because these are software
 * products, not physical/e-commerce goods, and `applicationCategory` gives
 * search engines an accurate classification. `offers` (and any rating/review
 * fields) are intentionally never emitted here — there is no public pricing
 * to report, and fabricating price/rating data would violate schema.org's
 * structured-data guidelines.
 */

export function generateProductSchema(
  options: ProductSchemaOptions
): StructuredData {
  const { name, description, image, url, brand, category, locale } = options;

  const schema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: getLocalizedUrl(locale, url),
    applicationCategory: "BusinessApplication",
    ...(brand && { brand: { "@type": "Brand", name: brand } }),
    ...(category && { category }),
  };

  if (image) {
    schema.image = Array.isArray(image)
      ? image.map((img) => getFullUrl(img))
      : getFullUrl(image);
  }

  return schema;
}

/**
 * Generate Service structured data (JSON-LD)
 */

export function generateServiceSchema(
  options: ServiceSchemaOptions
): StructuredData {
  const { name, description, image, url, provider, areaServed, serviceType, locale } =
    options;

  const schema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: getLocalizedUrl(locale, url),
    // The provider is always ESAP AI itself in this codebase — reference the
    // single canonical Organization node by @id instead of duplicating its
    // name/url inline on every service.
    ...(provider && { provider: { "@id": ORGANIZATION_ID } }),
    ...(areaServed && { areaServed }),
    ...(serviceType && { serviceType }),
  };

  if (image) {
    schema.image = Array.isArray(image)
      ? image.map((img) => getFullUrl(img))
      : getFullUrl(image);
  }

  return schema;
}

/**
 * Generate CollectionPage structured data (JSON-LD) for list pages
 */
export function generateCollectionPageSchema(
  options: CollectionPageSchemaOptions
): StructuredData {
  const { name, description, url, items, locale } = options;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: getLocalizedUrl(locale, url),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: item.headline,
          url: getLocalizedUrl(locale, item.url),
          ...(item.image && { image: getFullUrl(item.image) }),
        },
      })),
    },
  };
}

/**
 * Generate ContactPage structured data (JSON-LD) for the contact page.
 * Points `about`/`mainEntity` at the single canonical Organization node
 * (by @id) rather than re-declaring its address/phone/email inline —
 * those facts already live once on the Organization schema.
 */
export function generateContactPageSchema(
  url: string,
  locale: string
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: getLocalizedUrl(locale, url),
    name: `Contact ${SEO_CONFIG.siteName}`,
    about: { "@id": ORGANIZATION_ID },
    mainEntity: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
