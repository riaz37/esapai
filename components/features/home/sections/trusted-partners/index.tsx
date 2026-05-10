"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_PARTNERS = [
    { logo: "/partners/emp.svg", alt: "" },
    { logo: "/partners/emp-1.svg", alt: "" },
    { logo: "/partners/emp-2.svg", alt: "" },
    { logo: "/partners/emp-3.svg", alt: "" },
    { logo: "/partners/emp-4.svg", alt: "" },
    { logo: "/partners/emp-5.svg", alt: "" },
];

function PartnerItem({ partner }: { partner: { id: string; logo: string; alt: string } }) {
    const [broken, setBroken] = useState(false);
    if (broken || !partner.logo) return null;
    return (
        <div className="partner-item flex items-center justify-center px-8 sm:px-12 md:px-16 cursor-pointer">
            <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 flex items-center justify-center overflow-hidden">
                <div className="partner-glow absolute inset-0 blur-2xl rounded-full" />
                <Image
                    src={partner.logo}
                    alt={partner.alt || ""}
                    fill
                    className="object-contain opacity-40 brightness-0 invert"
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                    onError={() => setBroken(true)}
                />
            </div>
        </div>
    );
}

export interface PartnerData {
    logo: string;
    alt?: string;
}

export interface TrustedPartnersProps {
    partners?: PartnerData[];
}

export function TrustedPartners({ partners = DEFAULT_PARTNERS }: TrustedPartnersProps) {
    const MARQUEE_PARTNERS = [
        ...partners.map((p) => ({ ...p, id: `a-${p.logo}`, alt: p.alt || "" })),
        ...partners.map((p) => ({ ...p, id: `b-${p.logo}`, alt: p.alt || "" })),
    ];
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const logos = sectionRef.current.querySelectorAll(".partner-item");

        // Reveal the section
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)", immediateRender: false },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    end: "top 70%",
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                ease: "expo.out",
            }
        );

        // Staggered logo reveal
        gsap.fromTo(logos,
            { opacity: 0, scale: 0.8, y: 10, immediateRender: false },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            }
        );

        // Infinite seamless marquee animation
        if (marqueeRef.current) {
            const marquee = marqueeRef.current;
            const isRTL = document.documentElement.dir === "rtl";

            gsap.set(marquee, { xPercent: 0 });

            marqueeTweenRef.current = gsap.to(marquee, {
                xPercent: isRTL ? 50 : -50,
                duration: 30,
                ease: "none",
                repeat: -1,
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full pt-12 pb-8 sm:pt-14 sm:pb-10 md:pt-16 md:pb-12">
            <div
                className="relative flex overflow-hidden"
                onMouseEnter={() => marqueeTweenRef.current?.pause()}
                onMouseLeave={() => marqueeTweenRef.current?.resume()}
            >
                {/* Marquee Row */}
                <div ref={marqueeRef} className="flex whitespace-nowrap">
                    {MARQUEE_PARTNERS.map((partner) => (
                        <PartnerItem key={partner.id} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    );
}
