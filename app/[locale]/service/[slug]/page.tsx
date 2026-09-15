import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
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
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  const tServices = await getTranslations({ locale, namespace: "Services" });
  let localizedName: string | undefined;
  let localizedDescription: string | undefined;
  try {
    const serviceMeta = tServices.raw(slug) as { name?: string; menuDescription?: string } | undefined;
    localizedName = serviceMeta?.name;
    localizedDescription = serviceMeta?.menuDescription;
  } catch {
    // No translation entry for this slug — fall back to the base service copy.
  }

  return generateServiceMetadata(
    localizedName ?? service.name,
    localizedDescription ?? service.description,
    slug,
    locale
  );
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug, locale } = await params;
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
      locale,
    }),
    generateBreadcrumbSchema(
      [
        { name: "Home", url: "/" },
        { name: "Services", url: "/service" },
        { name: service.name, url: `/service/${slug}` },
      ],
      locale
    ),
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
