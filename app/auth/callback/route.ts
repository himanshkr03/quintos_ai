// File: E:\quintos_ai\app\auth\callback\route.ts

import { createClient } from "@/lib/supabase/server";
import { userService } from "@/lib/services/users/userService";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Handles the OAuth and Email verification callback from Supabase Auth.
 * Exchanges authorization code for session tokens and auto-provisions user profile.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") || "/dashboard";

  // Validate internal redirect
  const safeNext =
    nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Auto-provision application User and default Organization in Prisma
      try {
        await userService.findOrCreateUser(
          data.user.id,
          data.user.email || "",
          data.user.user_metadata?.full_name || null,
          data.user.user_metadata?.organization_name || null
        );
      } catch (dbErr) {
        console.error("[Auth Callback User Provisioning Error]:", dbErr);
      }

      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  // Return to login with error if code exchange fails
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
