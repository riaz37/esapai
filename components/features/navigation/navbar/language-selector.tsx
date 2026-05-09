"use client";
import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { m, AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const locales = [
    { code: "en", flag: "/flags/united-states.svg" },
    { code: "ar", flag: "/flags/saudi-arabia.svg" },
] as const;

export function LanguageSelector({ className }: { className?: string, visible?: boolean }) {
    const locale = useLocale();
    const pathname = usePathname();

    // Find the target locale (the one we're NOT currently on)
    const targetLocale = locales.find((l) => l.code !== locale) || locales[0];

    return (
        <div className={cn("relative flex items-center", className)}>
            <Link
                href={pathname}
                locale={targetLocale.code}
                className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300",
                    "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20",
                    "text-white group overflow-hidden",
                    "h-11 w-11"
                )}
                aria-label={targetLocale.code === "en" ? "Switch to English" : "Switch to Arabic"}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <m.div
                        key={targetLocale.code}
                        initial={{ y: 20, opacity: 0, rotate: -10 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 10 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.3
                        }}
                        className="relative flex items-center justify-center w-7 h-7"
                    >
                        <Image
                            src={targetLocale.flag}
                            alt={targetLocale.code === "en" ? "English" : "Arabic"}
                            width={28}
                            height={28}
                            className="object-contain"
                            priority
                        />
                    </m.div>
                </AnimatePresence>
            </Link>
        </div>
    );
}
