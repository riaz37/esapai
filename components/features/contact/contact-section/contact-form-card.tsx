"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { ContactFormData, SubmissionState } from "@/types/contact";

export type { ContactFormData, SubmissionState };

export const ContactFormCard = forwardRef<
  HTMLDivElement,
  {
    formData: ContactFormData;
    agreedToTerms: boolean;
    isSubmitting: boolean;
    submissionState: SubmissionState;
    onInputChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onAgreedToTermsChange: (checked: boolean) => void;
  }
>(function ContactFormCard(
  {
    formData,
    agreedToTerms,
    isSubmitting,
    submissionState,
    onInputChange,
    onSubmit,
    onAgreedToTermsChange,
  }: {
    formData: ContactFormData;
    agreedToTerms: boolean;
    isSubmitting: boolean;
    submissionState: SubmissionState;
    onInputChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onAgreedToTermsChange: (checked: boolean) => void;
  },
  ref
) {
  return (
    <div className="lg:col-span-1 w-full">
      <Card
        ref={ref}
        className="contact-form-card px-6 sm:px-8 py-8 sm:py-10"
      >
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Full Name Field */}
          <div data-gsap="contact-form-item" className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="fullName"
              className="text-white/70 text-xs sm:text-sm font-semibold tracking-wide block"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              placeholder="John Doe"
              required
              className="contact-input w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-light-gray min-h-[44px]"
            />
          </div>

          {/* Email Field */}
          <div data-gsap="contact-form-item" className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="email"
              className="text-white/70 text-xs sm:text-sm font-semibold tracking-wide block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="name@company.com"
              required
              className="contact-input w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-light-gray min-h-[44px]"
            />
          </div>

          {/* Message Field */}
          <div data-gsap="contact-form-item" className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="message"
              className="text-white/70 text-xs sm:text-sm font-semibold tracking-wide block"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={onInputChange}
              placeholder="How can we help you?"
              required
              rows={5}
              className="contact-input w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-light-gray resize-none"
            />
          </div>

          {/* Submit Button */}
          <div data-gsap="contact-form-item">
            <Button
              type="submit"
              variant="primary"
              size="default"
              disabled={!agreedToTerms || isSubmitting}
              className="w-fit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>

          {/* Terms and Conditions */}
          <div data-gsap="contact-form-item" className="flex items-start gap-2 sm:gap-3 pt-1 sm:pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => onAgreedToTermsChange(e.target.checked)}
              required
              className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-white-opacity-20 bg-white-opacity-10 text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 cursor-pointer accent-primary min-w-[20px] min-h-[20px] sm:min-w-[20px] sm:min-h-[20px]"
            />
            <label
              htmlFor="terms"
              className="text-white/60 text-xs sm:text-sm md:text-base cursor-pointer leading-relaxed"
            >
              By submitting, I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ESAP Terms of Conditions
              </Link>
            </label>
          </div>
        </form>
      </Card>
    </div>
  );
});



