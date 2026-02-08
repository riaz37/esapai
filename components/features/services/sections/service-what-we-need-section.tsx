"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ClipboardList } from "lucide-react";

/** Placeholder: What we need from you. Replace with checklist of client inputs (goals, systems, access, etc.). */
export function ServiceWhatWeNeedSection({
  title = "What we need from you",
  subtitle = "Placeholder: checklist of inputs we need to get started will go here.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section id="what-we-need" padding="lg">
      <SectionHeader
        badge="Requirements"
        badgeIcon={ClipboardList}
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-base md:text-lg text-light-gray-90 max-w-3xl mx-auto"
      />
    </Section>
  );
}
