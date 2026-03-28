"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import type { Product } from "@/types/product";
import type { Service } from "@/types/service";
import { useBodyScrollLock } from "@/lib/hooks/use-body-scroll-lock";

import { ProductDropdownMenu } from "../menus/product-dropdown-menu";
import { ServiceDropdownMenu } from "../menus/service-dropdown-menu";
import { useProductMenu } from "../menus/product-menu-context";
import { useServiceMenu } from "../menus/service-menu-context";
import { MobileAccordion, type MobileMenuItem } from "./mobile-accordion";
import { LanguageSelector } from "./language-selector";

import {
  Navbar as ResizableUiNavbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/navbar/index";
import { NavLinkItem } from "./components/nav-link-item";
import { NavDropdownTrigger } from "./components/nav-dropdown-trigger";


export function Navbar({ visible, services, products }: { visible?: boolean; services: Service[]; products: Product[] }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const { isProductOpen, setIsProductOpen } = useProductMenu();
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  useBodyScrollLock(isMobileMenuOpen);

  useEffect(() => {
    function handleProductClickOutside(event: MouseEvent) {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductOpen(false);
      }
    }

    if (isProductOpen) {
      document.addEventListener("mousedown", handleProductClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleProductClickOutside);
    };
  }, [isProductOpen, setIsProductOpen]);

  useEffect(() => {
    function handleServiceClickOutside(event: MouseEvent) {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpen(false);
      }
    }

    if (isServiceOpen) {
      document.addEventListener("mousedown", handleServiceClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleServiceClickOutside);
    };
  }, [isServiceOpen, setIsServiceOpen]);

  const productActive = isProductOpen || isActive("/product");
  const serviceActive = isServiceOpen || isActive("/service");
  const mobileProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.menuDescription || p.description,
    slug: p.slug,
  })) satisfies MobileMenuItem[];
  const mobileServices = services.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    slug: s.slug,
  })) satisfies MobileMenuItem[];

  return (
    <ResizableUiNavbar className="fixed inset-x-0 top-2 z-[100]">
      {/* Desktop Navbar */}
      <NavBody visible={visible}>
        {/* Logo */}
        <div className="flex flex-1 justify-start">
          <NavbarLogo visible={visible} />
        </div>

        {/* Desktop Navigation Links */}
        <div className={cn(
          "hidden lg:flex flex-none items-center justify-center transition-all duration-300",
          visible ? "gap-0.5" : "gap-2"
        )}>
          <NavLinkItem
            href="/"
            label={t("home")}
            isActive={isActive("/")}
            visible={visible}
          />

          {/* Product Dropdown */}
          <div className="relative" ref={productDropdownRef}>
            <NavDropdownTrigger
              label={t("product")}
              isActive={productActive}
              isOpen={isProductOpen}
              onClick={() => setIsProductOpen(!isProductOpen)}
              visible={visible}
            />
            <ProductDropdownMenu products={products} />
          </div>

          {/* Service Dropdown */}
          <div className="relative" ref={serviceDropdownRef}>
            <NavDropdownTrigger
              label={t("service")}
              isActive={serviceActive}
              isOpen={isServiceOpen}
              onClick={() => setIsServiceOpen(!isServiceOpen)}
              visible={visible}
            />
            <ServiceDropdownMenu services={services} />
          </div>

          <NavLinkItem
            href="/about"
            label={t("about")}
            isActive={isActive("/about")}
            visible={visible}
          />
          <NavLinkItem
            href="/case-study"
            label={t("case-study")}
            isActive={isActive("/case-study")}
            visible={visible}
          />
        </div>

        {/* Nav Actions */}
        <div className={cn(
          "flex flex-1 justify-end items-center transition-all duration-300",
          visible ? "gap-2" : "gap-4"
        )}>
          <LanguageSelector className="hidden lg:block" visible={visible} />
          <NavbarButton href="/contact" variant="primary" size={visible ? "sm" : "default"}>
            {t("contact")}
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <div className="flex w-full items-center justify-between px-4 py-2">
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col w-full gap-0.5">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive("/") ? "is-active bg-[#13F584]/5 text-[#13F584]" : "text-white hover:text-[#13F584]"
                }`}
            >
              <span className="relative z-10 text-base font-semibold">{t("home")}</span>
            </Link>

            <MobileAccordion
              id="mobile-products"
              title={t("product")}
              isOpen={isMobileProductsOpen}
              onToggle={() => {
                setIsMobileProductsOpen((prev) => !prev);
                setIsMobileServicesOpen(false);
              }}
              items={mobileProducts}
              basePath="/product"
              isSectionActive={isActive("/product")}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />

            <MobileAccordion
              id="mobile-services"
              title={t("service")}
              isOpen={isMobileServicesOpen}
              onToggle={() => {
                setIsMobileServicesOpen((prev) => !prev);
                setIsMobileProductsOpen(false);
              }}
              items={mobileServices}
              basePath="/service"
              isSectionActive={isActive("/service")}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive("/about") ? "is-active bg-[#13F584]/5 text-[#13F584]" : "text-white hover:text-[#13F584]"
                }`}
            >
              <span className="relative z-10 text-base font-semibold">{t("about")}</span>
            </Link>

            <Link
              href="/case-study"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive("/case-study") ? "is-active bg-[#13F584]/5 text-[#13F584]" : "text-white hover:text-[#13F584]"
                }`}
            >
              <span className="relative z-10 text-base font-semibold">{t("case-study")}</span>
            </Link>

            {/* Separator */}
            <div className="h-px bg-white/5 mx-3 my-2" />

            <div className="px-4 py-2 flex items-center justify-center">
              <LanguageSelector />
            </div>

            {/* Separator */}
            <div className="h-px bg-white/5 mx-3 my-2" />

            <div className="px-2">
              <NavbarButton
                href="/contact"
                variant="primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("contact")}
              </NavbarButton>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableUiNavbar>
  );
}



