"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { m, useScroll, useSpring } from "motion/react";
import CircularGallery from "@/components/features/about-backup/circular-gallery";
import { teamData } from "@/lib/team-data";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { SectionHeader } from "@/components/ui/section-header";
import { BadgeChip } from "@/components/ui/badge-chip";
import { LazySection } from "@/components/ui/lazy-section";
import { AboutHero } from "@/components/features/about-backup/hero";
import { Users, Info, Rocket } from "lucide-react";

const FoundingStorySection = dynamic(
  () =>
    import("@/components/features/about-backup/sections").then((mod) => ({
      default: mod.FoundingStorySection,
    })),
  { ssr: true }
);

const CTASection = dynamic(
  () =>
    import("@/components/features/home/sections/cta").then((mod) => ({
      default: mod.CTASection,
    })),
  { ssr: true }
);

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = teamData[activeIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoothing the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    return smoothProgress.onChange((v) => {
      setProgressValue(v);
    });
  }, [smoothProgress]);

  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
    ]),
  ];

  const galleryItems = useMemo(() => teamData.map((member) => ({
    image: member.image,
    text: member.name,
  })), []);

  return (
    <>
      <StructuredDataComponent data={structuredData} />

      <main className="bg-black">
        <AboutHero />

        <LazySection minHeight="100vh">
          <FoundingStorySection />
        </LazySection>

        {/* Our Team - Static Header Section - Scrolls away before pinning */}
        <div className="pt-32 pb-12 px-8 md:px-12">
          <div className="container mx-auto">
            <SectionHeader
              badge="Core Team"
              badgeIcon={Users}
              title="Our Team"
              subtitle="Meet the visionaries and builders behind ESAP AI's next-generation platform."
              align="center"
              className="mb-0"
            />
          </div>
        </div>

        {/* Scroll Track - Gallery pins here */}
        <div ref={containerRef} className="relative h-[600vh]">

          {/* Sticky Container */}
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
            <div className="w-full h-full relative">

              {/* Team Member Info - Bottom Left */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-30 max-w-md pointer-events-none">
                <m.div
                  key={activeMember.id}
                  initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl pointer-events-auto shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <BadgeChip
                        label={activeMember.role}
                        icon={Rocket}
                        className="bg-primary/10 border-primary/20 text-primary"
                      />
                      <div className="opacity-30 group-hover:opacity-60 transition-opacity">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-3xl md:text-5xl text-white font-bold leading-tight tracking-tight">
                        {activeMember.name}
                      </h2>
                      <div className="mt-2 h-1 w-12 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                    </div>

                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                      {activeMember.bio}
                    </p>

                    <div className="pt-4 flex items-center gap-4 text-xs text-white/30 tracking-widest uppercase">
                      <span>Protocol: 0{activeMember.id}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>Status: Active</span>
                    </div>
                  </div>
                </m.div>
              </div>

              {/* Circular Gallery - Full Screen */}
              <div className="w-full h-full absolute inset-0 z-10">
                <div className="w-full h-full">
                  <CircularGallery
                    items={galleryItems}
                    bend={2.5}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    font="bold 20px monospace"
                    scrollSpeed={2}
                    scrollEase={0.1}
                    onChange={setActiveIndex}
                    progress={progressValue}
                  />
                </div>
              </div>

              {/* Background elements */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
              </div>
            </div>
          </div>
        </div>

        <LazySection minHeight="400px">
          <CTASection
            subtitle="Meet the team behind ESAP AI, then explore our products or get in touch."
          />
        </LazySection>
      </main>
    </>
  );
}
