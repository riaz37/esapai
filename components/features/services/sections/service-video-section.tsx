"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Play } from "lucide-react";
import { OptimizedVideo } from "@/components/ui/optimized-video";


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
            className="scroll-mt-20 md:scroll-mt-32"
        >
            <SectionHeader
                badge="Demo"
                badgeIcon={Play}
                title={title}
                subtitle={subtitle}
                align="center"
            />

            <div className="relative w-full max-w-[1400px] mx-auto aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <OptimizedVideo
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
