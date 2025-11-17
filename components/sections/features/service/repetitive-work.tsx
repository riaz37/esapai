"use client";

import { Section } from "@/components/ui/section";
import Image from "next/image";

export function RepetitiveWork() {
  return (
    <Section padding="sm">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block text-light-gray-90">
                The End of{" "}
                <span className="text-gradient-primary">Repetitive</span>
              </span>
              <span className="block text-light-gray-90">
                Work. <span className="text-gradient-primary">Systems</span> that work
              </span>
              <span className="block text-light-gray-90">
                for people <span className="text-gradient-primary">not</span> the other
              </span>
              <span className="block text-light-gray-90">
                way around.
              </span>
            </h2>
          </div>

          {/* Right Side - Mission SVG */}
          <div className="md:col-span-2 flex items-center justify-end">
            <div className="relative w-full max-w-[300px] h-auto">
              <Image
                src="/landing/mission/mission.svg"
                alt="Mission illustration"
                width={230}
                height={216}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
    </Section>
  );
}

