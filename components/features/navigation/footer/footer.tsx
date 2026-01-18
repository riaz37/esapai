"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SyncedWireframe } from "./synced-wireframe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Service", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const horizonGlowRef = useRef<HTMLDivElement>(null);
  const pulseRippleRef = useRef<HTMLDivElement>(null);

  // Individual card refs for synchronization
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const [animationComplete, setAnimationComplete] = useState(false);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  useGSAP(() => {
    if (!isInView || !footerRef.current) return;

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
    const horizonGlow = horizonGlowRef.current;
    const pulseRipple = pulseRippleRef.current;

    // Set initial states
    gsap.set(cards, {
      y: 120,
      opacity: 0,
      scale: 0.92,
      filter: "blur(8px)",
      rotationX: 8,
    });

    gsap.set(horizonGlow, {
      scaleY: 0,
      opacity: 0,
    });

    gsap.set(pulseRipple, {
      scale: 0,
      opacity: 0,
    });

    // Main cinematic timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setAnimationComplete(true),
    });

    // Phase 1: Horizon Glow Bloom
    tl.to(horizonGlow, {
      scaleY: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    // Phase 2: Left column cards rise with parallax stagger
    tl.to(card1Ref.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotationX: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.4");

    tl.to(card2Ref.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotationX: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.7");

    // Phase 3: Right column card rises with slight delay
    tl.to(card3Ref.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotationX: 0,
      duration: 1.1,
      ease: "power3.out",
    }, "-=0.6");

    // Phase 4: Holographic flicker effect on cards
    tl.add(() => {
      cards.forEach((card, index) => {
        if (!card) return;

        // Create brief holographic flicker
        gsap.timeline()
          .to(card, {
            filter: "brightness(1.3) hue-rotate(15deg)",
            duration: 0.08,
            delay: index * 0.1,
          })
          .to(card, {
            filter: "brightness(0.9) hue-rotate(-10deg)",
            duration: 0.06,
          })
          .to(card, {
            filter: "brightness(1.1) hue-rotate(5deg)",
            duration: 0.05,
          })
          .to(card, {
            filter: "brightness(1) hue-rotate(0deg)",
            duration: 0.1,
          });
      });
    }, "-=0.3");

    // Phase 5: Energy pulse ripple on completion
    tl.to(pulseRipple, {
      scale: 3,
      opacity: 0.6,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.2");

    tl.to(pulseRipple, {
      scale: 5,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Phase 6: Dim horizon glow to subtle state
    tl.to(horizonGlow, {
      opacity: 0.4,
      duration: 1,
      ease: "sine.out",
    }, "-=1");

  }, { scope: footerRef, dependencies: [isInView] });

  // Shared Card Styles
  const cardClasses = "relative overflow-hidden flex flex-col p-8 sm:p-10 h-full gap-0";

  return (
    <footer
      ref={footerRef}
      className="w-full py-12 md:py-20 relative px-4 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Horizon Glow Effect - Bottom edge bloom */}
      <div
        ref={horizonGlowRef}
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none z-0"
        style={{
          background: "linear-gradient(to top, rgba(19, 245, 132, 0.25) 0%, rgba(19, 245, 132, 0.08) 40%, transparent 100%)",
          transformOrigin: "bottom center",
          filter: "blur(40px)",
        }}
      />

      {/* Energy Pulse Ripple */}
      <div
        ref={pulseRippleRef}
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(19, 245, 132, 0.5) 0%, rgba(19, 245, 132, 0.2) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 h-full relative z-10">

        {/* LEFT COLUMN */}
        <div ref={leftColRef} className="flex flex-col gap-4 h-full" style={{ transformStyle: "preserve-3d" }}>

          {/* Top Card: Connect / CTA */}
          <Card
            ref={card1Ref}
            className={cn(cardClasses, "flex-1 justify-center min-h-[300px]")}
            style={{ transformStyle: "preserve-3d" }}
          >
            <SyncedWireframe containerRef={footerRef} cardRef={card1Ref} animationTriggered={animationComplete} />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">Connect With Us</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-sm">
                Have a question or want to partner us? Reach out
              </p>
              <Button variant="primary" asChild>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 group w-fit"
                >
                  <span>Get Start</span>
                  <div className="w-8 h-8 rounded-full bg-[#13F584] flex items-center justify-center text-black group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]">
                    <ArrowUpRight size={18} strokeWidth={2.5} className="!size-[18px]" />
                  </div>
                </Link>
              </Button>
            </div>
          </Card>

          {/* Bottom Card: Socials */}
          <Card
            ref={card2Ref}
            className={cn(cardClasses, "flex-1 justify-center min-h-[300px]")}
            style={{ transformStyle: "preserve-3d" }}
          >
            <SyncedWireframe containerRef={footerRef} cardRef={card2Ref} animationTriggered={animationComplete} />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6">Connect With Us</h3>
              <p className="text-gray-400 text-lg mb-12 max-w-sm">
                Follow us on social media to stay update on our lates news and development
              </p>
              <div className="space-y-4">
                <p className="text-gray-500 uppercase text-sm tracking-wider">Follow Us</p>
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

        {/* RIGHT COLUMN: MENU & LINKS */}
        <Card
          ref={card3Ref}
          className={cn(cardClasses, "h-auto min-h-[624px] items-center text-center relative")}
          style={{ transformStyle: "preserve-3d" }}
        >
          <SyncedWireframe containerRef={footerRef} cardRef={card3Ref} animationTriggered={animationComplete} />
          <div className="relative z-10 flex flex-col h-full w-full">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">Menu</h2>

            <nav className="flex flex-col gap-6 items-center flex-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xl md:text-2xl text-gray-400 hover:text-[#13F584] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10 w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
              <p>© {new Date().getFullYear()} Esap. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of service</Link>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </footer>
  );
}
