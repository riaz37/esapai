"use client";

import { memo, type ReactNode, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { buildCaseStudyListingPath } from "@/lib/case-studies";
import { useSharedCardObserver } from "@/lib/hooks/use-case-study-card-animation";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { sanitizeText } from "@/lib/utils/sanitize";
import { Section } from "@/components/ui/section";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { Button, ButtonArrow } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import type { CaseStudyWithUrls } from "@/types/case-study";

interface CaseStudyListAnimatedProps {
  caseStudies: CaseStudyWithUrls[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  activeTag: string | null;
  availableTags: string[];
}

interface CaseStudyCardProps {
  caseStudy: CaseStudyWithUrls;
  index: number;
  onImageError: (id: string) => void;
  imageErrors: Set<string>;
}

function buildPageNumbers(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export function CaseStudyListAnimated({
  caseStudies,
  totalCount,
  totalPages,
  currentPage,
  pageSize,
  activeTag,
  availableTags,
}: CaseStudyListAnimatedProps) {
  const t = useTranslations("CaseStudy.list");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useScrollReveal(sectionRef, {
    selector: ".case-study-hero-content > *",
    y: 30,
    stagger: 0.15,
    duration: 0.8,
  });

  useSharedCardObserver(cardsContainerRef, !prefersReducedMotion());

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  const hasResults = caseStudies.length > 0;
  const shouldShowFilters = availableTags.length > 0;
  const shouldShowPagination = totalPages > 1 && totalCount > 0;
  const pageNumbers = buildPageNumbers(totalPages);
  const rangeStart = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = totalCount === 0 ? 0 : rangeStart + caseStudies.length - 1;

  return (
    <main className="relative" ref={sectionRef}>
      <Section
        padding="lg"
        containerMaxWidth="wide"
        className="relative overflow-hidden"
      >
        <div className="relative z-10 w-full">
          <div className="case-study-hero-content text-start mb-16 sm:mb-20 md:mb-24 lg:mb-28 pt-24 sm:pt-32 lg:pt-36">
            <TypewriterTitle
              title={t("heroTitle")}
              tagline={t("heroTagline")}
              splitMode="manual"
              highlightPart="last"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 ps-2"
              align="left"
              staggerDelay={0.02}
              letterDuration={0.4}
            />
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl font-normal leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="mb-10 sm:mb-12 md:mb-14 space-y-5">
            {shouldShowFilters && (
              <div className="space-y-3">
                <p className="text-sm font-medium tracking-wide text-white/65">
                  {t("filterLabel")}
                </p>
                <nav
                  className="flex flex-wrap gap-2"
                  aria-label={t("filtersAriaLabel")}
                >
                  <Link
                    href={buildCaseStudyListingPath()}
                    className={cn(
                      "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                      !activeTag
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-white/10 text-light-gray-90 hover:border-primary/30 hover:text-primary"
                    )}
                  >
                    {t("allTags")}
                  </Link>
                  {availableTags.map((tag) => {
                    const isActive = activeTag === tag;

                    return (
                      <Link
                        key={tag}
                        href={buildCaseStudyListingPath({ tag })}
                        className={cn(
                          "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                          isActive
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-white/10 text-light-gray-90 hover:border-primary/30 hover:text-primary"
                        )}
                      >
                        {tag}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

            <p className="text-sm text-white/60">
              {t("resultsSummary", {
                start: rangeStart,
                end: rangeEnd,
              })}
            </p>
          </div>

          <div className="case-studies-glow">
            {hasResults ? (
              <div
                ref={cardsContainerRef}
                className="w-full"
                role="list"
                aria-label={t("ariaLabel")}
              >
                {caseStudies.map((caseStudy, index) => (
                  <CaseStudyCard
                    key={caseStudy._id}
                    caseStudy={caseStudy}
                    index={index}
                    onImageError={handleImageError}
                    imageErrors={imageErrors}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                message={activeTag ? t("filteredEmpty", { tag: activeTag }) : t("empty")}
                action={
                  activeTag ? (
                    <Button variant="outline" showArrow={false} asChild>
                      <Link href={buildCaseStudyListingPath()}>
                        {t("clearFilter")}
                      </Link>
                    </Button>
                  ) : undefined
                }
              />
            )}

            {shouldShowPagination && (
              <nav
                className="mt-12 flex flex-wrap items-center gap-3"
                aria-label={t("paginationLabel")}
              >
                <PaginationLink
                  href={buildCaseStudyListingPath({
                    page: currentPage - 1,
                    tag: activeTag,
                  })}
                  disabled={currentPage <= 1}
                >
                  {t("previousPage")}
                </PaginationLink>

                <div className="flex flex-wrap items-center gap-2">
                  {pageNumbers.map((pageNumber) => (
                    <PaginationLink
                      key={pageNumber}
                      href={buildCaseStudyListingPath({
                        page: pageNumber,
                        tag: activeTag,
                      })}
                      active={pageNumber === currentPage}
                      ariaCurrent={pageNumber === currentPage ? "page" : undefined}
                    >
                      {pageNumber}
                    </PaginationLink>
                  ))}
                </div>

                <PaginationLink
                  href={buildCaseStudyListingPath({
                    page: currentPage + 1,
                    tag: activeTag,
                  })}
                  disabled={currentPage >= totalPages}
                >
                  {t("nextPage")}
                </PaginationLink>
              </nav>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

function PaginationLink({
  href,
  children,
  active = false,
  disabled = false,
  ariaCurrent,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  ariaCurrent?: "page";
}) {
  const className = cn(
    "inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
    active
      ? "border-primary/40 bg-primary/10 text-primary"
      : "border-white/10 text-light-gray-90",
    !active && !disabled && "hover:border-primary/30 hover:text-primary",
    disabled && "cursor-not-allowed opacity-40"
  );

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
}

const CaseStudyCard = memo(
  ({ caseStudy, index, onImageError, imageErrors }: CaseStudyCardProps) => {
    const t = useTranslations("CaseStudy.list");
    const thumbnail = caseStudy.thumbnail ?? caseStudy.heroImages?.[0];
    const displayTags = (caseStudy.tags ?? []).slice(0, 3);
    const excerpt =
      caseStudy.subtitle.length > 140
        ? `${caseStudy.subtitle.slice(0, 140)}...`
        : caseStudy.subtitle;

    const hasImageError = imageErrors.has(caseStudy._id);
    const imageUrl = hasImageError
      ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23131313' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2313f584' font-size='72' font-family='Inter,ui-sans-serif,system-ui,sans-serif'%3E${encodeURIComponent(caseStudy.title.charAt(0))}%3C/text%3E%3C/svg%3E`
      : thumbnail?.url;

    return (
      <article
        role="listitem"
        className={
          index === 0
            ? "relative isolate"
            : "relative isolate mt-10 sm:mt-12 md:mt-14 pt-10 sm:pt-12 md:pt-14 border-t border-white/10"
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-28 top-10 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 bottom-10 -z-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-60"
        />

        {caseStudy.featured && (
          <div className="mb-2 sm:mb-3">
            <span
              className="inline-flex items-center rounded-full border border-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-bold uppercase tracking-widest text-primary relative transition-all duration-300"
              style={{
                background: "var(--neutral-neutral-210, rgba(248, 248, 248, 0.1))",
                boxShadow: "0px 0px 13.12px 0px rgba(248, 248, 248, 0.25) inset",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {t("featured")}
            </span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-radial-white mb-4 sm:mb-5 md:mb-6">
          {caseStudy.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center">
          <div>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden case-study-image">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={sanitizeText(thumbnail?.alt || caseStudy.title, 200)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={() => {
                    if (!hasImageError) {
                      onImageError(caseStudy._id);
                    }
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-white/5" aria-hidden="true" />
              )}
            </div>

            {displayTags.length > 0 && (
              <div
                className="flex flex-wrap gap-2 mt-3 sm:mt-4"
                role="list"
                aria-label="Case study tags"
              >
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="case-study-tag px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 text-xs sm:text-sm text-light-gray-90 relative transition-all duration-300"
                    style={{
                      background: "var(--neutral-neutral-210, rgba(248, 248, 248, 0.1))",
                      boxShadow: "0px 0px 13.12px 0px rgba(248, 248, 248, 0.25) inset",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="max-w-xl">
            <p className="text-light-gray-90 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6">
              {excerpt}
            </p>

            <Button variant="primary" asChild className="ps-4 pe-1.5">
              <Link
                href={`/case-study/${caseStudy.slug}`}
                className="inline-flex items-center gap-2 group w-fit"
              >
                <span>{t("viewDetails")}</span>
                <ButtonArrow size="default" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.caseStudy._id === nextProps.caseStudy._id &&
      prevProps.index === nextProps.index &&
      prevProps.imageErrors.size === nextProps.imageErrors.size &&
      !nextProps.imageErrors.has(prevProps.caseStudy._id)
    );
  }
);

CaseStudyCard.displayName = "CaseStudyCard";
