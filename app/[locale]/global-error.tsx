"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { GlobalErrorProps } from "@/types/page";

function useErrorTranslations() {
  try {
    const t = useTranslations("Error");
    return {
      criticalTitle: t("criticalTitle"),
      criticalDescription: t("criticalDescription"),
      errorId: t("errorId"),
      reloadApp: t("reloadApp"),
      tryAgain: t("tryAgain"),
      troubleshooting: t("troubleshooting"),
      clearCache: t("clearCache"),
      tryBrowser: t("tryBrowser"),
      checkJs: t("checkJs"),
      contactIfPersists: t("contactIfPersists"),
      contactSupport: t("contactSupport"),
    };
  } catch {
    return {
      criticalTitle: "Critical Error",
      criticalDescription: "A critical error occurred that prevented the application from loading. Please refresh the page or try again later.",
      errorId: "Error ID",
      reloadApp: "Reload Application",
      tryAgain: "Try Again",
      troubleshooting: "Troubleshooting Steps:",
      clearCache: "Clear your browser cache and cookies",
      tryBrowser: "Try using a different browser",
      checkJs: "Check if JavaScript is enabled",
      contactIfPersists: "Contact support if the issue persists",
      contactSupport: "Contact Support",
    };
  }
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const t = useErrorTranslations();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Global application error:", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
          {/* Background gradient effect */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[rgb(19,245,132)] opacity-10 blur-[120px] rounded-full" />
          </div>


          {/* Main Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full blur-3xl opacity-70 bg-[rgba(19,245,132,0.3)]" />
                </div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(19, 245, 132)"
                    strokeWidth="2"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[rgb(19,245,132)] to-[rgb(19,245,132,0.6)] bg-clip-text text-transparent">
                {t.criticalTitle}
              </h2>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4">
                {t.criticalDescription}
              </p>
              {error.digest && (
                <p className="text-sm text-white/40 mt-2">
                  {t.errorId}: {error.digest}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="primary"
                size="lg"
                className="rounded-[40px] px-12 py-6 text-lg font-semibold min-w-[180px]"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                {t.reloadApp}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]"
                onClick={reset}
              >
                {t.tryAgain}
              </Button>
            </div>

            {/* Troubleshooting */}
            <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-6 md:p-8 max-w-md">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                {t.troubleshooting}
              </h3>
              <ul className="text-start space-y-2 text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-[rgb(19,245,132)] mt-1">•</span>
                  <span>{t.clearCache}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[rgb(19,245,132)] mt-1">•</span>
                  <span>{t.tryBrowser}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[rgb(19,245,132)] mt-1">•</span>
                  <span>{t.checkJs}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[rgb(19,245,132)] mt-1">•</span>
                  <span>{t.contactIfPersists}</span>
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="text-[rgb(19,245,132)] hover:text-[rgba(19,245,132,0.8)] transition-colors text-base font-semibold"
                >
                  {t.contactSupport} →
                </a>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
