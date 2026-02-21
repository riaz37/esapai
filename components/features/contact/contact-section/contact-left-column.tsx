"use client";

import Image from "next/image";
import { forwardRef, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { BadgeChip } from "@/components/ui/badge-chip";
import { MessageSquare } from "lucide-react";

export const ContactLeftColumn = forwardRef<
  HTMLDivElement,
  {
    socialLinks: ReadonlyArray<{ name: string; iconPath: string; href: string }>;
  }
>(function ContactLeftColumn({ socialLinks }, ref) {
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Hover effect for social icons - scale, rotation, and background
  const handleSocialHover = (index: number, isEntering: boolean) => {
    if (prefersReducedMotion()) return;

    const icon = socialIconRefs.current[index];
    if (!icon) return;

    if (isEntering) {
      gsap.to(icon, {
        scale: 1.15,
        rotation: 5,
        backgroundColor: "#13F584",
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    } else {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  return (
    <div ref={ref} className="lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Badge Indicator */}
      <div data-gsap="contact-left-item" className="mb-2">
        <BadgeChip label="Get in touch" icon={MessageSquare} />
      </div>

      {/* Main Heading */}
      <div className="space-y-4">
        <h1
          data-gsap="contact-left-item"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tighter pb-2"
        >
          <span className="text-white">Contact us today.</span>
          <br />
          <span className="text-white">We&apos;re ready</span>
          <br />
          <span className="text-primary">to assist you.</span>
        </h1>

        {/* Accent Line */}
        <div
          data-gsap="contact-left-item"
          className="h-[2px] w-24 bg-primary/80"
        />
      </div>

      {/* Description */}
      <p
        data-gsap="contact-left-item"
        className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl"
      >
        Whether you have a question, a comment, or just want to say hello, please
        don&apos;t hesitate to get in touch.
      </p>

      {/* Social Media Section */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6 pt-6 sm:pt-7 md:pt-8">
        <h2
          data-gsap="contact-left-item"
          className="text-gradient-primary text-lg sm:text-xl md:text-2xl font-semibold"
        >
          Get in touch On social media
        </h2>
        <div className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              ref={(el) => { socialIconRefs.current[index] = el; }}
              data-gsap="contact-social-icon"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full transition-shadow duration-300 min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px]"
              aria-label={social.name}
              onMouseEnter={() => handleSocialHover(index, true)}
              onMouseLeave={() => handleSocialHover(index, false)}
            >
              <span
                data-gsap="contact-social-float"
                className="inline-flex items-center justify-center"
              >
                <Image
                  src={social.iconPath}
                  alt={`${social.name} icon`}
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});



