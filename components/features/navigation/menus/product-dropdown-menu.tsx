"use client";

import { products } from "@/lib/products";
import { DropdownMenu } from "./dropdown-menu";
import { useProductMenu } from "./product-menu-context";
import { useTranslations } from "next-intl";

export function ProductDropdownMenu() {
  const { isProductOpen, setIsProductOpen } = useProductMenu();
  const t = useTranslations("Menus");

  return (
    <DropdownMenu
      title={t("ourProducts")}
      description={t("productDescription")}
      items={products}
      basePath="/product"
      dropdownClass="product-dropdown"
      itemClass="product-dropdown-item"
      isOpen={isProductOpen}
      onClose={() => setIsProductOpen(false)}
    />
  );
}






