// File: E:\quintos_ai\lib\auth\session.ts

import { createClient } from "@/lib/supabase/server";
import { userService } from "@/lib/services/users/userService";
import { organizationService } from "@/lib/services/organizations/organizationService";

export interface AuthenticatedUser {
  id: string;
  authUserId: string;
  email: string;
  name: string | null;
  organizationId: string | null;
  organizationName?: string | null;
  organizationSlug?: string | null;
  role: "OWNER" | "ADMIN" | "MEMBER" | "RESEARCHER";
  isDemoUser?: boolean;
}

/**
 * Resolves the currently authenticated user from Supabase Auth session
 * and retrieves or provisions their associated application profile in Prisma PostgreSQL.
 *
 * In demonstration mode (unconfigured Supabase keys), returns null (indicating unauthenticated/demo state).
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      return null;
    }

    // Lookup or auto-provision application-level user in Prisma database
    const dbUser = await userService.findOrCreateUser(
      authUser.id,
      authUser.email || "",
      authUser.user_metadata?.full_name || null,
      authUser.user_metadata?.organization_name || null
    );

    return {
      id: dbUser.id,
      authUserId: dbUser.authUserId,
      email: dbUser.email,
      name: dbUser.name,
      organizationId: dbUser.organizationId,
      organizationName: dbUser.organization?.name || null,
      organizationSlug: dbUser.organization?.slug || null,
      role: dbUser.role as "OWNER" | "ADMIN" | "MEMBER" | "RESEARCHER",
    };
  } catch (err) {
    console.error("[Session Resolution Warning]:", err);
    return null;
  }
}

/**
 * Server-side authorization helper that enforces an authenticated user session.
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Active session required.");
  }
  return user;
}

/**
 * Server-side authorization helper that enforces active organization membership.
 */
export async function requireOrganization(): Promise<{
  user: AuthenticatedUser;
  organizationId: string;
}> {
  const user = await requireAuth();
  if (!user.organizationId) {
    throw new Error("Forbidden: User does not belong to an active organization.");
  }
  return {
    user,
    organizationId: user.organizationId,
  };
}

/**
 * Server-side authorization helper that enforces specific organization roles.
 */
export async function requireRole(
  allowedRoles: ("OWNER" | "ADMIN" | "MEMBER" | "RESEARCHER")[]
): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error(
      `Forbidden: Required role [${allowedRoles.join(", ")}]. Current role: [${user.role}].`
    );
  }
  return user;
}
