// File: E:\quintos_ai\lib\supabase\admin.ts

import { createClient } from "@supabase/supabase-js";

/**
 * Creates an administrative Supabase client using the SERVICE ROLE KEY.
 * WARNING: This client bypasses Row Level Security (RLS).
 * MUST ONLY BE CALLED IN SERVER-SIDE ENVIRONMENTS (Server Actions / Route Handlers).
 * NEVER expose to Client Components or browser bundles.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    // Return a dummy fallback in development/demo mode when service role key is not yet set
    return createClient(
      supabaseUrl || "https://demo-placeholder.supabase.co",
      serviceRoleKey || "demo-service-role-key",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
