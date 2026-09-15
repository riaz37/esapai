import { SEO_CONFIG } from "@/lib/seo/config";

/**
 * Content-Signal declares how crawlers may use this site's content:
 * search (indexing/search results), ai-input (live AI-assistant answers),
 * ai-train (training third-party models). We allow search + ai-input,
 * disallow ai-train.
 */
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

interface RobotsRule {
  userAgent: string;
  allow?: string;
  disallow: string[];
  crawlDelay?: number;
}

const COMMON_DISALLOW = ["/api/", "/_next/"];

const RULES: RobotsRule[] = [
  { userAgent: "*", allow: "/", disallow: [...COMMON_DISALLOW, "/admin/"] },
  // AI Crawler Instructions
  { userAgent: "GPTBot", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "ChatGPT-User", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "CCBot", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "anthropic-ai", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "Claude-Web", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "Google-Extended", allow: "/", disallow: COMMON_DISALLOW },
  { userAgent: "PerplexityBot", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "Applebot-Extended", allow: "/", disallow: COMMON_DISALLOW },
  { userAgent: "OAI-SearchBot", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "meta-externalagent", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "cohere-ai", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "Bytespider", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "ClaudeBot", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "GoogleOther", allow: "/", disallow: COMMON_DISALLOW },
  { userAgent: "Amazonbot", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
  { userAgent: "FacebookBot", allow: "/", disallow: COMMON_DISALLOW, crawlDelay: 1 },
];

function buildRobotsTxt(): string {
  const sitemapUrl = `${SEO_CONFIG.baseUrl.replace(/\/$/, "")}/sitemap.xml`;

  const blocks = RULES.map((rule) => {
    const lines = [`User-agent: ${rule.userAgent}`];
    if (rule.allow) {
      lines.push(`Allow: ${rule.allow}`);
    }
    for (const path of rule.disallow) {
      lines.push(`Disallow: ${path}`);
    }
    if (rule.crawlDelay) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }
    lines.push(`Content-Signal: ${CONTENT_SIGNAL}`);
    return lines.join("\n");
  });

  return `${blocks.join("\n\n")}\n\nSitemap: ${sitemapUrl}\n`;
}

export function GET(): Response {
  return new Response(buildRobotsTxt(), {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
