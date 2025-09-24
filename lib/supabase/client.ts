import { createClient } from "@supabase/supabase-js"
import type { Database } from "../supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables:", {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey,
  })
  throw new Error("Missing Supabase environment variables. Please check your .env.local file.")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Named export for compatibility
export { createClient }

// Default export function for backward compatibility
export default function getSupabaseClient() {
  return supabase
}
