"use client";

import { GlobalLoader } from "@/components/ui/global-loader";

export default function ContactLoading() {
  return <GlobalLoader message="Loading contact" subMessage="Preparing connection channels" />;
}

