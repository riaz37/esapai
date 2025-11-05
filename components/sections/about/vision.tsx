"use client";

import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

export function Vision() {
  return (
    <Section>
      <SectionHeader
        title={
          <>
            <span className="block">Rebuilding today,</span>
            <span className="block">empowering tomorrow</span>
          </>
        }
        subtitle="We envision a future where AI seamlessly integrates into every aspect of business operations. Our mission is to make advanced AI technology accessible, practical, and transformative for enterprises of all sizes."
      />

        {/* Robot Icon with Bot Light behind and Dot Circle below */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Bot Light (glow effect behind robot) */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 z-0">
            <Image
              src="/landing/vision/Bot light.svg"
              alt="Bot light glow"
              width={517}
              height={795}
              className="w-auto h-auto object-contain"
              priority
            />
          </div>

          {/* Robot Icon (in front) */}
          <div className="relative z-10 mb-8">
            <Image
              src="/landing/vision/robot.svg"
              alt="AI Robot icon"
              width={300}
              height={300}
              className="w-full h-full max-w-[250px] md:max-w-[300px] object-contain"
              priority
            />
          </div>

          {/* Dot Circle (at bottom of robot) */}
          <div className="relative z-10 -mt-[280px] w-full flex items-center justify-center">
            <Image
              src="/landing/vision/Dot circle.svg"
              alt="Radiating dots pattern"
              width={1200}
              height={800}
              className="w-full max-w-[1400px] object-contain"
            />
          </div>
        </div>
    </Section>
  );
}

