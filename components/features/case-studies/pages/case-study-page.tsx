"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import type { CaseStudyWithUrls } from "@/types/case-study";
import { CaseStudyHero } from "../hero";
import { useCaseStudyContent } from "@/lib/hooks/use-case-study-content";
import { Section } from "@/components/ui/section";
import { Timeline } from "../sections/timeline";

import { GlobalLoader } from "@/components/ui/global-loader";
import type { CaseStudyPageClientProps } from "@/types/page";

export function CaseStudyPage({
  slug,
  initialCaseStudy,
}: CaseStudyPageClientProps) {
  const { caseStudy, loading, isFetching, error } = useCaseStudyContent(slug, {
    initialCaseStudy,
  });

  const sectionRef = useRef<HTMLElement>(null);

  if (loading && !caseStudy) {
    return <GlobalLoader message="Loading case study" subMessage="Fetching case study details" />;
  }

  if (error && !caseStudy) {
    return <ErrorState message={error} />;
  }

  const hydratedCaseStudy = caseStudy ?? initialCaseStudy;

  return (
    <div className="relative" aria-busy={isFetching}>
      {isFetching && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
          <span className="mt-4 rounded-full bg-dark px-4 py-1 text-xs uppercase tracking-wide text-light-gray-90 animate-pulse-slow">
            Updating content…
          </span>
        </div>
      )}

      <Section
        ref={sectionRef}
        padding="none"
        containerMaxWidth="full"
        containerClassName="max-w-none px-0 sm:px-0 md:px-0"
        className="relative overflow-hidden"
      >
        {/* Content Container */}
        <div className="relative z-10 w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
          {/* Hero Content */}
          <CaseStudyHero caseStudy={hydratedCaseStudy} />

          {/* Timeline Section embedded seamlessly */}
          <div className="relative">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <Timeline timeline={hydratedCaseStudy.timeline} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        Unable to load case study
      </p>
      <p className="text-lg text-white/70">{message}</p>
    </section>
  );
}
