"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const locales = [
    { code: "en", flag: "/language/eng.png" },
    { code: "ar", flag: "/language/arabic.png" },
] as const;

export function LanguageSelector({ className, visible }: { className?: string, visible?: boolean }) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    // Find the target locale (the one we're NOT currently on)
    const targetLocale = locales.find((l) => l.code !== locale) || locales[0];

    const handleToggle = () => {
        router.replace(pathname, { locale: targetLocale.code });
    };

    return (
        <div className={cn("relative flex items-center", className)}>
            <button
                onClick={handleToggle}
                className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300",
                    "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20",
                    "text-white group overflow-hidden",
                    visible ? "h-9 w-9" : "h-11 w-11"
                )}
                aria-label={`Switch to ${targetLocale.code === "en" ? "English" : "Arabic"}`}
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
                        className="relative select-none leading-none w-6 h-6 md:w-7 md:h-7"
                    >
                        <Image
                            src={targetLocale.flag}
                            alt={targetLocale.code === "en" ? "English" : "Arabic"}
                            fill
                            className="object-contain"
                        />
                    </m.div>
                </AnimatePresence>
            </button>
        </div>
    );
}
