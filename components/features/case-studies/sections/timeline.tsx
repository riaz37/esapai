"use client";

import { useMemo } from "react";
import Image from "next/image";
import type { TimelineProps } from "@/types/props";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProcessTimeline, type ProcessTimelineItem } from "@/components/ui/process-timeline";

export function Timeline({ timeline }: TimelineProps) {
  const items = useMemo<ProcessTimelineItem[]>(() => {
    if (!timeline) return [];

    return timeline.map((entry, index) => {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      };

      return {
        id: index,
        leftContent: (
          <div className="text-xs sm:text-sm md:text-base text-light-gray-90 font-medium pt-2">
            {formatDate(entry.date)}
          </div>
        ),
        rightContent: (
          <Card
            className={cn(
              "group relative border border-white/10 overflow-hidden",
              "p-5 sm:p-6 transition-all duration-300",
              "hover:shadow-glow-primary-feature hover:border-primary/20",
              "bg-black/40 shadow-[0px_2px_12px_0px_rgba(226,226,226,0.15)_inset]"
            )}
          >
            {/* Light sweep on hover */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:animate-light-sweep" />
            </div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gradient-radial-white">
                {entry.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-light-gray-90 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                {entry.description}
              </p>

              {/* Images Grid */}
              {entry.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {entry.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="timeline-image relative aspect-video rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `${entry.title} - Image ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ),
      };
    });
  }, [timeline]);

  if (!timeline || timeline.length === 0) {
    return null;
  }

  return <ProcessTimeline items={items} />;
}
