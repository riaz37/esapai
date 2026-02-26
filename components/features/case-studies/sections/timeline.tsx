"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { m, AnimatePresence } from "motion/react";
import type { TimelineProps } from "@/types/props";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProcessTimeline, type ProcessTimelineItem } from "@/components/ui/process-timeline";

export function Timeline({ timeline }: TimelineProps) {
  const locale = useLocale();
  const items = useMemo<ProcessTimelineItem[]>(() => {
    if (!timeline) return [];

    return timeline.map((entry, index) => {
      const formatDateValues = (dateString: string) => {
        const date = new Date(dateString);
        return {
          day: date.getDate(),
          monthYear: `${date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", { month: "long" })}, ${date.getFullYear()}`,
        };
      };

      const { day, monthYear } = formatDateValues(entry.date);

      return {
        id: index,
        leftContent: (
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0 pt-[1px] sm:pt-0 md:-mt-1 lg:-mt-1.5">
            <span className="text-xl sm:text-2xl md:text-5xl font-bold text-white leading-none">
              {day}
            </span>
            <span className="text-white/60 text-start md:text-end text-xs font-bold uppercase tracking-widest">
              {monthYear}
            </span>
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
              <TimelineDescription text={entry.description} />

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
  }, [timeline, locale]);

  if (!timeline || timeline.length === 0) {
    return null;
  }

  return <ProcessTimeline items={items} />;
}

function TimelineDescription({ text }: { text: string }) {
  const t = useTranslations("CaseStudy.detail");
  const [isExpanded, setIsExpanded] = useState(false);

  const isLong = text.length > 250;

  return (
    <div className="mb-4 sm:mb-5 md:mb-6">
      <m.div
        initial={false}
        animate={{
          height: isExpanded || !isLong ? "auto" : "4.8em",
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden"
      >
        <p className={cn(
          "text-sm sm:text-base md:text-lg text-white/60 leading-relaxed",
          !isExpanded && isLong && "line-clamp-3"
        )}>
          {text}
        </p>
      </m.div>

      {isLong && (
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
          className="mt-2 inline-flex items-center gap-1 text-primary hover:text-primary transition-all duration-300 cursor-pointer select-none group/readmore text-sm font-semibold border-none bg-transparent p-0"
        >
          <span className="group-hover/readmore:underline underline-offset-4 decoration-primary/30">
            {isExpanded ? t("showLess") : t("readMore")}
          </span>
          <m.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <ArrowRight className={cn("w-3.5 h-3.5 transition-transform", !isExpanded && "group-hover/readmore:translate-x-0.5")} />
          </m.span>
        </div>
      )}
    </div>
  );
}

import { ArrowRight } from "lucide-react";
