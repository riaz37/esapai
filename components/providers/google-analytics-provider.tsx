"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "./cookie-consent-context";
import type { GoogleAnalyticsProviderProps } from "@/types/provider";

/**
 * Google Analytics Provider
 * 
 * Initializes Google Analytics only after user consent and client-side mount.
 */
export function GoogleAnalyticsProvider({
  gaId,
}: GoogleAnalyticsProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const consent = useCookieConsent();
  const hasConsented = isMounted ? consent.hasConsented : false;

  // Only render GA when consented and mounted
  // Next.js third-party GoogleAnalytics uses next/script with strategy="afterInteractive" by default
  if (!hasConsented || !gaId || !isMounted) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}



