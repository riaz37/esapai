import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSanityServiceBySlug, getSanityServices, getUITranslations } from "@/lib/sanity/queries";
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

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const services = await getSanityServices(locale || "en");

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = await getSanityServiceBySlug(slug, locale);

  if (!service) {
    const messages = await getUITranslations(locale).catch(() => null);
    const meta = messages?.Service?.metadata;
    return {
      title: meta?.notFoundTitle ?? "Service Not Found",
      description: meta?.notFoundDescription ?? "The requested service could not be found.",
    };
  }

  return generateServiceMetadata(service.name, service.description, slug);
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug, locale } = await params;
  const service = await getSanityServiceBySlug(slug, locale);

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
