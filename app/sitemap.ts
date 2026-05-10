import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo/config";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { getCaseStudies } from "@/lib/case-studies";

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
    ...localizedUrls("", baseUrl, { lastModified: new Date(), changeFrequency: "daily", priority: 1.0 }),
    ...localizedUrls("about", baseUrl, { lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 }),
    ...localizedUrls("contact", baseUrl, { lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }),
    ...localizedUrls("case-study", baseUrl, { lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 }),
    ...localizedUrls("privacy", baseUrl, { lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 }),
    ...localizedUrls("terms", baseUrl, { lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 }),
  ];

  const productRoutes: MetadataRoute.Sitemap = products.flatMap((product) =>
    localizedUrls(`product/${product.slug}`, baseUrl, { lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 })
  );

  const serviceRoutes: MetadataRoute.Sitemap = services.flatMap((service) =>
    localizedUrls(`service/${service.slug}`, baseUrl, { lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 })
  );

  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await getCaseStudies();
    caseStudyRoutes = caseStudies.flatMap((caseStudy) =>
      localizedUrls(`case-study/${caseStudy.slug}`, baseUrl, {
        lastModified: caseStudy.publishedAt ? new Date(caseStudy.publishedAt) : new Date(),
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
