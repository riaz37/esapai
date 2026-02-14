"use client";

import { useRouter } from "next/navigation";
import { TechEcosystemCard } from "@/components/features/services/components/tech-ecosystem-card";
import { Section } from "@/components/ui/section";
import type { ServicesCTASectionProps } from "@/types/props";

export function ServicesCTASection({
  title = "Ready to get started?",
  text,
  buttonText,
  buttonHref = "/contact",
}: ServicesCTASectionProps) {
  const router = useRouter();

  const handleCtaClick = () => {
    router.push(buttonHref);
  };

  return (
    <Section className="py-24">
      <div className="relative z-10 w-full">
        <TechEcosystemCard
          title={typeof title === 'string' ? title : "Ready to get started?"}
          subtitle={text}
          ctaText={buttonText || "Initialize Project"}
          onCtaClick={handleCtaClick}
          className="mx-auto shadow-2xl"
        />
      </div>
    </Section>
  );
}
