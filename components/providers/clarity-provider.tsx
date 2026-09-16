"use client";

import { useEffect, useState } from "react";
import Clarity from "@microsoft/clarity";
import { useCookieConsent } from "./cookie-consent-context";
import type { ClarityProviderProps } from "@/types/provider";

/**
 * Microsoft Clarity Provider
 *
 * Initializes Clarity only after user consent and client-side mount.
 *
 * Clarity.init() injects and runs its own script eagerly the moment it's
 * called, which can contend with the main thread during initial page
 * interactivity (INP). To defer that work off the critical path (similar to
 * `strategy="lazyOnload"` for next/script), the init call is scheduled with
 * `requestIdleCallback` (falling back to a macrotask via `setTimeout` where
 * `requestIdleCallback` isn't available, e.g. Safari), so it runs once the
 * browser is idle instead of synchronously inside the effect.
 */
export function ClarityProvider({ projectId }: ClarityProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const consent = useCookieConsent();
  const hasConsented = isMounted ? consent.hasConsented : false;

  useEffect(() => {
    if (!hasConsented || !projectId || !isMounted) {
      return;
    }

    const initClarity = () => {
      Clarity.init(projectId);
      Clarity.consent();
    };

    const scheduleIdle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 1);
    const cancelIdle =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback
        : window.clearTimeout;

    const handle = scheduleIdle(initClarity);

    return () => {
      cancelIdle(handle);
    };
  }, [hasConsented, projectId, isMounted]);

  return null;
}
