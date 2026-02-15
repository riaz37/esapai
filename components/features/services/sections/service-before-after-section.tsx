"use client";

import React from "react";
import { PortalVideoShowcase } from "./portal-video-showcase";
import { Section } from "@/components/ui/section";

const DEFAULT_VIDEO_SRC = "/compare.mp4";

export function ServiceBeforeAfterSection({
  title = "See the difference",
  subtitle = "From the old way to integrated, efficient workflows—watch the before and after.",
  videoSrc = DEFAULT_VIDEO_SRC,
}: {
  title?: string;
  subtitle?: string;
  videoSrc?: string;
}) {
  return (
    <Section
      id="before-and-after"
      className="relative w-full"
      padding="none"
      containerMaxWidth="full"
    >
      <PortalVideoShowcase
        videoSrc={videoSrc}
        title={title}
        subtitle={subtitle}
      />
    </Section>
  );
}
