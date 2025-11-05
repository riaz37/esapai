"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Image from "next/image";

export function Product() {
  const products = [
    {
      id: 1,
      title: "Voice ERP",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 2,
      title: "AI Framework",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 3,
      title: "Zakra",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 4,
      title: "Jawib",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 5,
      title: "Fasih",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 6,
      title: "Domain Expansion",
      graphic: "/products/voiceerp.svg",
    },
  ];

  return (
    <Section>
      <SectionHeader
        title={
          <>
            <span className="block">Our</span>
            <span className="block text-primary">AI Product Suite</span>
          </>
        }
        subtitle="Discover our comprehensive range of AI-powered products designed to transform your business operations, from voice-activated ERP systems to intelligent knowledge agents and customer service solutions."
      />

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            graphic={product.graphic}
          />
        ))}
      </div>
    </Section>
  );
}

function ProductCard({ title, graphic }: { title: string; graphic: string }) {
  return (
    <SpotlightCard>
      <div className="relative p-8 h-full flex flex-col">
        {/* Product Graphic */}
        <div className="relative w-full h-48 flex items-center justify-center mb-6">
          <Image
            src={graphic}
            alt={`${title} illustration`}
            width={200}
            height={200}
            className="w-full h-full max-w-[180px] max-h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Card Title */}
        <h3 className="text-2xl font-bold mb-6 text-left text-gradient-radial-white transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        {/* Discover Button */}
        <div className="flex justify-start mt-auto">
          <Button variant="surface" className="transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/30">
            Discover
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
}

