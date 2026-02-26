"use client";

import type { Service } from "@/types/service";
import { DropdownMenu } from "./dropdown-menu";
import { useServiceMenu } from "./service-menu-context";
import { useTranslations } from "next-intl";

interface Props {
  services: Service[];
}

export function ServiceDropdownMenu({ services }: Props) {
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();
  const t = useTranslations("Menus");

  return (
    <DropdownMenu
      title={t("ourServices")}
      description={t("serviceDescription")}
      items={services}
      basePath="/service"
      dropdownClass="service-dropdown"
      itemClass="service-dropdown-item"
      isOpen={isServiceOpen}
      onClose={() => setIsServiceOpen(false)}
    />
  );
}






