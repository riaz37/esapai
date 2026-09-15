import { SEO_CONFIG, getFullUrl, getLocalizedUrl } from "./config";
import type {
  StructuredData,
  BreadcrumbItem,
  ArticleSchemaOptions,
  ProductSchemaOptions,
  ServiceSchemaOptions,
} from "@/types/seo";

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
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    description: SEO_CONFIG.defaultDescription,
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
    publisher,
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
    publisher: {
      "@type": "Organization",
      name: publisher?.name || SEO_CONFIG.organization.name,
      ...(publisher?.logo && { logo: publisher.logo }),
    },
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
 * Generate Product structured data (JSON-LD)
 */

export function generateProductSchema(
  options: ProductSchemaOptions
): StructuredData {
  const { name, description, image, url, brand, category, offers, locale } = options;

  const schema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: getLocalizedUrl(locale, url),
    ...(brand && { brand: { "@type": "Brand", name: brand } }),
    ...(category && { category }),
    ...(offers && {
      offers: {
        "@type": "Offer",
        ...(offers.price && { price: offers.price }),
        ...(offers.priceCurrency && { priceCurrency: offers.priceCurrency }),
        ...(offers.availability && { availability: offers.availability }),
      },
    }),
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
    ...(provider && {
      provider: {
        "@type": "Organization",
        name: provider.name,
        ...(provider.url && { url: provider.url }),
      },
    }),
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
