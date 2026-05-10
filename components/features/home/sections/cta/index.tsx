"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { Product } from "@/types/product";

import { useStarWarp } from "@/lib/hooks/use-star-warp";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface CTASectionProps {
    title?: string;
    subtitle?: string;
    /** When provided (e.g. on product page), title/subtitle are derived from product. */
    product?: Product | null;
    primaryButtonText?: string;
    primaryButtonHref?: string;
}

export function CTASection({
    title: titleProp,
    subtitle: subtitleProp,
    product,
    primaryButtonText,
    primaryButtonHref,
}: CTASectionProps) {
    const t = useTranslations("CTA");
    const sectionRef = useRef<HTMLElement>(null);
    const { canvasRef } = useStarWarp();

    const title = titleProp ?? (product?.content?.cta?.title
        ?? (product ? t("productFallbackTitle", { name: product.name }) : t("title")));
    const subtitle = subtitleProp ?? (product?.content?.cta?.subtitle
        ?? product?.content?.mission?.subtitle ?? t("subtitle"));
    const displayPrimaryButtonText = primaryButtonText
        || product?.content?.cta?.buttonText
        || (product ? t("productFallbackButton") : t("button"));
    const href = primaryButtonHref
        ?? (product ? `/contact?product=${product.slug}` : "/contact");

    useGSAP(() => {
        if (!sectionRef.current) return;

        const children = sectionRef.current.querySelectorAll("h2, p, .flex > *");

        if (children) {
            gsap.fromTo(children,
                {
                    opacity: 0,
                    y: 40,
                    scale: 0.9,
                    filter: "blur(10px)",
                    immediateRender: false,
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }
            );
        }


    }, { scope: sectionRef });



    return (
        <Section
            ref={sectionRef}
            padding="md"
            background="transparent"
            withContainer={false}
            // Seamless blend: Using mask-image for the smoothest possible edge blending
            className="relative w-full min-h-[80vh] min-h-[450px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
            style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
        >
            {/* Canvas Background - z-0 */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 w-full h-full block"
            />

            {/* Content */}
            <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-center">
                <div className="max-w-[1400px] mx-auto">

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight mb-4 md:mb-6">
                        {title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white/70 leading-relaxed max-w-3xl tracking-tight mx-auto mb-8 md:mb-10">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Button
                            variant="primary"
                            size="default"
                            asChild
                        >
                            <Link href={href} className="inline-flex items-center gap-2 group">
                                <span>{displayPrimaryButtonText}</span>
                                <ButtonArrow size="default" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>


        </Section>
    );
}
