"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type {
  CookieConsentStatus,
  CookieConsentContextType,
} from "@/types/provider";

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

const COOKIE_CONSENT_KEY = "esapai-cookie-consent";
const COOKIE_CONSENT_EXPIRY_DAYS = 365;

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(
    "pending"
  );
  const hasConsented = consentStatus === "accepted";

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) return;

    try {
      const consent = JSON.parse(storedConsent);
      const expiryDate = new Date(consent.expiry);
      if (expiryDate > new Date()) {
        setConsentStatus(consent.status);
      } else {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
      }
    } catch {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
  }, []);

  const acceptCookies = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);
    
    const consent = {
      status: "accepted" as const,
      expiry: expiryDate.toISOString(),
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setConsentStatus("accepted");
  };

  const rejectCookies = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);
    
    const consent = {
      status: "rejected" as const,
      expiry: expiryDate.toISOString(),
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setConsentStatus("rejected");
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consentStatus,
        acceptCookies,
        rejectCookies,
        hasConsented,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}

