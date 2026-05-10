import { redirect } from "next/navigation";
import { services } from "@/lib/services";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const firstService = services[0];

  if (firstService) {
    redirect(`/${locale}/service/${firstService.slug}`);
  }

  redirect(`/${locale}`);
}
