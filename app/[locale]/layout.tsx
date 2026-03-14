import type { Metadata } from "next";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/features/navigation/navbar";
import { Footer } from "@/components/features/navigation/footer";
import { ProductMenuProvider } from "@/components/features/navigation/menus/product-menu-context";
import { ServiceMenuProvider } from "@/components/features/navigation/menus/service-menu-context";
import { WebVitalsProvider } from "@/components/providers/web-vitals-provider";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-context";
import { CookieConsentBanner } from "@/components/ui/cookie-consent-banner";
import { GoogleAnalyticsProvider } from "@/components/providers/google-analytics-provider";
import { ToastProvider } from "@/components/ui/toast";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { IntroLoader } from "@/components/ui/intro-loader";
import { MotionProvider } from "@/components/providers/motion-provider";
import { getSanityServices, getSanityProducts } from "@/lib/sanity/queries";

// Inter font - similar to SF Pro, from Google Fonts
// Inter font optimized for performance
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  ...generateHomeMetadata(),
  icons: {
    icon: "/fav.svg",
    shortcut: "/fav.svg",
    apple: "/fav.svg",
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
        className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
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
                          <main className="flex-1">{children}</main>
                          <Footer />
                          <CookieConsentBanner />
                        </IntroLoader>
                      </ServiceMenuProvider>
                    </ProductMenuProvider>
                  </SmoothScrollProvider>
                </WebVitalsProvider>
                <GoogleAnalyticsProvider gaId={gaId} />
              </CookieConsentProvider>
            </ToastProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

