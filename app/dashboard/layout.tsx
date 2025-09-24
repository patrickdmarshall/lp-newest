import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-navy pt-20">
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </div>
  )
}
