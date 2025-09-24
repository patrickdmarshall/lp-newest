"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function VenueDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main dashboard to avoid Supabase client creation during build
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <Card className="bg-navy-light border-navy max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-orange/20 rounded-full w-fit">
            <AlertCircle className="h-8 w-8 text-orange" />
          </div>
          <CardTitle className="text-white">Redirecting...</CardTitle>
          <CardDescription className="text-gray-400">Taking you to the main dashboard</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => router.push("/dashboard")} className="bg-orange hover:bg-orange/90 text-navy">
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
