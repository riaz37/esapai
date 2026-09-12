import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    const response = handleI18nRouting(request);

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
