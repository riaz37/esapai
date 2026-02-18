import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { validateImageUrl } from "@/lib/security/url-validator";
import type {
  TimelineEntry,
  CaseStudy,
  CaseStudyWithUrls,
} from "@/types/case-study";
import type { SanityImage } from "@/types/sanity";

const CASE_STUDY_QUERY = `*[_type == "caseStudy"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  subtitle,
  tags,
  thumbnail,
  heroImages,
  timeline,
  publishedAt,
  featured
}`;

const CASE_STUDY_BY_SLUG_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  subtitle,
  tags,
  thumbnail,
  heroImages,
  timeline,
  publishedAt,
  featured
}`;


/**
 * Transform Sanity image references to URLs with validation
 */
function transformImages(
  images: SanityImage[] | undefined | null
): Array<{ url: string; alt?: string }> {
  if (!images || !Array.isArray(images)) {
    return [];
  }
  return images
    .filter((image) => image && image.asset)
    .map((image) => {
      const generatedUrl = urlFor(image).width(1200).height(800).url();
      const validation = validateImageUrl(generatedUrl);
      
      if (validation.isValid) {
        return {
          url: validation.url,
          alt: image.alt || "",
        };
      }
      
      // If validation fails, return empty string (will trigger fallback)
      // Log in development only
      if (process.env.NODE_ENV === "development") {
        console.warn("Invalid image URL detected:", validation.error, generatedUrl);
      }
      
      return {
        url: "",
        alt: image.alt || "",
      };
    })
    .filter((img) => img.url !== ""); // Remove invalid URLs
}

/**
 * Transform a single Sanity image reference to a URL with validation
 */
function transformImage(
  image: SanityImage | undefined | null
): { url: string; alt?: string } | null {
  if (!image || !image.asset) {
    return null;
  }

  // 16:9 crop for listing thumbnails
  const generatedUrl = urlFor(image).width(1200).height(675).fit("crop").url();
  const validation = validateImageUrl(generatedUrl);
  
  if (validation.isValid) {
    return { url: validation.url, alt: image.alt || "" };
  }
  
  // If validation fails, log in development and return null
  if (process.env.NODE_ENV === "development") {
    console.warn("Invalid image URL detected:", validation.error, generatedUrl);
  }
  
  return null;
}

/**
 * Transform timeline entries with image URLs
 */
function transformTimeline(
  timeline: TimelineEntry[] | undefined | null
): CaseStudyWithUrls["timeline"] {
  if (!timeline || !Array.isArray(timeline)) {
    return [];
  }
  return timeline.map((entry) => ({
    date: entry.date || "",
    title: entry.title || "",
    description: entry.description || "",
    images: transformImages(entry.images),
  }));
}

/**
 * Transform case study data with image URLs
 */
function transformCaseStudy(caseStudy: CaseStudy): CaseStudyWithUrls {
  return {
    ...caseStudy,
    slug: caseStudy.slug?.current || "",
    thumbnail: transformImage(caseStudy.thumbnail ?? null),
    heroImages: transformImages(caseStudy.heroImages),
    timeline: transformTimeline(caseStudy.timeline),
    tags: caseStudy.tags || [],
  };
}

/**
 * Fetch all case studies from Sanity
 */
export async function getCaseStudies(): Promise<CaseStudyWithUrls[]> {
  try {
    const caseStudies = await client.fetch<CaseStudy[]>(CASE_STUDY_QUERY);
    return caseStudies.map(transformCaseStudy);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching case studies:", error);
    }
    return [];
  }
}

/**
 * Fetch a single case study by slug
 */
export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudyWithUrls | null> {
  try {
    const caseStudy = await client.fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG_QUERY, {
      slug,
    });

    if (!caseStudy) {
      return null;
    }

    return transformCaseStudy(caseStudy);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching case study:", error);
    }
    return null;
  }
}
