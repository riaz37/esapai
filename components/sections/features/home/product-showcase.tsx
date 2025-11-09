"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";

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
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`} className="block h-full">
            <SpotlightCard className="h-full">
              <div className="p-6 md:p-8 h-full flex flex-col">
                {/* Product Icon */}
                {product.content?.hero?.centerIcon && (
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                    <Image
                      src={product.content.hero.centerIcon}
                      alt={`${product.name} icon`}
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
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                  <span>Learn More</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>

      {/* View All Products Link */}
      <div className="mt-12 text-center">
        <Button
          variant="outline"
          size="lg"
          className="rounded-[40px] px-8 py-6 text-lg font-semibold border-white-opacity-20 hover:bg-white-opacity-10"
          asChild
        >
          <Link href="/product">View All Products</Link>
        </Button>
      </div>
    </Section>
  );
}

