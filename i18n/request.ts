import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getUITranslations } from "@/lib/sanity/queries";

function mergeMessages(
    base: Record<string, unknown>,
    override: Record<string, unknown>
): Record<string, unknown> {
    const merged = { ...base };

    for (const [key, value] of Object.entries(override)) {
        if (value === undefined || value === null) continue;
        const baseValue = merged[key];

        if (
            value &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            baseValue &&
            typeof baseValue === "object" &&
            !Array.isArray(baseValue)
        ) {
            merged[key] = mergeMessages(
                baseValue as Record<string, unknown>,
                value as Record<string, unknown>
            );
            continue;
        }

        merged[key] = value;
    }

    return merged;
}

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically loads the locales dict requested
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (
        !locale ||
        !routing.locales.includes(locale as (typeof routing.locales)[number])
    ) {
        locale = routing.defaultLocale;
    }

    const localMessages = (await import(`../messages/${locale}.json`)).default;
    const sanityMessages = await getUITranslations(locale).catch(() => null);
    const messages = sanityMessages
        ? mergeMessages(localMessages as Record<string, unknown>, sanityMessages)
        : localMessages;

    return {
        locale,
        messages,
    };
});
