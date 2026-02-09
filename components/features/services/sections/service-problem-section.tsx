"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { AlertTriangle, Clock, Database, FileX, ZapOff } from "lucide-react";
import { cn } from "@/lib/utils";

const PAIN_POINTS = [
  {
    icon: Clock,
    title: "Manual Bottlenecks",
    desc: "Hours lost to repetitive data entry and copy-pasting between tools.",
    x: -20, y: 10, rotate: -5, delay: 0.1
  },
  {
    icon: Database,
    title: "Siloed Data",
    desc: "Critical information trapped in disconnected spreadsheets and emails.",
    x: 20, y: -15, rotate: 3, delay: 0.2
  },
  {
    icon: ZapOff,
    title: "Slow Velocity",
    desc: "Projects stalled by waiting on manual approvals and handoffs.",
    x: -10, y: 20, rotate: -2, delay: 0.3
  },
  {
    icon: FileX,
    title: "Human Error",
    desc: "Costly mistakes slipping through due to fatigue and complexity.",
    x: 15, y: 10, rotate: 4, delay: 0.4
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
    <Section id="why-this-service" className="overflow-hidden bg-neutral-950 relative min-h-screen flex items-center">
      {/* Background Chaos Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div className="max-w-xl">
            <SectionHeader
              badge="The Challenge"
              badgeIcon={AlertTriangle}
              title={title}
              subtitle={subtitle}
              align="left"
              className="mb-8"
              titleClassName="text-5xl md:text-6xl font-bold tracking-tight"
            />
            <motion.div
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
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
            </motion.div>
          </div>

          {/* Floating Cards Visual */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            {PAIN_POINTS.map((point, i) => (
              <PainCard key={i} point={point} />
            ))}
          </div>

        </div>
      </div>
    </Section>
  );
}

function PainCard({ point }: { point: typeof PAIN_POINTS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: point.x * 5, y: point.y * 5, scale: 0.8 }}
      whileInView={{ opacity: 1, x: point.x, y: point.y, scale: 1, rotate: point.rotate }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, delay: point.delay, type: "spring" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, borderColor: "rgba(239, 68, 68, 0.5)" }}
      className="absolute p-6 w-72 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl cursor-pointer group transtion-colors hover:bg-white/10"
      style={{
        left: `calc(50% + ${point.x * 3}px)`, // Spread horizontally
        top: `calc(50% + ${point.y * 4}px)`,  // Spread vertically
        marginLeft: "-144px", // Center offset (half width)
        marginTop: "-100px"   // Center offset (half height approx)
      }}
    >
      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
        <point.icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{point.title}</h3>
      <p className="text-sm text-white/60">{point.desc}</p>
    </motion.div>
  )
}
