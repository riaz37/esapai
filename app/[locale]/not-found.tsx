import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const nav = useTranslations("Navigation");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[min(800px,200vw)] h-[min(800px,200vw)] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>


      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
        {/* Error Code */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-bold leading-none text-gradient-primary opacity-20">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-gradient-primary">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto px-2 sm:px-4">
            {t("description")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <Button
            variant="primary"
            size="lg"
            className="rounded-[32px] sm:rounded-[40px] px-10 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-w-[140px] sm:min-w-[180px] min-h-[44px] sm:min-h-[48px]"
            asChild
          >
            <Link href="/">{t("goHome")}</Link>
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="rounded-[32px] sm:rounded-[40px] px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-w-[140px] sm:min-w-[180px] min-h-[44px] sm:min-h-[48px]"
            asChild
          >
            <Link href="/contact">{t("contactUs")}</Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="product-card p-4 sm:p-5 md:p-6 lg:p-8 max-w-md w-full">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gradient-radial-white">
            {t("quickLinks")}
          </h3>
          <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              {nav("home")}
            </Link>
            <Link
              href="/about"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              {nav("about")}
            </Link>
            <Link
              href="/case-study"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              {nav("case-study")}
            </Link>
            <Link
              href="/contact"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              {nav("contact")}
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
