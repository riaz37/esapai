"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/components/providers/cookie-consent-context";
import Link from "next/link";

export function CookieConsentBanner() {
  const { consentStatus, acceptCookies, rejectCookies } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show banner if consent is pending
    if (consentStatus === "pending") {
      // Delay to ensure it doesn't interfere with LCP
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [consentStatus]);

  if (consentStatus !== "pending" || !isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
    >
      <div className="container mx-auto px-3 sm:px-4 pb-3 sm:pb-4 md:pb-6">
        <div className="relative rounded-xl sm:rounded-2xl border border-white-opacity-20 bg-white-opacity-10 backdrop-blur-lg p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl max-w-3xl mx-auto">
          {/* Background gradient effect */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-primary opacity-10 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-5 md:gap-6">
              <div className="flex-1 space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-light-gray-90">
                  Cookie Consent
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white-opacity-70 leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline transition-colors font-medium"
                  >
                    Learn more
                  </Link>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:ml-6 shrink-0">
                <Button
                  onClick={rejectCookies}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-light-gray hover:bg-white/20"
                >
                  Reject
                </Button>
                <Button
                  onClick={acceptCookies}
                  variant="primary"
                  showArrow={false}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

