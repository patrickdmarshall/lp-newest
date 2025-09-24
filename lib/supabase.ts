import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Named export for compatibility
export { createClient }

// Default export function for backward compatibility
export default function getSupabaseClient() {
  return supabase
}

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string
          role: "artist" | "venue" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email: string
          role: "artist" | "venue" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          role?: "artist" | "venue" | "admin"
          created_at?: string
          updated_at?: string
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          venue_id: string
          venue_name: string
          date: string
          compensation: string
          genre: string
          description: string
          requirements: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          venue_id: string
          venue_name: string
          date: string
          compensation: string
          genre: string
          description: string
          requirements: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          venue_id?: string
          venue_name?: string
          date?: string
          compensation?: string
          genre?: string
          description?: string
          requirements?: string
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          opportunity_id: string
          artist_id: string
          artist_name: string
          artist_email: string
          artist_phone: string | null
          experience: string
          status: "pending" | "approved" | "declined"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          opportunity_id: string
          artist_id: string
          artist_name: string
          artist_email: string
          artist_phone?: string | null
          experience: string
          status?: "pending" | "approved" | "declined"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          opportunity_id?: string
          artist_id?: string
          artist_name?: string
          artist_email?: string
          artist_phone?: string | null
          experience?: string
          status?: "pending" | "approved" | "declined"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
