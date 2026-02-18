"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { CaseStudyWithUrls } from "@/types/case-study";
import type { CaseStudyHeroProps } from "@/types/props";

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

            // Title animation - slide up and fade in
            if (titleRef.current) {
                gsap.set(titleRef.current, { opacity: 0, y: 40 });
                tl.to(titleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                });
            }

            // Subtitle animation
            if (subtitleRef.current) {
                gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
                tl.to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "-=0.5"
                );
            }


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
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto w-full">
                    {/* Hero Header Content */}
                    <div className="max-w-[1400px] mx-auto w-full mb-12 sm:mb-16">
                        <h1
                            ref={titleRef}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] text-primary"
                        >
                            {caseStudy.title}
                        </h1>

                        <p
                            ref={subtitleRef}
                            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-10"
                        >
                            {caseStudy.subtitle}
                        </p>

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
            </div>
        </div>
    );
}
