"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
  isLarge?: boolean;
  className?: string;
}

export function TeamCard({
  member,
  isLarge = false,
  className = "",
}: TeamCardProps) {
  return (
    <div
      className={cn(
        "relative group",
        isLarge ? "w-full max-w-md" : "flex-1 max-w-sm",
        className
      )}
    >
      <div className="relative team-card overflow-hidden rounded-[32px] p-6 md:p-8 h-full transition-all duration-300">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(19,245,132,0.15)] via-[rgba(19,245,132,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image Container with Glow */}
        <div className="relative mb-6 flex items-center justify-center py-4">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Multi-layer Green Glow Halo - Always visible, bright */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              {/* Outer glow */}
              <div className="absolute rounded-full blur-3xl opacity-70 group-hover:opacity-90 transition-opacity duration-300 bg-glow-outer" />
              {/* Inner glow */}
              <div className="absolute rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300 bg-glow-inner" />
            </div>

            {/* Profile Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/40 group-hover:border-primary/70 transition-colors duration-300 z-10">
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect fill='%23131313' width='160' height='160'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2313f584' font-size='48' font-family='Arial'%3E" +
                    encodeURIComponent(member.name.charAt(0)) +
                    "%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>

        {/* Role Tag */}
        <div className="mb-3 flex justify-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold">
            {member.role}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">
          {member.name}
        </h3>

        {/* Description */}
        <p className="text-base md:text-lg text-light-gray-90 text-center leading-relaxed">
          {member.description}
        </p>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-[32px] shadow-glow-primary-hover" />
        </div>
      </div>
    </div>
  );
}

