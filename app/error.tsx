"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Something went wrong!</h1>
          <p className="text-gray-300 max-w-md mx-auto">An unexpected error occurred. Please try again.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-orange-500 hover:bg-orange-600">
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-navy bg-transparent"
          >
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
