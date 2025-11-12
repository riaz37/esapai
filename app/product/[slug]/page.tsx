import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { ProductHero } from "@/components/sections/hero/product-hero";
import { Mission } from "@/components/sections/about/mission";
import { AutomationHub } from "@/components/sections/features/product/automation-hub";
import { YouTubeVideo } from "@/components/sections/shared/youtube-video";
import { PerformanceSection } from "@/components/sections/features/product/performance-section";
import { ProductFeatures } from "@/components/sections/features/product/product-features";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Extract content configurations with fallbacks
  const content = product.content || {};
  const heroSubtitle = content.hero?.subtitle || [
    "Where Innovation Meets Productivity Driven by agents Powered by automation",
    "Built for what's next",
  ];
  const heroCenterIcon = content.hero?.centerIcon;
  const heroCenterIconAlt = content.hero?.centerIconAlt;
  const missionContent = content.mission;
  const automationHubContent = content.automationHub;
  const youtubeVideoContent = content.youtubeVideo;
  const performanceContent = content.performance;
  const aceternityFeaturesContent = content.aceternityFeatures;

  return (
    <main className="relative">
      <ProductHero
        title={product.name}
        subtitle={heroSubtitle}
        centerIcon={heroCenterIcon}
        centerIconAlt={heroCenterIconAlt}
      />
      <Mission
        title={missionContent?.title}
        subtitle={missionContent?.subtitle}
        cards={missionContent?.cards}
      />
      <AutomationHub
        title={automationHubContent?.title}
        subtitle={automationHubContent?.subtitle}
        features={automationHubContent?.features}
      />

      <YouTubeVideo
        videoId={youtubeVideoContent?.videoId || "ED2H_y6dmC8"}
        title={youtubeVideoContent?.title}
      />
      <PerformanceSection metrics={performanceContent?.metrics} />
    </main>
  );
}
