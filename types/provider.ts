/**
 * Provider-related type definitions
 */

export type CookieConsentStatus = "pending" | "accepted" | "rejected";

export interface CookieConsentContextType {
  consentStatus: CookieConsentStatus;
  acceptCookies: () => void;
  rejectCookies: () => void;
  hasConsented: boolean;
}

export interface GoogleAnalyticsProviderProps {
  gaId?: string;
}

export interface ProductMenuContextType {
  isProductOpen: boolean;
  setIsProductOpen: (open: boolean) => void;
}

export interface ServiceMenuContextType {
  isServiceOpen: boolean;
  setIsServiceOpen: (open: boolean) => void;
}
