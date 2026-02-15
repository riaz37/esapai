import Link from "next/link";
import Image from "next/image";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button, ButtonArrow } from "@/components/ui/button";
import type { CaseStudyWithUrls } from "@/types/case-study";
import type { CaseStudyCardProps } from "@/types/props";


export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const thumbnailImage = caseStudy.heroImages[0];
  const displayTags = caseStudy.tags.slice(0, 3);
  const excerpt = caseStudy.subtitle.length > 150
    ? `${caseStudy.subtitle.substring(0, 150)}...`
    : caseStudy.subtitle;

  return (
    <div className="block h-full">
      <SpotlightCard className="h-full">
        <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col">
          {/* Thumbnail Image */}
          {thumbnailImage && (
            <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-56 mb-3 sm:mb-4 md:mb-5 rounded-lg overflow-hidden">
              <Image
                src={thumbnailImage.url}
                alt={thumbnailImage.alt || caseStudy.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gradient-radial-white">
            {caseStudy.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-light-gray-90 leading-relaxed mb-4 sm:mb-5 flex-1">
            {excerpt}
          </p>

          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {displayTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs md:text-sm rounded-full border border-white/10 text-primary relative transition-all duration-300"
                  style={{
                    background: "var(--neutral-neutral-210, rgba(248, 248, 248, 0.1))",
                    boxShadow: "0px 0px 13.12px 0px rgba(248, 248, 248, 0.25) inset",
                    backdropFilter: "blur(19.678752899169922px)",
                    WebkitBackdropFilter: "blur(19.678752899169922px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto">
            <Button
              variant="primary"
              size="sm"
              className="group"
              asChild
            >
              <Link
                href={`/case-study/${caseStudy.slug}`}
                className="flex items-center gap-2"
              >
                <span>Explore Success Story</span>
                <ButtonArrow className="ml-0" />
              </Link>
            </Button>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
