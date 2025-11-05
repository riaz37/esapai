"use client";

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
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-1.jpg", // Placeholder - update with actual image path
  },
  {
    id: "2",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-2.jpg",
  },
  {
    id: "3",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-3.jpg",
  },
  {
    id: "4",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-4.jpg",
  },
  {
    id: "5",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-5.jpg",
  },
  {
    id: "6",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-6.jpg",
  },
  {
    id: "7",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-7.jpg",
  },
];

export function Team({ members = defaultTeamMembers }: TeamProps) {
  // Layout: 1 top, 3 middle, 3 bottom
  const topMember = members[0];
  const middleMembers = members.slice(1, 4);
  const bottomMembers = members.slice(4, 7);

  return (
    <Section>
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

