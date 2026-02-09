"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ClipboardList, CheckCircle2, ChevronRight } from "lucide-react";
import { CommitmentCard } from "./commitment-card";
import { cn } from "@/lib/utils";

// Checklist data (mock for now, should come from props)
const REQUIREMENTS = [
  {
    id: "strategy",
    title: "Strategic Goals",
    description: "Business objectives, KPIs, and success metrics.",
    status: "pending",
  },
  {
    id: "access",
    title: "System Access",
    description: "API keys, documentation, and environment credentials.",
    status: "pending",
  },
  {
    id: "assets",
    title: "Brand Assets",
    description: "Design guidelines, logos, and UI component libraries.",
    status: "pending",
  },
  {
    id: "data",
    title: "Data Sources",
    description: "Sample datasets, schema definitions, and validation rules.",
    status: "pending",
  },
];

export function ServiceWhatWeNeedSection({
  title = "Initialize Protocol",
  subtitle = "Insert the following modules to begin the engagement sequence.",
}: {
  title?: string;
  subtitle?: string;
}) {

  return (
    <div className="relative bg-black border-t border-white/5">
      <Section className="min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Header & Checklist */}
          <div className="space-y-12">
            <SectionHeader
              badge="Input Requirements"
              badgeIcon={ClipboardList}
              title={title}
              subtitle={subtitle}
              align="left"
              className="mb-8"
            />

            <div className="space-y-4">
              {REQUIREMENTS.map((req, index) => (
                <ChecklistItem key={req.id} item={req} index={index} />
              ))}
            </div>
          </div>

          {/* Right: Commitment Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="mb-6">
              <SectionHeader
                badge="Our Commitment"
                badgeIcon={CheckCircle2}
                title="We Build. You Scale."
                subtitle="While you focus on the vision, we handle the engine."
                align="left"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <CommitmentCard
                title="Production Ready"
                desc="Rigorous testing and enterprise-grade security from day one."
              />
              <CommitmentCard
                title="Transparent Process"
                desc="Real-time dashboards and weekly sprint demos."
              />
              <CommitmentCard
                title="Botsmith Support"
                desc="24/7 monitoring and optimization after launch."
              />
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
}

function ChecklistItem({ item, index }: { item: typeof REQUIREMENTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-primary/50"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-primary transition-colors group-hover:bg-primary group-hover:text-black">
          <ChevronRight className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-white/60 group-hover:text-white/80">
            {item.description}
          </p>
        </div>
      </div>

      {/* Active Indicator Line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-primary scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
    </motion.div>
  );
}
