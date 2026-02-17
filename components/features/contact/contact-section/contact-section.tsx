"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, MutableRefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useToast } from "@/components/ui/toast";
import { Section } from "@/components/ui/section";

import { socialMediaLinks } from "./contact.constants";
import { ContactBackdrop } from "./contact-backdrop";
import { ContactLeftColumn } from "./contact-left-column";
import {
  ContactFormCard,
  type ContactFormData,
  type SubmissionState,
} from "./contact-form-card";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const leftHasAnimatedRef = useRef(false);
  const socialFloatTweensRef = useRef<gsap.core.Tween[]>([]);

  // Intersection observer to trigger animations when in view
  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.15,
    rootMargin: "100px",
  });

  // Separate observer for the left content (title + social section)
  const { setRef: setLeftIntersectionRef, isInView: isLeftInView } =
    useIntersectionAnimation({
      threshold: 0.15,
      rootMargin: "100px",
    });

  // Reset animation refs on mount to ensure animations play on navigation
  useEffect(() => {
    hasAnimatedRef.current = false;
    leftHasAnimatedRef.current = false;
    socialFloatTweensRef.current = [];
  }, []);

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const { showToast } = useToast();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToTerms) {
      showToast("Please accept the terms to continue.", "error");
      return;
    }

    setIsSubmitting(true);
    setSubmissionState("sending");

    try {
      // Step 1: Validate on server (Arcjet protection, rate limiting, etc.)
      const validationResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!validationResponse.ok) {
        const errorData = (await validationResponse.json()) as {
          success: boolean;
          message: string;
        };
        throw new Error(errorData.message || "Validation failed");
      }

      const validationData = (await validationResponse.json()) as {
        success: boolean;
        data?: {
          name: string;
          email: string;
          message: string;
          access_key: string;
        };
      };

      if (!validationData.success || !validationData.data) {
        throw new Error("Validation failed");
      }

      // Step 2: Submit to Web3Forms from client (required for free plan)
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("access_key", validationData.data.access_key);
      formDataToSubmit.append("name", validationData.data.name);
      formDataToSubmit.append("email", validationData.data.email);
      formDataToSubmit.append("message", validationData.data.message);

      const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSubmit,
      });

      const web3formsData = (await web3formsResponse.json()) as {
        success: boolean;
        message: string;
      };

      if (web3formsData.success) {
        setSubmissionState("success");
        showToast("Your message has been sent successfully!", "success");
        setFormData({ fullName: "", email: "", message: "" });
        setAgreedToTerms(false);
      } else {
        throw new Error(web3formsData.message || "Submission failed");
      }
    } catch (error) {
      setSubmissionState("error");
      showToast(
        error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set initial states once to prevent flash (only for non-reduced motion users)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!formCardRef.current) return;

      const items = formCardRef.current.querySelectorAll<HTMLElement>(
        '[data-gsap="contact-form-item"]'
      );

      gsap.set(formCardRef.current, { opacity: 0, y: 28, scale: 0.98 });
      gsap.set(items, { opacity: 0, y: 16 });
    },
    { scope: sectionRef }
  );

  // Left column initial states (title + social) - only for non-reduced motion users
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!leftColumnRef.current) return;

      const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
        '[data-gsap="contact-left-item"]'
      );
      const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
        '[data-gsap="contact-social-icon"]'
      );

      gsap.set(leftItems, { opacity: 0, y: 22 });
      gsap.set(socialIcons, { opacity: 0, y: 12, scale: 0.92 });
    },
    { scope: sectionRef }
  );

  // Entrance animation when the form card scrolls into view (plays once)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!formCardRef.current) return;
      if (hasAnimatedRef.current) return;

      // If IntersectionObserver hasn't fired yet, fall back to a simple viewport check
      const rect = formCardRef.current.getBoundingClientRect();
      const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInView && !isCurrentlyVisible) return;

      hasAnimatedRef.current = true;

      const items = formCardRef.current.querySelectorAll<HTMLElement>(
        '[data-gsap="contact-form-item"]'
      );

      const tl = gsap.timeline();
      tl.to(formCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      }).to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        },
        "-=0.45"
      );
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  // Fallback: Ensure form card is visible if already in viewport on mount
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!formCardRef.current) return;
    if (hasAnimatedRef.current) return;

    const checkAndAnimate = () => {
      if (!formCardRef.current || hasAnimatedRef.current) return;

      const rect = formCardRef.current.getBoundingClientRect();
      const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isCurrentlyVisible || isInView) {
        // Trigger animation manually if element is already visible
        const items = formCardRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="contact-form-item"]'
        );

        hasAnimatedRef.current = true;

        const tl = gsap.timeline();
        tl.to(formCardRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }).to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.45"
        );
      }
    };

    // Check immediately and after a short delay to handle navigation cases
    checkAndAnimate();
    const timeoutId = setTimeout(checkAndAnimate, 100);

    return () => clearTimeout(timeoutId);
  }, [isInView]);

  // Entrance animation for left column (plays once)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!leftColumnRef.current) return;
      if (leftHasAnimatedRef.current) return;

      // Fallback visibility check in case IntersectionObserver hasn't fired yet
      const rect = leftColumnRef.current.getBoundingClientRect();
      const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isLeftInView && !isCurrentlyVisible) return;

      leftHasAnimatedRef.current = true;

      const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
        '[data-gsap="contact-left-item"]'
      );
      const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
        '[data-gsap="contact-social-icon"]'
      );

      const tl = gsap.timeline();
      tl.to(leftItems, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.08,
      })
        .to(
          socialIcons,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.25"
        );
    },
    { scope: sectionRef, dependencies: [isLeftInView] }
  );

  // Fallback: Ensure left column is visible if already in viewport on mount
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!leftColumnRef.current) return;
    if (leftHasAnimatedRef.current) return;

    const checkAndAnimate = () => {
      if (!leftColumnRef.current || leftHasAnimatedRef.current) return;

      const rect = leftColumnRef.current.getBoundingClientRect();
      const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isCurrentlyVisible || isLeftInView) {
        const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="contact-left-item"]'
        );
        const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="contact-social-icon"]'
        );

        leftHasAnimatedRef.current = true;

        const tl = gsap.timeline();
        tl.to(leftItems, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
        })
          .to(
            socialIcons,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.06,
            },
            "-=0.25"
          );
      }
    };

    // Check immediately and after a short delay to handle navigation cases
    checkAndAnimate();
    const timeoutId = setTimeout(checkAndAnimate, 100);

    return () => clearTimeout(timeoutId);
  }, [isLeftInView]);


  // Safety fallback: Ensure content is visible after a delay if animations haven't triggered
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const safetyTimeout = setTimeout(() => {
      // If form card hasn't animated yet, make it visible
      if (formCardRef.current && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        const items = formCardRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="contact-form-item"]'
        );
        gsap.set(formCardRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(items, { opacity: 1, y: 0 });
      }

      // If left column hasn't animated yet, make it visible
      if (leftColumnRef.current && !leftHasAnimatedRef.current) {
        leftHasAnimatedRef.current = true;
        const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="contact-left-item"]'
        );
        const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="contact-social-icon"]'
        );
        gsap.set(leftItems, { opacity: 1, y: 0 });
        gsap.set(socialIcons, { opacity: 1, y: 0, scale: 1 });
      }
    }, 500); // 500ms safety timeout

    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <Section
      withContainer={false}
      padding="none"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20"
    >
      <ContactBackdrop />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start lg:items-center">
            <ContactLeftColumn
              ref={(node) => {
                leftColumnRef.current = node;
                setLeftIntersectionRef(node);
              }}
              socialLinks={socialMediaLinks}
            />

            <ContactFormCard
              ref={(node: HTMLDivElement | null) => {
                formCardRef.current = node;
                setIntersectionRef(node);
              }}
              formData={formData}
              agreedToTerms={agreedToTerms}
              isSubmitting={isSubmitting}
              submissionState={submissionState}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onAgreedToTermsChange={setAgreedToTerms}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}



