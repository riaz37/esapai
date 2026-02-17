"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Play } from "lucide-react";

export function ServiceVideoSection({
    videoSrc = "/servicesmax.mp4",
    title = "See It In Action",
    subtitle = "Watch how our integrated protocol transforms your workflow in real-time.",
}: {
    videoSrc?: string;
    title?: string;
    subtitle?: string;
}) {
    return (
        <Section
            id="service-video"
            padding="md"
        >
            <SectionHeader
                badge="Demo"
                badgeIcon={Play}
                title={title}
                subtitle={subtitle}
                align="center"
                className="mb-10"
            />

            <div className="relative w-full max-w-[1400px] mx-auto aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
                <video
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                />

                {/* Optional subtle overlay for depth */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>
        </Section>
    );
}
