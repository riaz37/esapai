"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import type { CaseStudyWithUrls } from "@/types/case-study";
import { CaseStudyHero } from "../hero";
import { useCaseStudyContent } from "@/lib/hooks/use-case-study-content";
import { Section } from "@/components/ui/section";
import { Timeline } from "../sections";

import { GlobalLoader } from "@/components/ui/global-loader";
import type { CaseStudyPageClientProps } from "@/types/page";

export function CaseStudyPage({
  slug,
  locale,
  initialCaseStudy,
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
