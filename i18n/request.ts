import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getUITranslations } from "@/lib/sanity/queries";

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically loads the locales dict requested
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    // Fetch UI translations from Sanity CMS, fall back to local JSON
    let messages = await getUITranslations(locale).catch(() => null);
    if (!messages) {
        messages = (await import(`../messages/${locale}.json`)).default;
    }

    return {
        locale,
        messages,
    };
});
