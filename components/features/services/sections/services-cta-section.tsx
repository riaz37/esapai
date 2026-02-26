"use client";

import { CTASection } from "@/components/features/home/sections/cta";
import { useTranslations } from "next-intl";
import type { ServicesCTASectionProps } from "@/types/props";

export function ServicesCTASection({
  title,
  text,
  buttonText,
  buttonHref = "/contact",
}: ServicesCTASectionProps) {
  const t = useTranslations("Service.cta");
  return (
    <CTASection
      title={title ?? t("defaultTitle")}
      subtitle={text}
      primaryButtonText={buttonText}
      primaryButtonHref={buttonHref}
    />
  );
}
