"use client";

import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { ContactFormData, SubmissionState } from "@/types/contact";
import type { FieldErrors } from "../hooks/use-contact-form";

export type { ContactFormData, SubmissionState };

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin -ms-1 me-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function SuccessConfirmation({ onReset }: { onReset: () => void }) {
  const t = useTranslations("Contact");
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white">
        {t("form.successTitle")}
      </h3>
      <p className="text-white/70 text-sm max-w-xs">
        {t("form.successMessage")}
      </p>
      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={onReset}
        className="mt-4"
      >
        {t("form.sendAnother")}
      </Button>
    </div>
  );
}

export const ContactFormCard = forwardRef<
  HTMLDivElement,
  {
    formData: ContactFormData;
    agreedToTerms: boolean;
    isSubmitting: boolean;
    submissionState: SubmissionState;
    fieldErrors?: FieldErrors;
    productName?: string;
    onInputChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onAgreedToTermsChange: (checked: boolean) => void;
    onReset?: () => void;
  }
>(function ContactFormCard(
  {
    formData,
    agreedToTerms,
    isSubmitting,
    submissionState,
    fieldErrors = {},
    productName,
    onInputChange,
    onSubmit,
    onAgreedToTermsChange,
    onReset,
  },
  ref
) {
  const t = useTranslations("Contact");

  const inputErrorClass = "border-red-500/60 focus:border-red-400";

  return (
    <div className="lg:col-span-1 w-full">
      <Card
        ref={ref}
        className="contact-form-card px-6 sm:px-8 py-8 sm:py-10"
      >
        {submissionState === "success" ? (
          <SuccessConfirmation onReset={onReset ?? (() => {})} />
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5 md:space-y-6" noValidate>
            {/* Product Context Banner */}
            {productName && (
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-4 py-3">
                <span className="text-primary text-sm font-medium">
                  {t("form.productBanner", { product: productName })}
                </span>
              </div>
            )}

            {/* Full Name Field */}
            <div data-gsap="contact-form-item" className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="fullName"
                className="text-white text-xs sm:text-sm font-semibold tracking-wide block"
              >
                {t("form.fullName")}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={onInputChange}
                placeholder={t("form.fullNamePlaceholder")}
                aria-invalid={!!fieldErrors.fullName}
                aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                className={`contact-input w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-light-gray min-h-[44px] ${fieldErrors.fullName ? inputErrorClass : ""}`}
              />
              {fieldErrors.fullName && (
                <p id="fullName-error" className="text-red-400 text-xs mt-1" role="alert">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div data-gsap="contact-form-item" className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="email"
                className="text-white text-xs sm:text-sm font-semibold tracking-wide block"
              >
                {t("form.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={onInputChange}
                placeholder={t("form.emailPlaceholder")}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={`contact-input w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-light-gray min-h-[44px] ${fieldErrors.email ? inputErrorClass : ""}`}
              />
              {fieldErrors.email && (
                <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div data-gsap="contact-form-item" className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="message"
                className="text-white text-xs sm:text-sm font-semibold tracking-wide block"
              >
                {t("form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onInputChange}
                placeholder={t("form.messagePlaceholder")}
                rows={5}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                className={`contact-input w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-light-gray resize-none ${fieldErrors.message ? inputErrorClass : ""}`}
              />
              {fieldErrors.message && (
                <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div data-gsap="contact-form-item">
              <Button
                type="submit"
                variant="primary"
                size="default"
                disabled={!agreedToTerms || isSubmitting}
                showArrow={!isSubmitting}
                className="w-fit"
              >
                {isSubmitting ? <LoadingSpinner /> : t("form.submit")}
              </Button>
            </div>

            {/* Terms and Conditions */}
            <div data-gsap="contact-form-item" className="flex items-start gap-2 sm:gap-3 pt-1 sm:pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => onAgreedToTermsChange(e.target.checked)}
                className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-white-opacity-20 bg-white-opacity-10 text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 cursor-pointer accent-primary min-w-[20px] min-h-[20px] sm:min-w-[20px] sm:min-h-[20px]"
              />
              <label
                htmlFor="terms"
                className="text-white/60 text-xs sm:text-sm md:text-base cursor-pointer leading-relaxed"
              >
                {t("form.termsPrefix")}
                <Link
                  href="/terms"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("form.termsLink")}
                </Link>
              </label>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
});
