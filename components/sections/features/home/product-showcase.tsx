"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  // Show all products in the suite
  return (
    <Section background="dark" padding="md">
      <SectionHeader
        title="Our Product Suite"
        subtitle="Discover our comprehensive range of AI-powered solutions designed to transform your business operations and drive innovation."
        subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
        {products.map((product) => {
          const iconSrc = product.icon ?? product.content?.hero?.centerIcon;
          const iconAlt =
            product.content?.hero?.centerIconAlt ?? `${product.name} icon`;

          return (
            <Link key={product.id} href={`/product/${product.slug}`} className="block h-full">
              <SpotlightCard className="h-full">
                <div className="p-6 md:p-8 h-full flex flex-col">
                  {/* Product Icon */}
                  {iconSrc && (
                    <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                      <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain filter-glow-primary"
                      />
                    </div>
                  )}

                  {/* Product Name */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-radial-white">
                    {product.name}
                  </h3>

                  {/* Product Description */}
                  <p className="text-base md:text-lg text-light-gray-90 leading-relaxed mb-6 flex-1">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div
                    className={cn(
                      "btn-surface text-base font-semibold mt-auto w-fit transition-all"
                    )}
                  >
                    <span>Learn More</span>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

