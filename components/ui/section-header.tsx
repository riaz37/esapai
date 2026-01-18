"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { SectionHeaderProps } from "@/types/props";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
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
          },
          badge ? "-=0.4" : 0
        );
      }

      // Animated accent line - draws from center outward
      if (accentLineRef.current) {
        tl.fromTo(
          accentLineRef.current,
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
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
        ? "text-left items-start"
        : "text-right items-end";

  const mxClass = align === "center" ? "mx-auto" : "";

  return (
    <div
      ref={containerRef}
      className={cn("relative z-10 flex flex-col mb-12 sm:mb-16", alignClass, className)}
    >


      {/* Kinetic Gradient Badge */}
      {badge && (
        <div ref={badgeRef} className="relative mb-5 sm:mb-8 group">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#13F584_50%,#000000_100%)] opacity-70" />
            <div className="relative inline-flex items-center justify-center rounded-full bg-black/80 backdrop-blur-3xl px-4 py-1.5">
              <span className="text-[10px] sm:text-xs font-medium text-primary tracking-[0.2em] uppercase">
                // {badge}
              </span>
            </div>
          </div>
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

        {/* Animated Accent Line */}
        <div
          ref={accentLineRef}
          className={cn(
            "mt-4 sm:mt-5 h-[2px] w-24 sm:w-32 md:w-40 origin-center bg-primary/80",
            align === "center" ? "mx-auto" : align === "left" ? "mr-auto" : "ml-auto"
          )}
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          ref={subtitleRef}
          className={cn(
            "mt-5 sm:mt-7 text-base sm:text-lg md:text-xl lg:text-xl text-gray-400 leading-relaxed max-w-3xl tracking-tight",
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
