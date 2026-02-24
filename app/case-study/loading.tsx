"use client";

import { GlobalLoader } from "@/components/ui/global-loader";

export default function CaseStudiesLoading() {
  return <GlobalLoader message="Loading intelligence" subMessage="Preparing case studies" />;
}
