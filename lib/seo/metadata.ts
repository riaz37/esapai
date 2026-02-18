import type { Metadata } from "next";
import { SEO_CONFIG, getCanonicalUrl } from "./config";
import type { PageMetadataOptions } from "@/types/seo";

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
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = image || SEO_CONFIG.defaultOgImage;
  const fullOgImageUrl = ogImage.startsWith("http")
    ? ogImage
    : getCanonicalUrl(ogImage);

  const metadata: Metadata = {
    title: title === SEO_CONFIG.defaultTitle ? title : `${title} | ESAP AI`,
    description: description || SEO_CONFIG.defaultDescription,
    alternates: {
      canonical: canonicalUrl,
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
      locale: SEO_CONFIG.defaultLocale,
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
export function generateHomeMetadata(): Metadata {
  return generateMetadata({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    path: "/",
    type: "website",
  });
}

/**
 * Generate metadata for a product page
 */
export function generateProductMetadata(
  productName: string,
  productDescription: string,
  slug: string
): Metadata {
  return generateMetadata({
    title: productName,
    description: productDescription,
    path: `/product/${slug}`,
    type: "product",
  });
}

/**
 * Generate metadata for a service page
 */
export function generateServiceMetadata(
  serviceName: string,
  serviceDescription: string,
  slug: string
): Metadata {
  return generateMetadata({
    title: serviceName,
    description: serviceDescription,
    path: `/service/${slug}`,
    type: "service",
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
  image?: string
): Metadata {
  return generateMetadata({
    title,
    description,
    path: `/case-study/${slug}`,
    type: "article",
    publishedTime,
    modifiedTime,
    image,
  });
}
