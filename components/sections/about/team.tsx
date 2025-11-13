"use client";

import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TeamCard, type TeamMember } from "@/components/ui/team-card";

export type { TeamMember };

interface TeamProps {
  members?: TeamMember[];
}

const defaultTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, the visionary and dynamic Founder of ESAP AI.",
    image: "/founder.png",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "Chief Executive Officer",
    description: "Sarah champions our strategic direction, partnerships, and long-term growth initiatives.",
    image: "/founder.png",
  },
  {
    id: "3",
    name: "Liam Chen",
    role: "Chief Technology Officer",
    description: "Liam architects our AI-first platform and leads the engineering teams delivering intelligent automation.",
    image: "/founder.png",
  },
  {
    id: "4",
    name: "Ava Rodríguez",
    role: "Chief Operations Officer",
    description: "Ava ensures seamless execution across global operations and customer success programs.",
    image: "/founder.png",
  },
  {
    id: "5",
    name: "Noah Patel",
    role: "Head of Product",
    description: "Noah drives product strategy, translating customer insights into transformative AI experiences.",
    image: "/founder.png",
  },
  {
    id: "6",
    name: "Mia Thompson",
    role: "Lead AI Engineer",
    description: "Mia builds our voice-first agent models with a relentless focus on reliability and performance.",
    image: "/founder.png",
  },
  {
    id: "7",
    name: "Ethan Park",
    role: "Director of Customer Success",
    description: "Ethan partners with clients to implement AI ERP workflows that unlock measurable productivity gains.",
    image: "/founder.png",
  },
];

export function Team({ members = defaultTeamMembers }: TeamProps) {
  // Layout: 1 top, 3 middle, 3 bottom
  const topMember = members[0];
  const middleMembers = members.slice(1, 4);
  const bottomMembers = members.slice(4, 7);

  return (
    <Section className="relative">
      {/* Background grid */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0 h-full w-screen">
        <div className="relative h-full w-full">
          <Image
            src="/aboutgrid.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            priority
          />
        </div>
      </div>

      <SectionHeader
        title="Our Team"
        subtitle="Meet the visionaries driving innovation and transforming the future of AI-powered automation."
        subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-3xl mx-auto px-4 mb-16"
      />

        {/* Team Grid */}
        <div className="relative max-w-6xl mx-auto">
          {/* Top Row - 1 large card, centered */}
          {topMember && (
            <div className="flex justify-center mb-8 md:mb-12">
              <TeamCard member={topMember} isLarge />
            </div>
          )}

          {/* Middle Row - 3 cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mb-8 md:mb-12">
            {middleMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Bottom Row - 3 cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
            {bottomMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
    </Section>
  );
}

