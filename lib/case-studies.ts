import type { QueryParams } from "@sanity/client";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { validateImageUrl } from "@/lib/security/url-validator";
import type {
  TimelineEntry,
  CaseStudy,
  CaseStudyWithUrls,
  CaseStudyListingParams,
  PaginatedCaseStudiesResult,
} from "@/types/case-study";
import type { SanityImage } from "@/types/sanity";

const CASE_STUDY_FIELDS = `{
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

const CASE_STUDY_QUERY = `*[_type == "caseStudy" && language == $locale] | order(publishedAt desc) ${CASE_STUDY_FIELDS}`;

const CASE_STUDY_BY_SLUG_QUERY = `*[_type == "caseStudy" && slug.current == $slug && language == $locale][0] ${CASE_STUDY_FIELDS}`;

const CASE_STUDY_TAGS_QUERY = `*[_type == "caseStudy" && language == $locale].tags[]`;

export const DEFAULT_CASE_STUDY_PAGE_SIZE = 6;

function getCaseStudyFilter(tag?: string | null): string {
  return tag ? ` && $selectedTag in tags` : "";
}

function buildCaseStudyListQuery(tag?: string | null): string {
  return `*[_type == "caseStudy" && language == $locale${getCaseStudyFilter(tag)}] | order(publishedAt desc)[$start...$end] ${CASE_STUDY_FIELDS}`;
}

function buildCaseStudyCountQuery(tag?: string | null): string {
  return `count(*[_type == "caseStudy" && language == $locale${getCaseStudyFilter(tag)}])`;
}

function getFirstParamValue<T>(value: T | T[] | undefined | null): T | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? undefined;
}

function parsePositiveInteger(
  value: number | string | string[] | undefined,
  fallback: number
): number {
  const rawValue = getFirstParamValue(value);

  if (typeof rawValue === "number") {
    return Number.isInteger(rawValue) && rawValue > 0 ? rawValue : fallback;
  }

  if (typeof rawValue !== "string") {
    return fallback;
  }

  const parsedValue = Number.parseInt(rawValue, 10);
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
}

export function normalizeCaseStudyListingParams(
  params: Pick<CaseStudyListingParams, "page" | "pageSize" | "tag">,
  defaultPageSize: number = DEFAULT_CASE_STUDY_PAGE_SIZE
): { page: number; pageSize: number; tag: string | null } {
  const normalizedTag = getFirstParamValue(params.tag)?.trim() || null;

  return {
    page: parsePositiveInteger(params.page, 1),
    pageSize: parsePositiveInteger(params.pageSize, defaultPageSize),
    tag: normalizedTag,
  };
}

export function buildCaseStudyListingPath({
  page = 1,
  tag,
}: {
  page?: number;
  tag?: string | null;
} = {}): string {
  const searchParams = new URLSearchParams();

  if (tag) {
    searchParams.set("tag", tag);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();
  return queryString ? `/case-study?${queryString}` : "/case-study";
}


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
export async function getCaseStudies(locale: string = "en"): Promise<CaseStudyWithUrls[]> {
  try {
    const caseStudies = await client.fetch<CaseStudy[]>(CASE_STUDY_QUERY, { locale });
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
  slug: string,
  locale: string = "en"
): Promise<CaseStudyWithUrls | null> {
  try {
    const caseStudy = await client.fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG_QUERY, {
      slug,
      locale,
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

export async function getPaginatedCaseStudies(
  params: CaseStudyListingParams
): Promise<PaginatedCaseStudiesResult> {
  const locale = params.locale || "en";
  const normalized = normalizeCaseStudyListingParams(params);

  try {
    const countQuery = buildCaseStudyCountQuery(normalized.tag);
    const countParams: QueryParams = normalized.tag
      ? { locale, selectedTag: normalized.tag }
      : { locale };
    const [totalCount, rawTags] = await Promise.all([
      client.fetch<number>(countQuery, countParams),
      client.fetch<string[]>(CASE_STUDY_TAGS_QUERY, { locale }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / normalized.pageSize));
    const currentPage = Math.min(normalized.page, totalPages);
    const start = (currentPage - 1) * normalized.pageSize;
    const end = start + normalized.pageSize;
    const listQuery = buildCaseStudyListQuery(normalized.tag);
    const listParams: QueryParams = normalized.tag
      ? { locale, start, end, selectedTag: normalized.tag }
      : { locale, start, end };
    const caseStudies = await client.fetch<CaseStudy[]>(listQuery, listParams);
    const availableTags = Array.from(
      new Set((rawTags || []).filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0))
    ).sort((left, right) => left.localeCompare(right, locale));

    return {
      items: caseStudies.map(transformCaseStudy),
      totalCount,
      totalPages,
      currentPage,
      pageSize: normalized.pageSize,
      activeTag: normalized.tag,
      availableTags,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching paginated case studies:", error);
    }

    return {
      items: [],
      totalCount: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: normalized.pageSize,
      activeTag: normalized.tag,
      availableTags: [],
    };
  }
}
