import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseBrowserKey = supabasePublishableKey || supabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseBrowserKey);

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl!, supabaseBrowserKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return browserClient;
}
