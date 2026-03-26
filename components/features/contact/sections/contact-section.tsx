"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";

import { socialMediaLinks } from "./contact.constants";
import { ContactBackdrop } from "./contact-backdrop";
import { ContactLeftColumn } from "./contact-left-column";
import { ContactFormCard } from "./contact-form-card";

import { useTranslations } from "next-intl";
import { useContactForm } from "../hooks/use-contact-form";
import { useContactAnimations } from "../hooks/use-contact-animations";

interface ContactSectionProps {
  productSlug?: string;
}

export function ContactSection({ productSlug }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Contact");

  // Resolve product name from slug for pre-fill
  const productName = productSlug
    ? t.has(`productNames.${productSlug}`)
      ? t(`productNames.${productSlug}`)
      : productSlug.charAt(0).toUpperCase() + productSlug.slice(1)
    : undefined;

  // Form Logic Hook
  const {
    formData,
    agreedToTerms,
    isSubmitting,
    submissionState,
    fieldErrors,
    handleInputChange,
    handleSubmit,
    setAgreedToTerms,
    resetForm,
  } = useContactForm({
    initialMessage: productName
      ? t("form.productInterest", { product: productName })
      : undefined,
  });

  // Animation Logic Hook
  const { setIntersectionRef, setLeftIntersectionRef } = useContactAnimations({
    sectionRef,
    formCardRef,
    leftColumnRef,
  });

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
              fieldErrors={fieldErrors}
              productName={productName}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onAgreedToTermsChange={setAgreedToTerms}
              onReset={resetForm}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
