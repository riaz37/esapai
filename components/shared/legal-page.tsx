"use client";

import type {
  LegalPageProps,
  LegalSectionProps,
  LegalParagraphProps,
  LegalListProps,
} from "@/types/page";

export function LegalPage({ title, lastUpdated, lastUpdatedLabel = "Last updated:", children }: LegalPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight text-gradient-primary">
              {title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-light-gray-90 text-xs sm:text-sm md:text-base">
              <span>{lastUpdatedLabel}</span>
              <span className="text-primary font-medium">{lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative pb-20 md:pb-32">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-10 sm:pt-12 md:pt-14 lg:pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 text-light-gray-90 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 relative">
      {/* Section divider line */}
      <div className="absolute -top-4 sm:-top-5 start-0 end-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="space-y-4 sm:space-y-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4 sm:mb-5 md:mb-6 leading-tight">
          {title}
        </h2>
        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LegalParagraph({ children }: LegalParagraphProps) {
  return (
    <p className="text-light-gray-90 leading-relaxed">
      {children}
    </p>
  );
}

export function LegalList({ items, ordered = false }: LegalListProps) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag className={`${ordered ? "list-decimal" : "list-disc"} ms-5 sm:ms-6 md:ms-8 space-y-2 sm:space-y-3 text-sm sm:text-base text-light-gray-90 leading-relaxed`}>
      {items.map((item) => (
        <li key={item} className="ps-1.5 sm:ps-2 md:ps-3 relative">
          <span className="relative z-10">{item}</span>
        </li>
      ))}
    </ListTag>
  );
}
