"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Languages, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const locales = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
] as const;

export function LanguageSelector({ className, visible }: { className?: string, visible?: boolean }) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLocale = locales.find((l) => l.code === locale) || locales[0];

    const handleLocaleChange = (newLocale: "en" | "ar") => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
                    "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20",
                    "text-sm font-medium text-white/70 hover:text-white group",
                    isOpen && "bg-white/10 border-white/20 text-white"
                )}
                aria-label="Select language"
            >
                <Languages className="size-4 text-[#13F584]" />
                <span className="hidden sm:inline-block">{currentLocale.label}</span>
                <span className="sm:hidden">{currentLocale.code.toUpperCase()}</span>
                <ChevronDown className={cn("size-3 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "absolute top-full mt-2 end-0 z-50 min-w-[140px]",
                            "bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-1",
                            "shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                        )}
                    >
                        {locales.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => handleLocaleChange(l.code)}
                                className={cn(
                                    "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                                    locale === l.code
                                        ? "bg-[#13F584]/10 text-[#13F584]"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-base leading-none">{l.flag}</span>
                                    <span className="font-medium">{l.label}</span>
                                </div>
                                {locale === l.code && <Check className="size-3.5" />}
                            </button>
                        ))}
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
