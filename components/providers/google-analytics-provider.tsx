"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { useCookieConsent } from "./cookie-consent-context";
import type { GoogleAnalyticsProviderProps } from "@/types/provider";

/**
 * Google Analytics Provider
 *
 * Initializes Google Analytics only after user consent and client-side mount.
 *
 * NOTE: This intentionally does not use `<GoogleAnalytics>` from
 * `@next/third-parties/google` because that component hardcodes
 * `strategy="afterInteractive"` with no way to override it. The two
 * `<Script>` tags below are the same tags that component renders
 * internally (same dataLayer name, same gtag id/config), just loaded with
 * `strategy="lazyOnload"` so gtag.js doesn't contend with the main thread
 * during initial page load/interactivity (INP).
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
  if (!hasConsented || !gaId || !isMounted) {
    return null;
  }

  return (
    <>
      <Script
        id="_next-ga-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
          window['dataLayer'] = window['dataLayer'] || [];
          function gtag(){window['dataLayer'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');`,
        }}
      />
      <Script
        id="_next-ga"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  );
}



