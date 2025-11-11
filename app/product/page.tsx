import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark">
        {/* Background gradient effect */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[20%] left-[10%] z-0 pointer-events-none opacity-20">
          <Image
            src="/landing/circle.svg"
            alt="Circle decoration"
            width={200}
            height={200}
            className="w-auto h-auto"
          />
        </div>
        <div className="absolute bottom-[20%] right-[10%] z-0 pointer-events-none opacity-20">
          <Image
            src="/landing/box.svg"
            alt="Box decoration"
            width={150}
            height={150}
            className="w-auto h-auto"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gradient-primary">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto">
            Discover our comprehensive suite of AI-powered solutions designed to transform your business operations
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <Section>
        <SectionHeader
          title="Explore Our AI Solutions"
          subtitle="Each product is built with cutting-edge technology to solve real-world business challenges and drive innovation."
          subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto px-4">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="block h-full">
              <SpotlightCard className="h-full">
                <div className="p-5 md:p-6 h-full flex flex-col">
                  {/* Product Icon */}
                  {product.content?.hero?.centerIcon && (
                    <div className="relative w-12 h-12 md:w-16 md:h-16 mb-5 flex items-center justify-center">
                      <Image
                        src={product.content.hero.centerIcon}
                        alt={`${product.name} icon`}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain filter-glow-primary"
                      />
                    </div>
                  )}

                  {/* Product Name */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gradient-radial-white">
                    {product.name}
                  </h3>

                  {/* Product Description */}
                  <p className="text-sm md:text-base text-light-gray-90 leading-relaxed mb-5 flex-1">
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

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-lg md:text-xl text-light-gray-90 mb-6">
            Need help choosing the right solution for your business?
          </p>
          <Button
            variant="primary"
            size="lg"
            className="rounded-[40px] px-8 py-6 text-lg font-semibold"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}

