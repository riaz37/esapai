import React from "react";
import Image from "next/image";

interface MissionCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function MissionCard({
  title,
  description,
  imageSrc = "/landing/mission/mission.svg",
  imageAlt = "Mission illustration",
  className = "",
}: MissionCardProps) {
  return (
    <div className={`mission-card relative overflow-hidden ${className}`}>
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Card Title */}
        <h3 className="text-2xl font-bold mb-4 text-gradient-radial-white">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-base text-white-opacity-70 mb-6 grow">
          {description}
        </p>

        {/* Mission Graphic */}
        <div className="relative w-full h-48 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={200}
            className="w-full h-full max-w-[180px] max-h-[180px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

