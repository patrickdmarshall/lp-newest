import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { venueId, title, type, event_date, event_time, genre, application_deadline, description } = body

    // Validate required fields
    if (!venueId || !title || !type || !event_date || !event_time || !genre || !application_deadline || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user's profile to check email
    const { data: profile } = await supabase.from("profiles").select("email").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Check if user is authorized to create opportunities for this venue
    const { data: venueAdmin } = await supabase
      .from("venue_admins")
      .select("*")
      .eq("venue_id", venueId)
      .eq("email", profile.email)
      .single()

    if (!venueAdmin) {
      return NextResponse.json({ error: "Not authorized to create opportunities for this venue" }, { status: 403 })
    }

    // Create the opportunity
    const opportunityData = {
      venue_id: venueId,
      title,
      type,
      event_date,
      event_time,
      genre,
      application_deadline,
      description,
      status: "open",
      created_at: new Date().toISOString(),
    }

    const { data: opportunity, error: insertError } = await supabase
      .from("opportunities")
      .insert(opportunityData)
      .select()
      .single()

    if (insertError) {
      console.error("Insert error:", insertError)
      return NextResponse.json({ error: "Failed to create opportunity" }, { status: 500 })
    }

    return NextResponse.json(opportunity)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Fetch all open opportunities with venue details
    const { data: opportunities, error } = await supabase
      .from("v_opportunities_public")
      .select("*")
      .eq("status", "open")
      .order("event_date", { ascending: true })

    if (error) {
      console.error("Fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 })
    }

    return NextResponse.json(opportunities || [])
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
