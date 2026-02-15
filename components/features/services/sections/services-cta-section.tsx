import { CTASection } from "@/components/features/home/sections/cta";
import type { ServicesCTASectionProps } from "@/types/props";

export function ServicesCTASection({
  title = "Ready to get started?",
  text,
  buttonText,
  buttonHref = "/contact",
}: ServicesCTASectionProps) {
  return (
    <CTASection
      title={title}
      subtitle={text}
      primaryButtonText={buttonText}
      primaryButtonHref={buttonHref}
    />
  );
}
