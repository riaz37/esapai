import { Hero } from "@/components/sections/hero/hero";
import { Mission } from "@/components/sections/about/mission";
import { Service } from "@/components/sections/features/home/service";
import { Vision } from "@/components/sections/about/vision";
import { WorldMapSection } from "@/components/sections/features/home/world-map-section";
import { ProductShowcase } from "@/components/sections/features/home/product-showcase";


export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Mission />
      <Vision />
      <Service />
      <ProductShowcase />
     
    </main>
  );
}
