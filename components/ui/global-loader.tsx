"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatedSVGLoader } from "@/components/ui/animated-svg-loader";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { GlobalLoaderProps } from "@/types/props";

const DEFAULT_MESSAGE = "Preparing your experience";
const DEFAULT_SUB_MESSAGE = "Loading intelligence";

/**
 * Full-viewport loader that matches the product neon aesthetic.
 * Combines subtle gradients, animated orbs, and the SVG loader.
 * Migrated from Motion to GSAP for better performance.
 *
 * Use `LocalizedGlobalLoader` inside `[locale]` routes for translated text.
 * Use `GlobalLoader` directly (with explicit props) outside locale context.
 */
export function GlobalLoader({
  className,
  message = DEFAULT_MESSAGE,
  subMessage = DEFAULT_SUB_MESSAGE,
}: GlobalLoaderProps) {
  const resolvedMessage = message;
  const resolvedSubMessage = subMessage;
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Orb 1 - Main large orb
      gsap.to(orb1Ref.current, {
        opacity: 1,
        scale: 0.8,
        duration: 0,
      });
      gsap.to(orb1Ref.current, {
        scale: 1,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        keyframes: [
          { scale: 0.8, duration: 0.8 },
          { scale: 1, duration: 0.8 },
          { scale: 0.9, duration: 0.8 },
        ],
      });

      // Orb 2 - Top right orb
      gsap.to(orb2Ref.current, {
        opacity: 0.2,
        scale: 0.8,
        duration: 0,
      });
      gsap.to(orb2Ref.current, {
        opacity: 0.5,
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Orb 3 - Bottom left orb
      gsap.to(orb3Ref.current, {
        opacity: 0.2,
        scale: 0.7,
        duration: 0,
      });
      gsap.to(orb3Ref.current, {
        opacity: 0.5,
        scale: 1.05,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Text entrance
      gsap.from(textRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "isolate flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-black text-white",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(19,245,132,0.18),transparent_60%)] before:content-['']",
        className
      )}
    >
      <div
        ref={orb1Ref}
        aria-hidden
        className="absolute h-[420px] w-[420px] rounded-[40%] bg-[rgba(19,245,132,0.18)] blur-[140px] opacity-0"
      />

      <div
        ref={orb2Ref}
        aria-hidden
        className="absolute end-20 top-20 h-24 w-24 rounded-full bg-white/10 blur-3xl opacity-0"
      />

      <div
        ref={orb3Ref}
        aria-hidden
        className="absolute bottom-28 start-24 h-32 w-32 rounded-full bg-[rgba(19,245,132,0.3)] blur-3xl opacity-0"
      />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <AnimatedSVGLoader size="lg" variant="primary" />
        <div ref={textRef} className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-white/60">
            {resolvedSubMessage}
          </p>
          <p className="text-2xl font-semibold font-heading text-white md:text-3xl">
            {resolvedMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Localized version of GlobalLoader — must be rendered inside an IntlProvider (i.e. `[locale]` routes).
 */
export function LocalizedGlobalLoader(props: GlobalLoaderProps) {
  const t = useTranslations("Loading");
  return (
    <GlobalLoader
      {...props}
      message={props.message ?? t("message")}
      subMessage={props.subMessage ?? t("subMessage")}
    />
  );
}
