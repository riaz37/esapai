"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { CaseStudyWithUrls } from "@/types/case-study";
import type { CaseStudyHeroProps } from "@/types/props";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { m } from "motion/react";

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    const anim = useGSAPAnimations(sectionRef);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;

            const tl = anim.createTimeline();

            // Title/Subtitle animations handled by TypewriterTitle and motion.p


            // Hero images reveal animation
            if (imagesRef.current && caseStudy.heroImages && caseStudy.heroImages.length >= 2) {
                const imageContainers = imagesRef.current.querySelectorAll<HTMLElement>(".hero-image-container");
                gsap.set(imageContainers, { opacity: 0, scale: 1.1, y: 30 });
                tl.to(
                    imageContainers,
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );
            }
        },
        { scope: sectionRef, dependencies: [caseStudy] }
    );

    return (
        <div
            ref={sectionRef}
            className="relative z-10 w-full mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
            {/* Hero Header Content */}
            <div className="max-w-4xl w-full mb-12 sm:mb-16">
                <TypewriterTitle
                    title={caseStudy.title}
                    splitMode="lastWord"
                    highlightPart="last"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 pl-2"
                    align="left"
                    staggerDelay={0.02}
                    letterDuration={0.4}
                />

                <m.p
                    ref={subtitleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-10"
                >
                    {caseStudy.subtitle}
                </m.p>
            </div>

            {/* Hero Images */}
            {caseStudy.heroImages && caseStudy.heroImages.length >= 2 && (
                <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {caseStudy.heroImages.slice(0, 2).map((image, index) => (
                        <div
                            key={image.url}
                            className="hero-image-container relative aspect-video rounded-lg overflow-hidden"
                        >
                            <Image
                                src={image.url}
                                alt={image.alt || `${caseStudy.title} - Hero ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
