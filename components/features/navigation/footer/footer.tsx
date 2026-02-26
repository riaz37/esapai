"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";



import FooterBg1 from "./components/footer-bg-1";
import FooterBg2 from "./components/footer-bg-2";
import FooterBg3 from "./components/footer-bg-3";

const socialIcons = [
  {
    name: "Facebook",
    iconPath: "/contact/cfacebook.svg",
    href: "https://www.facebook.com/esapai.official/",
  },
  { name: "X", iconPath: "/contact/xc.svg", href: "https://x.com/esap_ai" },
  {
    name: "LinkedIn",
    iconPath: "/contact/clinkedin.svg",
    href: "https://www.linkedin.com/company/esapai/",
  },
  {
    name: "Instagram",
    iconPath: "/contact/cinstagram.svg",
    href: "https://www.instagram.com/esapai.official/",
  },
  {
    name: "YouTube",
    iconPath: "/contact/xyoutube.svg",
    href: "https://www.youtube.com/channel/UC7LyRbfXwb7at1gCQpUMzGg",
  },
];

const DEFAULT_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Service", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export interface FooterProps {
  navLinks?: { label: string; href: string }[];
  legalLinks?: { label: string; href: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  copyrightText?: string;
}

export function Footer({
  navLinks,
  legalLinks,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  newsletterTitle,
  newsletterSubtitle,
  copyrightText,
}: FooterProps = {}) {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navigation");

  const effectiveNavLinks = navLinks || [
    { label: navT("home"), href: "/" },
    { label: navT("product"), href: "/product" },
    { label: navT("service"), href: "/service" },
    { label: navT("about"), href: "/about" },
    { label: navT("contact"), href: "/contact" },
  ];

  const effectiveCtaTitle = ctaTitle || t("cta.title");
  const effectiveCtaSubtitle = ctaSubtitle || t("cta.subtitle");
  const effectiveCtaButtonText = ctaButtonText || t("cta.button");
  const effectiveNewsletterTitle = newsletterTitle || t("newsletter.title");
  const effectiveNewsletterSubtitle = newsletterSubtitle || t("newsletter.subtitle");
  const effectiveCopyrightText = copyrightText || `© ${new Date().getFullYear()} Esap. ${t("rights")}`;
  const footerRef = useRef<HTMLElement>(null);

  // Shared Card Styles
  const cardClasses = "relative overflow-hidden flex flex-col p-8 sm:p-10 h-full gap-0";

  return (
    <footer
      ref={footerRef}
      className="w-full py-12 md:py-20 relative px-4 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 h-full relative z-10">

        {/* LEFT COLUMN: CONNECT & SOCIALS */}
        <div className="flex flex-col gap-4 h-full">

          {/* Top Card: Connect / CTA */}
          <Card className={cn(cardClasses, "flex-1 justify-center min-h-[300px] border-white/10 bg-white/5 backdrop-blur-sm")}>
            <div className="absolute inset-0 z-0">
              <FooterBg2 className="w-full h-full object-cover opacity-30" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">{effectiveCtaTitle}</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-sm">
                {effectiveCtaSubtitle}
              </p>
              <Button variant="primary" size="default" asChild>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 group w-fit"
                >
                  <span>{effectiveCtaButtonText}</span>
                  <ButtonArrow size="default" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Bottom Card: Socials */}
          <Card className={cn(cardClasses, "flex-1 justify-center min-h-[300px] border-white/10 bg-white/5 backdrop-blur-sm")}>
            <div className="absolute inset-0 z-0">
              <FooterBg3 className="w-full h-full object-cover opacity-30" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6">{t("social.title")}</h3>
              <p className="text-gray-400 text-lg mb-12 max-w-sm">
                {t("social.description")}
              </p>
              <div className="space-y-4">
                <p className="text-gray-500 text-xs tracking-widest">{t("social.connect")}</p>
                <div className="flex items-center gap-4">
                  {socialIcons.map((icon) => (
                    <Link
                      key={icon.name}
                      href={icon.href}
                      target="_blank"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#13F584] hover:text-black transition-all duration-300 text-white border border-white/10"
                    >
                      <Image
                        src={icon.iconPath}
                        alt={icon.name}
                        width={18}
                        height={18}
                        className="opacity-80 group-hover:opacity-100"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* RIGHT COLUMN: COMBINED MENU & NEWSLETTER */}
        <Card className={cn(cardClasses, "h-auto min-h-[624px] relative border-white/10 bg-white/5 backdrop-blur-sm")}>
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <FooterBg1 className="w-full h-full object-cover opacity-20" />
          </div>

          <div className="relative z-10 flex flex-col h-full w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1">

              {/* Menu Section */}
              <div className="flex flex-col items-center md:items-start text-center md:text-start">
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">{t("menu.title")}</h2>
                <nav className="flex flex-col gap-6 items-center md:items-start">
                  {effectiveNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-xl md:text-2xl text-gray-400 hover:text-[#13F584] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Newsletter Section */}
              <div className="flex flex-col items-center md:items-start text-center md:text-start">
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">{effectiveNewsletterTitle}</h2>
                <p className="text-gray-400 text-lg mb-8">
                  {effectiveNewsletterSubtitle}
                </p>
                <form className="w-full max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder={t("newsletter.placeholder")}
                    required
                    className="contact-input w-full px-4 py-3.5 text-base text-light-gray"
                  />
                  <Button variant="primary" size="default" className="w-fit">
                    {t("newsletter.button")}
                  </Button>
                </form>
              </div>
            </div>

            <div className="mt-auto pt-10 w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
              <p>{effectiveCopyrightText}</p>
              <div className="flex gap-6">
                {legalLinks ? (
                  legalLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  ))
                ) : (
                  <>
                    <Link href="/privacy" className="hover:text-white transition-colors">{t("legal.privacy")}</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">{t("legal.terms")}</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

      </div>
    </footer>
  );
}
