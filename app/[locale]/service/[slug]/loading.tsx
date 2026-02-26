"use client";

import { GlobalLoader } from "@/components/ui/global-loader";

export default function ServiceDetailLoading() {
  return <GlobalLoader message="Loading service blueprint" subMessage="Mapping workflows" />;
}

