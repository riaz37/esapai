import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo/config";

/**
 * Generate robots.txt with AI crawler instructions
 */
export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${SEO_CONFIG.baseUrl.replace(/\/$/, "")}/sitemap.xml`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Disallow API routes
          "/_next/", // Disallow Next.js internal files
          "/admin/", // Disallow admin pages if any
        ],
      },
      // AI Crawler Instructions
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: sitemapUrl,
  };
}
