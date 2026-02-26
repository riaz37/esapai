"use client";

import { GlobalLoader } from "@/components/ui/global-loader";

export default function ProductsLoading() {
  return <GlobalLoader message="Loading product catalog" subMessage="Preparing showcases" />;
}

