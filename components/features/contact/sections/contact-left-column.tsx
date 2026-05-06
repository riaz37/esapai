"use client";

import Image from "next/image";
import { forwardRef, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { BadgeChip } from "@/components/ui/badge-chip";
import { MessageSquare } from "lucide-react";

export const ContactLeftColumn = forwardRef<
  HTMLDivElement,
  {
    socialLinks: ReadonlyArray<{ name: string; iconPath: string; href: string }>;
  }
>(function ContactLeftColumn({ socialLinks }, ref) {
  const t = useTranslations("Contact");
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Hover effect for social icons - scale, rotation, and background
  const handleSocialHover = (index: number, isEntering: boolean) => {
    if (prefersReducedMotion()) return;

    const icon = socialIconRefs.current[index];
    if (!icon) return;

    if (isEntering) {
      gsap.to(icon, {
        scale: 1.15,
        rotation: 5,
        backgroundColor: "var(--color-primary)",
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    } else {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  return (
    <div ref={ref} className="lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Badge Indicator */}
      <div data-gsap="contact-left-item" className="mb-2">
        <BadgeChip label={t("badge")} icon={MessageSquare} />
      </div>

      {/* Main Heading */}
      <div className="space-y-4">
        <h1
          data-gsap="contact-left-item"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tighter pb-2"
        >
          <span className="text-white">{t("title.part1")}</span>
          <br />
          <span className="text-white">{t("title.part2")}</span>
          <br />
          <span className="text-primary">{t("title.part3")}</span>
        </h1>

      </div>

      {/* Description */}
      <p
        data-gsap="contact-left-item"
        className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl"
      >
        {t("description")}
      </p>

    </div>
  );
});



