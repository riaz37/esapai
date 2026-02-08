"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { HelpCircle } from "lucide-react";

/** Placeholder: Problem / Why this service. Replace with real content (challenge headline, impact bullets, curiosity). */
export function ServiceProblemSection({
  title = "Why this service",
  subtitle = "Placeholder: service-level problem, emotional impact, and curiosity line will go here.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section id="why-this-service" padding="lg">
      <SectionHeader
        badge="Challenge"
        badgeIcon={HelpCircle}
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-base md:text-lg text-light-gray-90 max-w-3xl mx-auto"
      />
    </Section>
  );
}
