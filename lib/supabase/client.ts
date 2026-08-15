// File: E:\quintos_ai\lib\supabase\client.ts

import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Client Components (Browser environment).
 * Uses public environment variables safely.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy/fallback client in development/demo mode when env vars are not yet configured
    return createBrowserClient(
      supabaseUrl || "https://demo-placeholder.supabase.co",
      supabaseAnonKey || "demo-anon-key"
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
