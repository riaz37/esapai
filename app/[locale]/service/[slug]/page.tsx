import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/services";
import { ServicePage } from "@/components/features/services/pages/service-page";
import { generateServiceMetadata } from "@/lib/seo/metadata";
import { generateServiceSchema } from "@/lib/seo/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import type { ServiceSlugPageProps } from "@/types/page";

interface Props extends ServiceSlugPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return generateServiceMetadata(service.name, service.description, slug);
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Generate structured data
  const serviceImage =
    service.content?.hero?.centerIcon || service.icon || "/services/default-service.svg";

  const structuredData = [
    generateServiceSchema({
      name: service.name,
      description: service.description,
      image: serviceImage,
      url: `/service/${slug}`,
      provider: {
        name: "ESAP AI",
        url: "https://www.esap.ai/",
      },
      serviceType: "AI Consulting and Integration",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/service" },
      { name: service.name, url: `/service/${slug}` },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <div className="relative">
        <ServicePage slug={slug} initialService={service} />
      </div>
    </>
  );
}
