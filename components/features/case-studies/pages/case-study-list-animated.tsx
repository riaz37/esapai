"use client";

import { useRef, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useSharedCardObserver } from "@/lib/hooks/use-case-study-card-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { sanitizeText } from "@/lib/utils/sanitize";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button, ButtonArrow } from "@/components/ui/button";
import { LazySection } from "@/components/ui/lazy-section";
import type { CaseStudyWithUrls } from "@/types/case-study";

interface CaseStudyListAnimatedProps {
  caseStudies: CaseStudyWithUrls[];
}

interface CaseStudyCardProps {
  caseStudy: CaseStudyWithUrls;
  index: number;
  onImageError: (id: string) => void;
  imageErrors: Set<string>;
}

export function CaseStudyListAnimated({ caseStudies }: CaseStudyListAnimatedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const anim = useGSAPAnimations(sectionRef);
  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Hero section animations
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = anim.createTimeline();

      // Hero title animation
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 30 });
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Hero subtitle animation
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef }
  );

  // Track image loading errors
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  // Case study cards animations - using shared observer for better performance
  useSharedCardObserver(cardsContainerRef, isInView && !prefersReducedMotion());

  return (
    <main className="relative" ref={sectionRef}>
      <Section
        ref={(el: HTMLElement | null) => {
          setIntersectionRef(el);
        }}
        padding="lg"
        containerMaxWidth="full"
        containerClassName="max-w-none px-0 sm:px-0 md:px-0"
        className="relative overflow-hidden pt-32 md:pt-40"
      >

        {/* Unified Content Container */}
        <div className="relative z-10 w-full">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20 md:mb-24 lg:mb-28">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] text-primary"
            >
              Case Study
            </h1>
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4 sm:px-6"
            >
              Where Innovation Meets Productivity Driven by agents Powered by
              automation Built for what&apos;s next
            </p>
          </div>

          {/* Grid Content */}
          <div className="case-studies-glow">
            {caseStudies.length > 0 ? (
              <div
                ref={cardsContainerRef}
                className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
                role="list"
                aria-label="Case studies"
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
              <div
                className="text-center py-16"
                role="status"
                aria-live="polite"
                aria-label="No case studies available"
              >
                <p className="text-lg text-light-gray-90 mb-6">
                  No case studies available yet.
                </p>
              </div>
            )}

            {/* CTA Section Removed */}
          </div>
        </div>
      </Section>
    </main>
  );
}

/**
 * Memoized case study card component to prevent unnecessary re-renders
 */
const CaseStudyCard = memo(
  ({ caseStudy, index, onImageError, imageErrors }: CaseStudyCardProps) => {
    const thumbnail = caseStudy.thumbnail ?? caseStudy.heroImages?.[0];
    const displayTags = (caseStudy.tags ?? []).slice(0, 3);
    const excerpt =
      caseStudy.subtitle.length > 140
        ? `${caseStudy.subtitle.slice(0, 140)}…`
        : caseStudy.subtitle;

    const hasImageError = imageErrors.has(caseStudy._id);
    const imageUrl = hasImageError
      ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23131313' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2313f584' font-size='72' font-family='Arial'%3E${encodeURIComponent(caseStudy.title.charAt(0))}%3C/text%3E%3C/svg%3E`
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
        {/* Glow background to highlight each case study (visual only) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-10 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-60"
        />

        {caseStudy.featured && (
          <div className="mb-2 sm:mb-3">
            <span
              className="inline-flex items-center rounded-full border border-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs uppercase tracking-wide text-primary relative transition-all duration-300"
              style={{
                background: "var(--neutral-neutral-210, rgba(248, 248, 248, 0.1))",
                boxShadow: "0px 0px 13.12px 0px rgba(248, 248, 248, 0.25) inset",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              Featured
            </span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-radial-white mb-4 sm:mb-5 md:mb-6">
          {caseStudy.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center">
          {/* Left: image + tags */}
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
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-4" role="list" aria-label="Case study tags">
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

          {/* Right: excerpt + button */}
          <div className="max-w-xl">
            <p className="text-light-gray-90 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6">
              {excerpt}
            </p>

            <Button variant="primary" asChild>
              <Link
                href={`/case-study/${caseStudy.slug}`}
                className="inline-flex items-center gap-2 group w-fit"
              >
                <span>View Case Study</span>
                <ButtonArrow size="default" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the case study data actually changed
    return (
      prevProps.caseStudy._id === nextProps.caseStudy._id &&
      prevProps.index === nextProps.index &&
      prevProps.imageErrors.size === nextProps.imageErrors.size &&
      !nextProps.imageErrors.has(prevProps.caseStudy._id)
    );
  }
);

CaseStudyCard.displayName = "CaseStudyCard";
