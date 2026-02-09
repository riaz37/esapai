"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BarChart3 } from "lucide-react";

/** Placeholder: Proof & outcomes. Replace with case teaser, metrics, testimonial. */
export function ServiceProofSection({
  title = "Proof & outcomes",
  subtitle = "Placeholder: case study teaser, metrics, and testimonial will go here.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section id="proof" padding="lg">
      <SectionHeader
        badge="Proof"
        badgeIcon={BarChart3}
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-base md:text-lg text-light-gray-90 max-w-3xl mx-auto"
      />
    </Section>
  );
}
