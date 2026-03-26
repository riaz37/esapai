import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getArcjetInstance } from "@/lib/arcjet/config";
import { validateContactForm, sanitizeContactFormInput } from "@/lib/validation/contact-form";


export async function POST(request: NextRequest) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "Service temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }

  // Initialize Arcjet
  const aj = getArcjetInstance();

  try {
    // Step 1: Parse and validate request body first (needed for email validation)
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request format." },
        { status: 400 },
      );
    }

    // Check request size (limit to 10KB)
    const bodySize = JSON.stringify(body).length;
    if (bodySize > 10 * 1024) {
      return NextResponse.json(
        { success: false, message: "Request too large." },
        { status: 413 },
      );
    }

    // Step 2: Validate with Zod schema
    const validationResult = validateContactForm(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: validationResult.error },
        { status: 400 },
      );
    }

    // Step 3: Bot protection, rate limiting, and email validation (handled by Arcjet rules)
    // Pass email for email validation rule
    const decision = await aj.protect(request, {
      email: validationResult.data.email,
      requested: 1, // Deduct 1 token from the bucket per request
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const retryAfter = decision.results?.[0]?.ttl || 10;
        return NextResponse.json(
          { 
            success: false, 
            message: "Too many requests. Please try again later.",
          },
          { 
            status: 429,
            headers: {
              "Retry-After": retryAfter.toString(),
            },
          },
        );
      } else if (decision.reason.isBot()) {
        return NextResponse.json(
          { success: false, message: "Request blocked. Please try again." },
          { status: 403 },
        );
      } else {
        // Email validation failure or other denial
        return NextResponse.json(
          { success: false, message: "Invalid email address or request blocked." },
          { status: 400 },
        );
      }
    }

    // Step 6: Sanitize inputs
    const sanitized = sanitizeContactFormInput(validationResult.data);

    // Step 7: Return validated data and access key for client-side submission
    // Web3Forms free plan requires client-side submission
    return NextResponse.json({
      success: true,
      data: {
        name: sanitized.name,
        email: sanitized.email,
        message: sanitized.message,
        access_key: accessKey,
      },
    });
  } catch (error) {
    // Log error but don't expose internal details
    if (process.env.NODE_ENV === "development") {
      console.error("Contact form error:", error);
      if (error instanceof Error) {
        console.error("Error stack:", error.stack);
        console.error("Error message:", error.message);
      }
    }
    
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again later." },
      { status: 500 },
    );
  }
}


