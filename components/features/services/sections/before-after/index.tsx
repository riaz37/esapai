"use client";

import React from "react";

import { ServicePortalVideoSection } from "../portal-video";
import { Section } from "@/components/ui/section";

const DEFAULT_VIDEO_SRC = "/beforeafter.mp4";

export function ServiceBeforeAfterSection({
  title,
  subtitle,
  badgeLabel,
  videoSrc = DEFAULT_VIDEO_SRC,
}: {
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  videoSrc?: string;
}) {
  return (
    <Section
      id="before-and-after"
      className="relative w-full scroll-mt-20 md:scroll-mt-32"
      padding="none"
      containerMaxWidth="full"
      withContainer={false}
    >
      <ServicePortalVideoSection
        videoSrc={videoSrc}
        title={title || ""}
        subtitle={subtitle}
        badgeLabel={badgeLabel}
      />
    </Section>
  );
}
