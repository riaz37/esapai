import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
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
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto px-2 sm:px-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
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
            <Link href="/">Go Home</Link>
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="rounded-[32px] sm:rounded-[40px] px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-w-[140px] sm:min-w-[180px] min-h-[44px] sm:min-h-[48px]"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="product-card p-4 sm:p-5 md:p-6 lg:p-8 max-w-md w-full">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gradient-radial-white">
            Quick Links
          </h3>
          <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[40px] flex items-center justify-center"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[40px] flex items-center justify-center"
            >
              About
            </Link>
            <Link
              href="/case-study"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[40px] flex items-center justify-center"
            >
              Case Study
            </Link>
            <Link
              href="/contact"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[40px] flex items-center justify-center"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}

