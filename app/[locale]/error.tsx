"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { ErrorProps } from "@/types/page";

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("Error");

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Application error:", error);
    }
  }, [error]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[min(800px,200vw)] h-[min(800px,200vw)] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>


      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute rounded-full blur-3xl opacity-70 bg-glow-outer" />
              <div className="absolute rounded-full blur-xl opacity-80 bg-glow-inner" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(19, 245, 132)"
                strokeWidth="2"
                className="filter-glow-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-primary">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto mb-4">
            {t("description")}
          </p>
          {error.digest && (
            <p className="text-sm text-white-opacity-70 mt-2">
              {t("errorId")}: {error.digest}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="primary"
            size="lg"
            className="rounded-[32px] sm:rounded-[40px] py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-w-[140px] sm:min-w-[180px] min-h-[44px] sm:min-h-[48px]"
            onClick={reset}
          >
            {t("tryAgain")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-[32px] sm:rounded-[40px] px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-w-[140px] sm:min-w-[180px] min-h-[44px] sm:min-h-[48px]"
            asChild
          >
            <Link href="/">{t("goHome")}</Link>
          </Button>
        </div>

        {/* Helpful Information */}
        <div className="product-card p-4 sm:p-5 md:p-6 lg:p-8 max-w-md w-full">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-radial-white">
            {t("whatToDo")}
          </h3>
          <ul className="text-start space-y-2 text-light-gray-90">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t("tip1")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t("tip2")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t("tip3")}</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/contact"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-base font-semibold"
            >
              {t("contactSupport")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
