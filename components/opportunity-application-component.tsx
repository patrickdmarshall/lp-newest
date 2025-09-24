"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

type Props = {
  opportunityId: string
  onApplicationSubmitted?: () => void
}

export default function ApplyToOpportunity({ opportunityId, onApplicationSubmitted }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        router.push("/sign-in")
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/sign-in")
        return
      }

      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error || !data) {
        setError("Could not load profile.")
        return
      }

      if (data.role !== "artist") {
        setError("You do not have access to apply for opportunities.")
        return
      }

      setProfile(data)
      setLoading(false)
    }

    load()
  }, [supabase, router])

  const handleSubmit = async () => {
    setSubmitting(true)

    await supabase.auth.getSession()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      toast.error("Session expired. Please log in again.")
      router.push("/sign-in")
      return
    }

    const { error } = await supabase.from("opportunity_applications").insert([
      {
        artist_id: user.id,
        opportunity_id: opportunityId,
        status: "pending",
        applied_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(error)
      toast.error("Application failed.")
    } else {
      toast.success("Application submitted!")
      if (onApplicationSubmitted) onApplicationSubmitted()
    }

    setSubmitting(false)
  }

  if (loading) {
    return (
      <Card className="w-full max-w-xl bg-navy-light border-navy">
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-6 w-1/3 bg-navy" />
          <Skeleton className="h-4 w-2/3 bg-navy" />
          <Skeleton className="h-4 w-1/2 bg-navy" />
          <Skeleton className="h-10 w-full bg-navy" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-xl bg-navy-light border-navy">
        <CardContent className="p-6">
          <div className="text-red-400 font-semibold text-center">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-xl bg-navy-light border-navy">
      <CardContent className="space-y-6 p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Apply for This Opportunity</h3>
          <p className="text-gray-300 text-sm">Submit your application to perform at this venue</p>
        </div>

        <div className="bg-navy p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-orange font-semibold">Artist Profile</span>
            <span className="text-xs text-gray-400 bg-orange/20 px-2 py-1 rounded">Verified</span>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{profile.name}</p>
            <p className="text-gray-300 text-sm">
              {profile.city}, {profile.state}
            </p>
            {profile.bio && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{profile.bio}</p>}
          </div>
        </div>

        <div className="bg-navy/50 p-4 rounded-lg border border-navy-dark">
          <h4 className="text-white font-semibold mb-2">What happens next?</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Your application will be reviewed by the venue</li>
            <li>• You'll receive a notification about the status</li>
            <li>• If approved, you'll get booking details</li>
          </ul>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-orange hover:bg-orange/90 text-navy font-semibold py-3 text-lg"
        >
          {submitting ? "Submitting Application..." : "Submit Application"}
        </Button>
      </CardContent>
    </Card>
  )
}
