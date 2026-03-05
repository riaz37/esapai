"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const locales = [
    { code: "en", flag: "🇺🇸" },
    { code: "ar", flag: "🇸🇦" },
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
                    <m.span
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
                        className="select-none leading-none text-xl md:text-2xl"
                    >
                        {targetLocale.flag}
                    </m.span>
                </AnimatePresence>
            </button>
        </div>
    );
}
