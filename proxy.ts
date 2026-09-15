import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// The apex domain must NOT carry its own Vercel-level redirect to the www
// domain (that's a separate hop before this code ever runs). It's kept as a
// plain domain on the project so requests reach this middleware, which
// collapses the apex->www swap and the locale-prefix redirect into one 308.
const APEX_HOST = "esap.ai";
const CANONICAL_HOST = "www.esap.ai";

export default function proxy(request: NextRequest) {
    const host = request.headers.get("host");
    const response = handleI18nRouting(request);

    if (host === APEX_HOST) {
        const target = request.nextUrl.clone();
        target.host = CANONICAL_HOST;

        if (response.status === 307 || response.status === 308) {
            const location = response.headers.get("location");
            if (location) {
                const localized = new URL(location);
                target.pathname = localized.pathname;
                target.search = localized.search;
            }
        }

        return NextResponse.redirect(target, 308);
    }

    // next-intl issues a 307 when it adds/normalizes the locale prefix (e.g. "/"
    // -> "/en", "/contact" -> "/en/contact"). These destinations are permanent,
    // so upgrade to a 308 to preserve crawl equity and avoid a second crawl of the hop.
    if (response.status === 307) {
        const location = response.headers.get("location");
        if (location) {
            return NextResponse.redirect(location, 308);
        }
    }

    return response;
}

export const config = {
    // Match every pathname except API routes, Next internals, and files with an
    // extension — including locale-less paths (e.g. "/contact", "/product/erp")
    // so they get redirected to their localized equivalent instead of 404ing.
    matcher: ["/((?!api|_next|.*\\..*).*)"]
};
