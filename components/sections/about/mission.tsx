"use client";

import type { MissionCard as MissionCardType } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { MissionCard } from "@/components/ui/mission-card";

interface MissionProps {
  title?: string;
  subtitle?: string;
  cards?: MissionCardType[];
}

const defaultTitle = "Empowering Businesses with Intelligent AI Solutions";
const defaultSubtitle =
  "We build AI-powered systems that transform how businesses operate. From voice-activated ERP systems to intelligent knowledge agents, our solutions drive productivity, automation, and innovation across industries.";
const defaultCards: MissionCardType[] = [
  {
    title: "Voice-First Innovation",
    description:
      "Revolutionize business operations with voice-activated AI systems that make enterprise management accessible and intuitive for everyone.",
  },
  {
    title: "Intelligent Automation",
    description:
      "Deploy AI agents and automation frameworks that handle complex workflows, freeing your team to focus on strategic decision-making.",
  },
  {
    title: "Seamless Integration",
    description:
      "Connect legacy systems with modern AI capabilities through our Domain Expansion platform, modernizing without replacing infrastructure.",
  },
];

export function Mission({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  cards = defaultCards,
}: MissionProps = {}) {
  return (
    <Section>
      <SectionHeader title={title} subtitle={subtitle} />

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, index) => (
          <MissionCard
            key={index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </Section>
  );
}

