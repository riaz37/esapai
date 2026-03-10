"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRef, useState } from "react";
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

export function Footer() {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navigation");

  const navLinks = [
    { label: navT("home"), href: "/" },
    { label: navT("product"), href: "/product" },
    { label: navT("service"), href: "/service" },
    { label: navT("about"), href: "/about" },
    { label: navT("contact"), href: "/contact" },
  ];

  const footerRef = useRef<HTMLElement>(null);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const socialVideoRef = useRef<HTMLVideoElement>(null);
  const menuVideoRef = useRef<HTMLVideoElement>(null);
  const [ctaCardHovered, setCtaCardHovered] = useState(false);
  const [socialCardHovered, setSocialCardHovered] = useState(false);
  const [menuCardHovered, setMenuCardHovered] = useState(false);

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
          <Card
            className={cn(cardClasses, "flex-1 justify-center min-h-[300px] border-white/10 bg-white/5 backdrop-blur-sm")}
            onMouseEnter={() => {
              setCtaCardHovered(true);
              ctaVideoRef.current?.play();
            }}
            onMouseLeave={() => {
              setCtaCardHovered(false);
              ctaVideoRef.current?.pause();
            }}
          >
            <div className="absolute inset-0 z-0">
              <FooterBg2
                preserveAspectRatio="xMinYMin slice"
                className={cn("w-full h-full transition-opacity duration-500", ctaCardHovered ? "opacity-0" : "opacity-30")}
              />
              <video
                ref={ctaVideoRef}
                src="/footer2.mp4"
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-left-top transition-opacity duration-500"
                style={{ opacity: ctaCardHovered ? 0.3 : 0 }}
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">{t("cta.title")}</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-sm">
                {t("cta.subtitle")}
              </p>
              <Button variant="primary" size="default" asChild>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 group w-fit"
                >
                  <span>{t("cta.button")}</span>
                  <ButtonArrow size="default" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Bottom Card: Socials */}
          <Card
            className={cn(cardClasses, "flex-1 justify-center min-h-[300px] border-white/10 bg-white/5 backdrop-blur-sm")}
            onMouseEnter={() => {
              setSocialCardHovered(true);
              socialVideoRef.current?.play();
            }}
            onMouseLeave={() => {
              setSocialCardHovered(false);
              socialVideoRef.current?.pause();
            }}
          >
            <div className="absolute inset-0 z-0">
              <FooterBg3
                preserveAspectRatio="xMaxYMid slice"
                className={cn("w-full h-full transition-opacity duration-500", socialCardHovered ? "opacity-0" : "opacity-30")}
              />
              <video
                ref={socialVideoRef}
                src="/footer3.mp4"
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-500"
                style={{ opacity: socialCardHovered ? 0.3 : 0 }}
              />
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
        <Card
          className={cn(cardClasses, "h-auto min-h-[624px] relative border-white/10 bg-white/5 backdrop-blur-sm")}
          onMouseEnter={() => {
            setMenuCardHovered(true);
            menuVideoRef.current?.play();
          }}
          onMouseLeave={() => {
            setMenuCardHovered(false);
            menuVideoRef.current?.pause();
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <FooterBg1
              preserveAspectRatio="xMaxYMid slice"
              className={cn("w-full h-full transition-opacity duration-500", menuCardHovered ? "opacity-0" : "opacity-20")}
            />
            <video
              ref={menuVideoRef}
              src="/footer1.mp4"
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-500"
              style={{ opacity: menuCardHovered ? 0.2 : 0 }}
            />
          </div>

          <div className="relative z-10 flex flex-col h-full w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1">

              {/* Menu Section */}
              <div className="flex flex-col items-center md:items-start text-center md:text-start">
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">{t("menu.title")}</h2>
                <nav className="flex flex-col gap-6 items-center md:items-start">
                  {navLinks.map((link) => (
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
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">{t("newsletter.title")}</h2>
                <p className="text-gray-400 text-lg mb-8">
                  {t("newsletter.subtitle")}
                </p>
                <form className="w-full max-w-md space-y-4">
                  <input
                    type="email"
                    placeholder={t("newsletter.placeholder")}
                    required
                    className="contact-input w-full px-4 py-3.5 text-base text-light-gray"
                  />
                  <Button variant="primary" size="default" type="button" className="w-fit">
                    {t("newsletter.button")}
                  </Button>
                </form>
              </div>
            </div>

            <div className="mt-auto pt-10 w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
              <p>{`© ${new Date().getFullYear()} Esap. ${t("rights")}`}</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">{t("legal.privacy")}</Link>
                <Link href="/terms" className="hover:text-white transition-colors">{t("legal.terms")}</Link>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </footer>
  );
}
