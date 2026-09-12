/**
 * SEO Configuration
 * Central configuration for SEO-related constants and settings
 */

/**
 * Force the canonical www host regardless of how NEXT_PUBLIC_SITE_URL is set.
 * esap.ai (apex) redirects to www.esap.ai at the domain level — canonicals,
 * the sitemap, and structured data must all point at the same host that
 * serves the final 200 response.
 */
function normalizeBaseUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    if (url.hostname === "esap.ai") {
      url.hostname = "www.esap.ai";
    }
    return url.origin;
  } catch {
    return rawUrl.replace(/\/$/, "");
  }
}

export const SEO_CONFIG = {
  /**
   * Base URL of the website
   * Can be overridden with NEXT_PUBLIC_SITE_URL environment variable
   */
  baseUrl: normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://www.esap.ai"),

  /**
   * Site name
   */
  siteName: "ESAP AI",

  /**
   * Default site description
   */
  defaultDescription:
    "Empowering businesses with cutting-edge AI solutions, intelligent automation, and agentic AI integration. ESAP AI provides comprehensive AI products and services to transform your business operations.",

  /**
   * Default site title template
   */
  titleTemplate: "%s | ESAP AI",

  /**
   * Default site title
   */
  defaultTitle: "ESAP AI - Empowering Businesses with AI Solutions",

  /**
   * Organization information for structured data
   */
  organization: {
    name: "ESAP AI",
    url: "https://www.esap.ai/",
    logo: "https://www.esap.ai/logo/esaplogo.svg",
    description:
      "ESAP AI leads the way in embedding AI into daily workflows, creating intelligent infrastructure for tomorrow.",
    sameAs: [
      "https://www.facebook.com/esapai.official/",
      "https://x.com/esap_ai",
      "https://www.linkedin.com/company/esapai/",
      "https://www.instagram.com/esapai.official/",
      "https://www.youtube.com/channel/UC7LyRbfXwb7at1gCQpUMzGg",
    ],
  },

  /**
   * Default Open Graph image
   */
  defaultOgImage: (() => {
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.esap.ai/").replace(/\/$/, "");
    return `${baseUrl}/og-image.png`;
  })(),

  /**
   * Twitter handle (without @)
   */
  twitterHandle: "esap_ai",

  /**
   * Default language
   */
  defaultLanguage: "en",

  /**
   * Default locale
   */
  defaultLocale: "en_US",
} as const;

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string): string {
  const baseUrl = SEO_CONFIG.baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get canonical URL for a given path
 */
export function getCanonicalUrl(path: string): string {
  return getFullUrl(path);
}
