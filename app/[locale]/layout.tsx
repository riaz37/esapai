import type { Metadata } from "next";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/features/navigation/navbar";
import { Footer } from "@/components/features/navigation/footer";
import { ProductMenuProvider } from "@/components/features/navigation/menus/product-menu-context";
import { ServiceMenuProvider } from "@/components/features/navigation/menus/service-menu-context";
import { WebVitalsProvider } from "@/components/providers/web-vitals-provider";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-context";
import { CookieConsentBanner } from "@/components/ui/cookie-consent-banner";
import { GoogleAnalyticsProvider } from "@/components/providers/google-analytics-provider";
import { ClarityProvider } from "@/components/providers/clarity-provider";
import { ToastProvider } from "@/components/ui/toast";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { IntroLoader } from "@/components/ui/intro-loader";
import { MotionProvider } from "@/components/providers/motion-provider";
import { getSanityServices, getSanityProducts } from "@/lib/sanity/queries";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// Inter — body font for all locales
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Space Grotesk — display/heading font for English
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading-en",
  display: "swap",
  preload: false,
  fallback: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
});

// IBM Plex Sans Arabic — display/heading font for Arabic
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-heading-ar",
  display: "swap",
  preload: false,
  fallback: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  ...generateHomeMetadata(),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  // Enable static rendering
  setRequestLocale(locale);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  // Fetch services and products for the navbar
  const [services, products] = await Promise.all([
    getSanityServices(locale).catch(() => []),
    getSanityProducts(locale).catch(() => []),
  ]);

  // Generate structured data for Organization and Website
  const structuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
  ];

  // Fetch messages for the client provider
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${inter.className} ${inter.variable} ${locale === "ar" ? ibmPlexArabic.variable : spaceGrotesk.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SkipToContent />
          <StructuredDataComponent data={structuredData} />
          <MotionProvider>
            <ToastProvider>
              <CookieConsentProvider>
                <WebVitalsProvider>
                  <SmoothScrollProvider>
                    <ProductMenuProvider>
                      <ServiceMenuProvider>
                        <IntroLoader>
                          <Navbar services={services} products={products} />
                          <main id="main-content" className="flex-1">{children}</main>
                          <Footer />
                          <CookieConsentBanner />
                          <ScrollProgress />
                          <ScrollToTop />
                        </IntroLoader>
                      </ServiceMenuProvider>
                    </ProductMenuProvider>
                  </SmoothScrollProvider>
                </WebVitalsProvider>
                <GoogleAnalyticsProvider gaId={gaId} />
                <ClarityProvider projectId={clarityProjectId} />
              </CookieConsentProvider>
            </ToastProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

