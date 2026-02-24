"use client";

import { GlobalLoader } from "@/components/ui/global-loader";

export default function CaseStudyLoading() {
  return <GlobalLoader message="Loading case study details" subMessage="Analyzing results" />;
}
