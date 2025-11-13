"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useProductMenu } from "./product-menu-context";
import { useServiceMenu } from "./service-menu-context";
import { ProductDropdownMenu } from "./product-dropdown-menu";
import { ServiceDropdownMenu } from "./service-dropdown-menu";

export function Navbar() {
  const pathname = usePathname();
  const { isProductOpen, setIsProductOpen } = useProductMenu();
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  
  // Floating navbar state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollThreshold] = useState(100); // Minimum scroll distance to trigger hide/show
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

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

  // Floating navbar scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the top
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, scrollThreshold]);

  const productActive = isProductOpen || isActive("/product");
  const serviceActive = isServiceOpen || isActive("/service");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4 py-5">
        <div className="mx-auto max-w-3xl bg-white-opacity-10 backdrop-blur-lg rounded-[40px] pl-8 pr-2 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
              <Image
                src="/logo/esaplogo.svg"
                alt="ESAP Logo"
                width={65}
                height={21}
                className="h-auto"
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <Link
                href="/"
                className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/")
                    ? "is-active text-primary"
                    : "text-light-gray hover:text-primary"
                }`}
              >
                <span className="nav-glow" aria-hidden="true" />
                <span className="relative z-10">Home</span>
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 z-10 ${
                    isActive("/")
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
                {/* Glow effect on hover */}
              </Link>
              {/* Product Dropdown */}
              <div className="relative" ref={productDropdownRef}>
                <button
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  className={`nav-link-group relative group whitespace-nowrap flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                    productActive
                      ? "is-active text-primary"
                      : "text-light-gray hover:text-primary"
                  }`}
                >
                  <span className="nav-glow" aria-hidden="true" />
                  <span className="relative z-10">Product</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 relative z-10 ${
                      isProductOpen ? "rotate-180" : ""
                    }`}
                  />
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 z-10 ${
                      productActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  />
                  {/* Glow effect on hover */}
                </button>
                <ProductDropdownMenu />
              </div>
              {/* Service Dropdown */}
              <div className="relative" ref={serviceDropdownRef}>
                <button
                  onClick={() => setIsServiceOpen(!isServiceOpen)}
                  className={`nav-link-group relative group whitespace-nowrap flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                    serviceActive
                      ? "is-active text-primary"
                      : "text-light-gray hover:text-primary"
                  }`}
                >
                  <span className="nav-glow" aria-hidden="true" />
                  <span className="relative z-10">Service</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 relative z-10 ${
                      isServiceOpen ? "rotate-180" : ""
                    }`}
                  />
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 z-10 ${
                      serviceActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  />
                  {/* Glow effect on hover */}
                </button>
                <ServiceDropdownMenu />
              </div>
              <Link
                href="/about"
                className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/about")
                    ? "is-active text-primary"
                    : "text-light-gray hover:text-primary"
                }`}
              >
                <span className="nav-glow" aria-hidden="true" />
                <span className="relative z-10">About Us</span>
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 z-10 ${
                    isActive("/about")
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
                {/* Glow effect on hover */}
              </Link>
              <Link
                href="/contact"
                className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/contact")
                    ? "is-active text-primary"
                    : "text-light-gray hover:text-primary"
                }`}
              >
                <span className="nav-glow" aria-hidden="true" />
                <span className="relative z-10">Contact Us</span>
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300 z-10 ${
                    isActive("/contact")
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
                {/* Glow effect on hover */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

