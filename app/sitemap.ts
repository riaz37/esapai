import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo/config";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { getCaseStudies } from "@/lib/case-studies";
import { getGitLastModified } from "@/lib/seo/last-modified";

const locales = ["en", "ar"];

function localizedUrls(
  path: string,
  baseUrl: string,
  options: Omit<MetadataRoute.Sitemap[number], "url">
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: path === "" ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}/${path}`,
    ...options,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.baseUrl.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    ...localizedUrls("", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/page.tsx"),
      changeFrequency: "weekly",
      priority: 1.0,
    }),
    ...localizedUrls("about", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/about/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...localizedUrls("contact", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/contact/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
    ...localizedUrls("case-study", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/case-study/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...localizedUrls("product", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/product/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...localizedUrls("service", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/service/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    ...localizedUrls("privacy", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/privacy/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
    ...localizedUrls("terms", baseUrl, {
      lastModified: getGitLastModified("app/[locale]/terms/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    }),
  ];

  const productRoutes: MetadataRoute.Sitemap = products.flatMap((product) =>
    localizedUrls(`product/${product.slug}`, baseUrl, {
      lastModified: getGitLastModified("lib/products.ts"),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const serviceRoutes: MetadataRoute.Sitemap = services.flatMap((service) =>
    localizedUrls(`service/${service.slug}`, baseUrl, {
      lastModified: getGitLastModified("lib/services.ts"),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await getCaseStudies();
    caseStudyRoutes = caseStudies.flatMap((caseStudy) =>
      localizedUrls(`case-study/${caseStudy.slug}`, baseUrl, {
        lastModified: caseStudy._updatedAt
          ? new Date(caseStudy._updatedAt)
          : caseStudy.publishedAt
            ? new Date(caseStudy.publishedAt)
            : undefined,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to load case studies for sitemap:", error);
    }
  }

  return [
    ...staticRoutes,
    ...productRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
  ];
}
