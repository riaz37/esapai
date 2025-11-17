import Link from "next/link";
import Image from "next/image";

const socialIcons = [
  { name: "facebook", href: "#" },
  { name: "instagram", href: "#" },
  { name: "telegram", href: "#" },
  { name: "whatsapp", href: "#" },
  { name: "youtube", href: "#" },
];

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="w-full mt-auto border-top-white-opacity-20 footer-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Logo and Description */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo/esaplogo.svg"
                  alt="ESAP Logo"
                  width={100}
                  height={32}
                  className="h-auto"
                />
              </Link>
              <p className="text-light-gray-90 text-sm md:text-base max-w-xs">
                Smartly Built for What&apos;s Next. Where Innovation Meets
                Productivity.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="text-primary font-semibold text-base md:text-lg mb-4">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-light-gray-90 hover:text-primary transition-colors text-sm md:text-base w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-primary font-semibold text-base md:text-lg mb-4">
                Connect With Us
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                {socialIcons.map((icon) => (
                  <a
                    key={icon.name}
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 flex items-center justify-center rounded-full bg-white-opacity-10 hover:bg-primary transition-all duration-300 border-white-opacity-25"
                    aria-label={icon.name}
                  >
                    <Image
                      src={`/footer/${icon.name}.svg`}
                      alt={icon.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 transition-transform group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white-opacity-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-light-gray-90 text-xs md:text-sm text-center md:text-left">
                © {new Date().getFullYear()} ESAP. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-xs md:text-sm">
                <Link
                  href="#"
                  className="text-light-gray-90 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-white-opacity-20">|</span>
                <Link
                  href="#"
                  className="text-light-gray-90 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
