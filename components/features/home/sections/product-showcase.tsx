"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { products } from "@/lib/products";
import { ProductCard } from "@/components/ui/product-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Rocket } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean);

      cards.forEach((card, i) => {
        const nextCard = cards[i + 1];
        if (!nextCard || !card) return;

        const shadowOverlay = card.querySelector(".shadow-overlay");
        const cardContent = card.querySelector(".relative.h-full.flex"); // Target inner content for parallax

        // Receding card animation
        gsap.fromTo(card,
          {
            scale: 1,
            rotateX: 0,
            z: 0,
            filter: "blur(0px)",
          },
          {
            scrollTrigger: {
              trigger: nextCard,
              start: "top 85%", // Start earlier for smoother transition
              end: "top 120",   // Lock at the uniform stacking point
              scrub: 1.5,      // Luxury momentum
              invalidateOnRefresh: true,
            },
            scale: 0.85,
            rotateX: -10,      // Tilt back as it recedes
            z: -100,           // Sink into depth
            filter: "blur(10px)",
            ease: "power2.inOut",
            force3D: true,     // GPU acceleration
          });

        // Inner content parallax
        if (cardContent) {
          gsap.to(cardContent, {
            scrollTrigger: {
              trigger: nextCard,
              start: "top 85%",
              end: "top 120",
              scrub: 1.5,
            },
            y: -40,             // Move content slightly faster/differently
            opacity: 0.8,
            ease: "power2.inOut",
          });
        }

        if (shadowOverlay) {
          gsap.fromTo(shadowOverlay,
            { opacity: 0 },
            {
              scrollTrigger: {
                trigger: nextCard,
                start: "top 85%",
                end: "top 120",
                scrub: 1.5,
              },
              opacity: 0.7, // Slightly deeper shadow
              ease: "power2.in", // Natural parabolic occlusion
            });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative w-full py-20 sm:py-32 bg-transparent overflow-visible"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Product Discovery"
          subtitle="Experience our ecosystem of intelligent tools."
          badge="Product Showcase"
          badgeIcon={Rocket}
        />

        {/* Sticky Stacking Container */}
        <div ref={containerRef} className="flex flex-col items-center pb-10 perspective-[1000px]">
          {products.map((product, index) => {
            // Sticky top offset - uniform 120px to clear navbar (80px) with margin
            const topOffset = 120;

            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="sticky w-full max-w-[1400px] preserve-3d"
                style={{
                  top: `${topOffset}px`,
                  zIndex: index + 1,
                  // Margin to allow scrolling. Last card doesn't need margin.
                  marginBottom: index === products.length - 1 ? "0px" : "40vh",
                }}
              >
                {/* Shadow Overlay for darkening effect */}
                <div
                  className="shadow-overlay absolute inset-0 bg-black pointer-events-none z-20 rounded-[inherit] transition-opacity will-change-opacity"
                  style={{ opacity: 0 }}
                />

                <div className="w-full h-[700px]">
                  <ProductCard
                    product={product}
                    index={index}
                    videoRef={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="h-full shadow-2xl bg-background"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
