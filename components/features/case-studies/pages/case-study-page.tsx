"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CaseStudyHero } from "../hero";
import { useCaseStudyContent } from "@/lib/hooks/use-case-study-content";
import { Section } from "@/components/ui/section";
import { Timeline } from "../sections";
import { Link } from "@/i18n/routing";

import { GlobalLoader } from "@/components/ui/global-loader";
import type { CaseStudyPageClientProps } from "@/types/page";

const CTASection = dynamic(
  () => import("@/components/features/home/sections/cta").then((mod) => ({ default: mod.CTASection })),
  { ssr: false }
);

export function CaseStudyPage({
  slug,
  locale,
  initialCaseStudy,
  relatedCaseStudies = [],
}: CaseStudyPageClientProps) {
  const t = useTranslations("CaseStudy.detail");
  const { caseStudy, loading, isFetching, error } = useCaseStudyContent(slug, locale, {
    initialCaseStudy,
  });

  const sectionRef = useRef<HTMLElement>(null);

  if (loading && !caseStudy) {
    return <GlobalLoader message={t("loading")} subMessage={t("loadingSubtitle")} />;
  }

  if (error && !caseStudy) {
    return <ErrorState message={error} errorLabel={t("error")} />;
  }

  const hydratedCaseStudy = caseStudy ?? initialCaseStudy;

  return (
    <div className="relative" aria-busy={isFetching}>
      {isFetching && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
          <span className="mt-4 rounded-full bg-dark px-4 py-1 text-white/60 text-label-caps animate-pulse-slow">
            {t("updating")}
          </span>
        </div>
      )}

      <Section
        ref={sectionRef}
        padding="lg"
        containerMaxWidth="wide"
        className="relative overflow-hidden"
      >
        {/* Content Container */}
        <div className="relative z-10 w-full">
          {/* Hero Content */}
          <CaseStudyHero caseStudy={hydratedCaseStudy} />

          {/* Timeline Section embedded seamlessly */}
          <div className="relative">
            <Timeline timeline={hydratedCaseStudy.timeline} />
          </div>
        </div>
      </Section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <Section padding="lg" containerMaxWidth="wide">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {t("relatedTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCaseStudies.map((related) => (
                <Link
                  key={related._id}
                  href={`/case-study/${related.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors hover:border-primary/30 hover:bg-white/[0.08]"
                >
                  {related.thumbnail?.url && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={related.thumbnail.url}
                        alt={related.thumbnail.alt || related.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      {related.subtitle}
                    </p>
                    {related.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {related.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      <CTASection />
    </div>
  );
}

function ErrorState({ message, errorLabel }: { message: string; errorLabel: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-white/60 text-label-caps">
        {errorLabel}
      </p>
      <p className="text-lg text-white/70">{message}</p>
    </section>
  );
}
