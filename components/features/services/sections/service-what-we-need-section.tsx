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
    <div className="relative bg-black border-t border-white/5">
      <Section className="min-h-screen flex flex-col justify-center py-24">
        <div className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column: Visual Component */}
            <div className="flex flex-col items-center justify-center order-2 lg:order-1">
              <div className="w-full max-w-[500px] p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-md relative overflow-hidden group">
                {/* Decorative background glows */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-1000" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <DatabaseWithRestApi
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

            {/* Right Column: Content & Commitments */}
            <div className="space-y-12 order-1 lg:order-2">
              <div className="space-y-6">
                <SectionHeader
                  badge="Integration Core"
                  badgeIcon={ClipboardList}
                  title={title}
                  subtitle={subtitle}
                  align="left"
                  className="mb-8"
                />

                <p className="text-white/60 text-lg leading-relaxed">
                  Our integration engine facilitates seamless data flow between your existing infrastructure and our advanced AI modules, ensuring protocol integrity and high-speed execution.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Encrypted Channels",
                    desc: "End-to-end encryption for every packet exchanged through our REST API."
                  },
                  {
                    title: "Real-time Synchronization",
                    desc: "Minimal latency with websocket-enhanced data streams."
                  },
                  {
                    title: "Automated Validation",
                    desc: "Continuous schema checks and security audits on every endpoint."
                  }
                ].map((item, i) => (
                  <Card key={i} className="border-0 !py-4" style={{ boxShadow: 'none' }}>
                    <CardHeader className="!px-6 !pb-1">
                      <CardTitle className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="!px-6 !pb-4">
                      <p className="text-white/50 leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Section>
    </div>
  );
}
