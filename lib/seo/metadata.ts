import type { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "./config";
import { routing } from "@/i18n/routing";
import type { PageMetadataOptions } from "@/types/seo";

/** Maps app locales to Open Graph locale codes (og:locale). */
const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  ar: "ar_AR",
};

function localizedPath(locale: string, path: string): string {
  const normalizedPath = path === "/" ? "" : path;
  return `/${locale}${normalizedPath}`;
}

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
  noFollow = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  locale = routing.defaultLocale,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getCanonicalUrl(localizedPath(locale, path));
  const ogImage = image || SEO_CONFIG.defaultOgImage;
  const fullOgImageUrl = ogImage.startsWith("http")
    ? ogImage
    : getCanonicalUrl(ogImage);

  const languageAlternates = Object.fromEntries(
    routing.locales.map((loc) => [loc, getCanonicalUrl(localizedPath(loc, path))])
  );

  const metadata: Metadata = {
    title: title === SEO_CONFIG.defaultTitle ? title : `${title} | ESAP AI`,
    description: description || SEO_CONFIG.defaultDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languageAlternates,
        "x-default": getCanonicalUrl(localizedPath(routing.defaultLocale, path)),
      },
    },
    openGraph: {
      type: type === "article" ? "article" : "website",
      url: canonicalUrl,
      title,
      description: description || SEO_CONFIG.defaultDescription,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: fullOgImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: OG_LOCALE_MAP[locale] || SEO_CONFIG.defaultLocale,
      alternateLocale: routing.locales
        .filter((loc) => loc !== locale)
        .map((loc) => OG_LOCALE_MAP[loc])
        .filter(Boolean),
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [],
        tags: tags || [],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || SEO_CONFIG.defaultDescription,
      images: [fullOgImageUrl],
      ...(SEO_CONFIG.twitterHandle ? { creator: `@${SEO_CONFIG.twitterHandle}` } : {}),
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: new URL(SEO_CONFIG.baseUrl),
  };

  return metadata;
}

/**
 * Generate metadata for the homepage
 */
export function generateHomeMetadata(locale: string = routing.defaultLocale): Metadata {
  return generateMetadata({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    path: "/",
    type: "website",
    locale,
  });
}

/**
 * Generate metadata for a product page
 */
export function generateProductMetadata(
  productName: string,
  productDescription: string,
  slug: string,
  locale: string = routing.defaultLocale
): Metadata {
  return generateMetadata({
    title: productName,
    description: productDescription,
    path: `/product/${slug}`,
    type: "product",
    locale,
  });
}

/**
 * Generate metadata for a service page
 */
export function generateServiceMetadata(
  serviceName: string,
  serviceDescription: string,
  slug: string,
  locale: string = routing.defaultLocale
): Metadata {
  return generateMetadata({
    title: serviceName,
    description: serviceDescription,
    path: `/service/${slug}`,
    type: "service",
    locale,
  });
}

/**
 * Generate metadata for a case study/article page
 */
export function generateCaseStudyMetadata(
  title: string,
  description: string,
  slug: string,
  publishedTime?: string,
  modifiedTime?: string,
  image?: string,
  locale: string = routing.defaultLocale
): Metadata {
  return generateMetadata({
    title,
    description,
    path: `/case-study/${slug}`,
    type: "article",
    publishedTime,
    locale,
    modifiedTime,
    image,
  });
}
