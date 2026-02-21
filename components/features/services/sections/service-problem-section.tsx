"use client";

import { m } from "motion/react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { AlertTriangle, Clock, Database, FileX, ZapOff } from "lucide-react";
import { useMemo } from "react";

const PAIN_POINTS = [
  {
    icon: Clock,
    title: "Manual Bottlenecks",
    desc: "Hours lost to repetitive data entry and copy-pasting between tools.",
    x: -30, y: -5, rotate: -6, delay: 0.1
  },
  {
    icon: Database,
    title: "Siloed Data",
    desc: "Critical information trapped in disconnected spreadsheets and emails.",
    x: 35, y: -25, rotate: 5, delay: 0.2
  },
  {
    icon: ZapOff,
    title: "Slow Velocity",
    desc: "Projects stalled by waiting on manual approvals and handoffs.",
    x: -15, y: 35, rotate: -4, delay: 0.3
  },
  {
    icon: FileX,
    title: "Human Error",
    desc: "Costly mistakes slipping through due to fatigue and complexity.",
    x: 25, y: 25, rotate: 6, delay: 0.4
  }
];

export function ServiceProblemSection({
  title = "The Manual Trap",
  subtitle = "Your team was hired to innovate, not to be glue between broken systems.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section
      id="why-this-service"
      className="relative flex items-center scroll-mt-20 md:scroll-mt-32"
      padding="md"
    >
      {/* Background Chaos Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">

        {/* Text Content */}
        <div className="max-w-xl">
          <SectionHeader
            badge="The Challenge"
            badgeIcon={AlertTriangle}
            title={title}
            subtitle={subtitle}
            align="left"
            titleClassName="text-5xl md:text-6xl font-bold tracking-tight"
          />
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed"
          >
            <p className="mb-6">
              Every growing enterprise hits a wall where complexity outpaces capacity.
              When your brightest minds are stuck moving data instead of making decisions, growth stalls.
            </p>
          </m.div>
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
          {PAIN_POINTS.map((point) => (
            <PainCard key={point.title} point={point} />
          ))}
        </m.div>

      </div>
    </Section>
  );
}

function PainCard({ point }: { point: typeof PAIN_POINTS[0] }) {
  // Stable random values for the "chaos" drift
  const randomDuration = useMemo(() => 4 + Math.random() * 3, []); // 4-7s duration
  const randomY = useMemo(() => 5 + Math.random() * 10, []); // 5-15px drift
  const randomRotate = useMemo(() => -2 + Math.random() * 4, []); // -2 to +2 deg wobble
  const randomDelay = useMemo(() => Math.random() * 2, []);

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
          y: [0, -randomY, randomY / 2, 0],
          rotate: [0, randomRotate, -randomRotate, 0],
        }}
        transition={{
          duration: randomDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: randomDelay
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
