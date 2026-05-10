"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { SectionHeaderProps } from "@/types/props";
import { BadgeChip } from "./badge-chip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  badgeIcon,
  badgeVariant = "primary",
  align = "center",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  animate = true,
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!animate) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
        });
      }

      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
          },
          badge ? "-=0.4" : 0
        );
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
          },
          "-=0.5"
        );
      }
    },
    { scope: containerRef, dependencies: [badge, subtitle] }
  );

  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "left"
        ? "text-start items-start"
        : align === "right"
          ? "text-end items-end"
          : align === "center-md-left"
            ? "text-center items-center md:text-start md:items-start"
            : align === "center-lg-left"
              ? "text-center items-center lg:text-start lg:items-start"
              : "text-center items-center";

  const mxClass =
    align === "center"
      ? "mx-auto"
      : align === "center-md-left"
        ? "mx-auto md:me-auto md:ms-0"
        : align === "center-lg-left"
          ? "mx-auto lg:me-auto lg:ms-0"
          : "";

  return (
    <div
      ref={containerRef}
      data-testid="section-header"
      className={cn("relative z-10 flex flex-col mb-10 sm:mb-12 lg:mb-16", alignClass, className)}
    >


      {/* Premium BadgeChip Indicator */}
      {badge && (
        <div ref={badgeRef} className="mb-2">
          <BadgeChip label={badge} icon={badgeIcon} variant={badgeVariant} />
        </div>
      )}

      {/* Main Title with Glow */}
      <div className="relative">
        <h2
          ref={titleRef}
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight",
            titleClassName
          )}
        >
          {title}
        </h2>

      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          ref={subtitleRef}
          className={cn(
            "mt-3 text-base sm:text-lg md:text-xl lg:text-xl text-white/70 leading-relaxed max-w-3xl tracking-tight",
            mxClass,
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
