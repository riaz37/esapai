"use client";

import { useEffect, useState } from "react";
import Clarity from "@microsoft/clarity";
import { useCookieConsent } from "./cookie-consent-context";
import type { ClarityProviderProps } from "@/types/provider";

/**
 * Microsoft Clarity Provider
 *
 * Initializes Clarity only after user consent and client-side mount.
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

    Clarity.init(projectId);
    Clarity.consent();
  }, [hasConsented, projectId, isMounted]);

  return null;
}
