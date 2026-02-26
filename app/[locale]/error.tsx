"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { ErrorProps } from "@/types/page";

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    if (process.env.NODE_ENV === "development") {
      console.error("Application error:", error);
    }
    // In production, send to error tracking service
    // e.g., Sentry.captureException(error)
  }, [error]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[20%] start-[10%] z-0 pointer-events-none opacity-20">
        <Image
          src="/landing/circle.svg"
          alt="Circle decoration"
          width={200}
          height={200}
          className="w-auto h-auto"
        />
      </div>
      <div className="absolute bottom-[20%] end-[10%] z-0 pointer-events-none opacity-20">
        <Image
          src="/landing/box.svg"
          alt="Box decoration"
          width={150}
          height={150}
          className="w-auto h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-4xl">
        {/* Error Icon/Code */}
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
            Something Went Wrong
          </h2>
          <p className="text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto mb-4">
            We encountered an unexpected error. Our team has been notified and is working on a fix.
          </p>
          {error.digest && (
            <p className="text-sm text-white-opacity-70 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="primary"
            size="lg"
            className="rounded-[40px] px-12 py-6 text-lg font-semibold min-w-[180px]"
            onClick={reset}
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]"
            asChild
          >
            <Link href="/">Go Home</Link>
          </Button>
        </div>

        {/* Helpful Information */}
        <div className="product-card p-6 md:p-8 max-w-md">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-radial-white">
            What you can do:
          </h3>
          <ul className="text-start space-y-2 text-light-gray-90">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Refresh the page or try again in a few moments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Check your internet connection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Contact support if the problem persists</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/contact"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-base font-semibold"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

