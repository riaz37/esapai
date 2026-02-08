"use client";

import React from "react";
import { PortalVideoShowcase } from "./portal-video-showcase";

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
    <section id="before-and-after" className="relative w-full bg-black/5">
      <PortalVideoShowcase
        videoSrc={videoSrc}
        title={title}
        subtitle={subtitle}
      />
    </section>
  );
}
