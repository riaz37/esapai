"use client";

import React, { useMemo } from "react";
import { m } from "motion/react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { AlertTriangle, Clock, Database, FileX, ZapOff } from "lucide-react";
import { useTranslations } from "next-intl";


const EMPTY_ITEMS: Array<{ title: string; description: string }> = [];

export function ServiceProblemSection({
  title,
  subtitle,
  badge,
  items = EMPTY_ITEMS,
}: {
  title?: string;
  subtitle?: string;
  badge?: string;
  items?: Array<{ title: string; description: string }>;
}) {
  const t = useTranslations("Service.problem");
  const resolvedTitle = title ?? t("defaultTitle");
  const resolvedSubtitle = subtitle ?? t("defaultSubtitle");
  const displayItems = items.length > 0 ? items.slice(0, 4) : [];

  const painPointsWithIcons = useMemo(() => {
    const icons = [Clock, Database, ZapOff, FileX];
    // Deterministic drift values per index to avoid Math.random in render
    const driftPresets = [
      { duration: 4.8, y: 12, rotate: 1.5, delay: 0.2 },
      { duration: 6.2, y: 8, rotate: -1.2, delay: 0.8 },
      { duration: 5.5, y: 14, rotate: 0.8, delay: 1.5 },
      { duration: 4.2, y: 10, rotate: -1.8, delay: 0.1 },
    ];
    return displayItems.map((item, i) => ({
      ...item,
      icon: icons[i % icons.length],
      desc: item.description,
      x: i === 0 ? -30 : i === 1 ? 35 : i === 2 ? -15 : 25,
      y: i === 0 ? -5 : i === 1 ? -25 : i === 2 ? 35 : 25,
      rotate: i === 0 ? -6 : i === 1 ? 5 : i === 2 ? -4 : 6,
      delay: (i + 1) * 0.1,
      drift: driftPresets[i % driftPresets.length],
    }));
  }, [displayItems]);

  return (
    <Section
      id="why-this-service"
      className="relative flex items-center pt-24 sm:pt-32 scroll-mt-20 md:scroll-mt-32"
      padding="md"
    >
      {/* Background Chaos Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[64px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 end-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[48px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">

        {/* Text Content */}
        <div className="max-w-xl">
          <SectionHeader
            badge={badge ?? ""}
            badgeIcon={AlertTriangle}
            title={resolvedTitle}
            subtitle={resolvedSubtitle}
            align="left"
            titleClassName="text-5xl md:text-6xl font-bold tracking-tight"
          />
        </div>

        {/* Floating Cards Visual */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="relative min-h-[400px] lg:h-[600px] w-full flex flex-col lg:block items-center justify-center perspective-[1000px] gap-6 lg:gap-0"
        >
          {painPointsWithIcons.map((point) => (
            <PainCard key={point.title} point={point} />
          ))}
        </m.div>

      </div>
    </Section>
  );
}

type PainPoint = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
  x: number;
  y: number;
  rotate: number;
  delay: number;
  drift: { duration: number; y: number; rotate: number; delay: number };
};

function PainCard({ point }: { point: PainPoint }) {
  // Use deterministic drift values from the constant to satisfy React Compiler's purity requirements
  const { duration, y, rotate, delay } = point.drift;

  return (
    <m.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95,
          rotate: point.rotate * 0.5
        },
        visible: {
          opacity: 1,
          x: typeof window !== "undefined" && window.innerWidth >= 1024 ? point.x : 0,
          y: typeof window !== "undefined" && window.innerWidth >= 1024 ? point.y : 0,
          scale: 1,
          rotate: typeof window !== "undefined" && window.innerWidth >= 1024 ? point.rotate : 0,
          transition: {
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }
        }
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="relative w-full max-w-[340px] lg:absolute lg:w-72 cursor-pointer group"
      style={{
        left: typeof window !== "undefined" && window.innerWidth >= 1024 ? `calc(50% + ${point.x * 3}px)` : undefined,
        top: typeof window !== "undefined" && window.innerWidth >= 1024 ? `calc(50% + ${point.y * 3}px)` : undefined,
        marginLeft: typeof window !== "undefined" && window.innerWidth >= 1024 ? "-144px" : undefined,
        marginTop: typeof window !== "undefined" && window.innerWidth >= 1024 ? "-100px" : undefined,
      }}
    >
      {/* Continuous Drift Wrapper - independent of entrance */}
      <m.div
        animate={{
          y: [0, -y, y / 2, 0],
          rotate: [0, rotate, -rotate, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
        className="w-full h-full"
      >
        <div
          className="h-full w-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl p-4 md:p-6 cursor-pointer group transition-colors hover:bg-white/10 hover:border-red-500/30"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
            <point.icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{point.title}</h3>
          <p className="text-xs md:text-sm text-white/60">{point.desc}</p>
        </div>
      </m.div>
    </m.div>
  )
}
