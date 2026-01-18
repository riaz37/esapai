"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { products } from "@/lib/products";
import { ProductCard } from "@/components/ui/product-card";

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
        // Next card covers the current one
        const nextCard = cards[i + 1];
        if (!nextCard || !card) return;

        // Downcast to HTMLElement to access style safely if needed, though gsap handles it.
        const cardInner = card;
        const shadowOverlay = card.querySelector(".shadow-overlay");

        gsap.to(cardInner, {
          scrollTrigger: {
            trigger: nextCard,
            start: "top 65%", // Start transitioning when next card enters upper viewport
            end: "top top+=100",      // Fully transitioned when next card covers it 
            scrub: true,
          },
          scale: 0.85,
          filter: "blur(8px)",
          ease: "none",
          // Removed opacity: 0 to keep it visible in background
        });

        if (shadowOverlay) {
          gsap.to(shadowOverlay, {
            scrollTrigger: {
              trigger: nextCard,
              start: "top 65%",
              end: "top top+=100",
              scrub: true,
            },
            opacity: 0.6, // Darken the card as it recedes
            ease: "none"
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative w-full py-32 bg-transparent overflow-visible"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header Removed as requested */}

        {/* Sticky Stacking Container */}
        <div ref={containerRef} className="flex flex-col items-center pb-[40vh] perspective-[1000px]">
          {products.map((product, index) => {
            // Sticky top offset
            const topOffset = 80 + index * 10;

            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="sticky w-full max-w-[1400px]"
                style={{
                  top: `${topOffset}px`,
                  zIndex: index + 1,
                  // Margin to allow scrolling. Last card doesn't need margin.
                  marginBottom: index === products.length - 1 ? "0px" : "80vh",
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
