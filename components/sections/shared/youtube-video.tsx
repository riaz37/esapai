"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

export function YouTubeVideo({
  videoId,
  title = "Products That Work for You",
}: YouTubeVideoProps) {
  return (
    <Section padding="sm" className="pb-20 md:pb-24" containerClassName="max-w-6xl mx-auto">
      <SectionHeader
        title={title}
        titleClassName="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12"
        subtitle=""
      />

          {/* YouTube Video Embed */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl video-glow">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
    </Section>
  );
}

