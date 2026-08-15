// File: E:\quintos_ai\app\api\contact\route.ts

import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/validations/inquiry";
import { inquiryService } from "@/lib/services/inquiries/inquiryService";
import { emailService } from "@/lib/services/email/emailService";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { getCurrentUser } from "@/lib/auth/session";

/**
 * POST /api/contact
 * Handles public and authenticated technical and research inquiries.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting & Abuse Throttling
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message:
              "Submission rate limit exceeded. Please wait a few minutes before submitting another inquiry.",
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 2. Parse & Validate Payload
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MALFORMED_REQUEST",
            message: "Invalid JSON request payload.",
          },
        },
        { status: 400 }
      );
    }

    // 3. Honeypot Check (Spam Bot Protection)
    if (body && typeof body === "object" && "website" in body) {
      const honeypot = (body as Record<string, unknown>).website;
      if (typeof honeypot === "string" && honeypot.trim().length > 0) {
        // Silently discard spam bot submission
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "Submission rejected.",
            },
          },
          { status: 400 }
        );
      }
    }

    // 4. Server-Side Zod Validation
    const validationResult = ContactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Inquiry data validation failed.",
            details: formattedErrors,
          },
        },
        { status: 422 }
      );
    }

    const validatedData = validationResult.data;

    // 5. User Context Resolution (Attach authenticated user if session exists)
    let authenticatedUserId: string | undefined;
    try {
      const user = await getCurrentUser();
      if (user) {
        authenticatedUserId = user.id;
      }
    } catch {
      // Allow anonymous inquiries to proceed without failure
      authenticatedUserId = undefined;
    }

    // 6. Database Persistence
    let createdInquiry;
    try {
      createdInquiry = await inquiryService.createInquiry(
        validatedData,
        authenticatedUserId
      );
    } catch (dbError) {
      console.error("[Database Error - Inquiry Persistence]:", dbError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INTERNAL_ERROR",
            message:
              "Unable to persist inquiry at this time. Please send an email directly to contact.quintosresearch@gmail.com.",
          },
        },
        { status: 500 }
      );
    }

    // 7. Asynchronous Email Dispatch (Internal Notification & User Confirmation)
    // IMPORTANT: Email delivery failures MUST NOT delete the persisted database record.
    try {
      await Promise.allSettled([
        emailService.sendInquiryNotification(
          createdInquiry.id,
          validatedData,
          createdInquiry.createdAt
        ),
        emailService.sendInquiryConfirmation(
          createdInquiry.id,
          validatedData
        ),
      ]);
    } catch (emailErr) {
      // Safe error log; persistence remains intact
      console.error("[Email Notification Warning]:", emailErr);
    }

    // 8. Safe Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully.",
        inquiryId: createdInquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API Contact Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message:
            "An unexpected server error occurred. Please try again later or contact us directly via email.",
        },
      },
      { status: 500 }
    );
  }
}
