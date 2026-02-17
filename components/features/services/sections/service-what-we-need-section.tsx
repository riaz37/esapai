"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ClipboardList } from "lucide-react";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ServiceWhatWeNeedSection({
  title = "Initialize Protocol",
  subtitle = "Insert the following modules to begin the engagement sequence.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section
      className="flex flex-col items-center justify-center"
      containerMaxWidth="wide"
      padding="md"
    >
      <div className="w-full flex flex-col items-center">

        {/* Header - Centered */}
        <SectionHeader
          badge="Integration Core"
          badgeIcon={ClipboardList}
          title={title}
          subtitle={subtitle}
          align="center"
          className="mb-16 max-w-3xl"
        />

        {/* Full Width Visual Component */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl p-1 rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-sm relative transition-all duration-500 hover:bg-white/[0.02]">

            {/* Glows */}
            <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <DatabaseWithRestApi
              className="w-full max-w-none h-[400px] md:h-[500px] lg:h-[600px]"
              title="Secure Data Exchange Protocol"
              circleText="CORE"
              lightColor="var(--color-primary)"
              badgeTexts={{
                first: "AUTH",
                second: "SYNC",
                third: "PUSH",
                fourth: "EXEC",
              }}
              buttonTexts={{
                first: "ErosaCloud",
                second: "v3_stable"
              }}
            />
          </div>
        </div>

      </div>
    </Section>
  );
}
