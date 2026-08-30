// File: E:\quintos_ai\app\api\user\profile\route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { userService } from "@/lib/services/users/userService";
import { ProfileUpdateSchema } from "@/lib/validations/profile";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/user/profile
 * Returns profile and organization details for the authenticated user.
 */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Authentication required." },
        },
        { status: 401 }
      );
    }

    const dbUser = await userService.getUserById(user.id);
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    return NextResponse.json({
      success: true,
      profile: {
        id: user.id,
        authUserId: user.authUserId,
        email: user.email,
        name: dbUser?.name || authUser?.user_metadata?.full_name || user.name || "",
        organizationName:
          dbUser?.organization?.name ||
          authUser?.user_metadata?.organization_name ||
          user.organizationName ||
          "",
        roleTitle: authUser?.user_metadata?.role_title || "Lead AI & Quantum Systems Engineer",
        location: authUser?.user_metadata?.location || "Based in Mohali, Punjab, India",
        bio:
          authUser?.user_metadata?.bio ||
          "Focusing on foundational LLM reasoning bounds, variational quantum eigensolvers, and sovereign distributed model inference.",
        role: user.role,
        organizationSlug: user.organizationSlug,
        avatarUrl: dbUser?.avatarUrl || authUser?.user_metadata?.avatar_url || null,
      },
    });
  } catch (error) {
    console.error("[Get Profile Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to retrieve profile." },
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile
 * Updates application user profile and synchronizes Supabase Auth metadata.
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Authentication required." },
        },
        { status: 401 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: { code: "BAD_REQUEST", message: "Invalid JSON body." },
        },
        { status: 400 }
      );
    }

    const validation = ProfileUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validation.error.issues[0]?.message || "Invalid profile data.",
          },
        },
        { status: 422 }
      );
    }

    const data = validation.data;

    // 1. Update database records (User and Organization)
    const updatedUser = await userService.updateProfile(user.id, data);

    // 2. Synchronize Supabase Auth user metadata
    try {
      const supabase = await createClient();
      await supabase.auth.updateUser({
        data: {
          full_name: data.name,
          organization_name: data.organizationName,
          role_title: data.roleTitle,
          location: data.location,
          bio: data.bio,
        },
      });
    } catch (authSyncErr) {
      console.warn("[Profile Supabase Auth Metadata Sync Warning]:", authSyncErr);
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        organizationName: updatedUser.organization?.name,
      },
    });
  } catch (error) {
    console.error("[Update Profile Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to update profile." },
      },
      { status: 500 }
    );
  }
}
