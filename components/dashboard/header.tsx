"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { LayoutDashboard, User, Settings, LogOut, LifeBuoy } from "lucide-react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { user, profile, signOut } = useAuth()
  const router = useRouter()

  const getDisplayName = () => {
    // First try profile name
    if (profile?.name) {
      return profile.name
    }
    // Then try user metadata
    if (user?.user_metadata?.name) {
      return user.user_metadata.name
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    // Finally try email prefix
    if (user?.email) {
      return user.email.split("@")[0]
    }
    return "User"
  }

  const getInitials = (name: string) => {
    if (!name || name === "User") return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      console.log("Dashboard header signing out...")
      await signOut()
      console.log("Dashboard header sign out successful")

      // Clear any cached data
      if (typeof window !== "undefined") {
        localStorage.clear()
        sessionStorage.clear()
      }

      // Force redirect to home page
      window.location.replace("/")
    } catch (error) {
      console.error("Dashboard header sign out error:", error)
      // Force redirect even if there's an error
      window.location.replace("/")
    }
  }

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const dashboardUrl = profile?.role === "admin" ? "/dashboard/admin" : profile?.role === "venue" ? "/dashboard/venue" : "/dashboard"
    router.push(dashboardUrl)
  }

  // Determine dashboard URL based on role
  const dashboardUrl = profile?.role === "admin" ? "/dashboard/admin" : profile?.role === "venue" ? "/dashboard/venue" : "/dashboard"
  const displayName = getDisplayName()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* You can add a search bar or breadcrumbs here if needed */}
      <div className="relative ml-auto flex-1 md:grow-0">{/* Search input can go here */}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="overflow-hidden rounded-full px-4 py-2 border-2 border-orange-500 hover:border-orange-400 bg-transparent text-white hover:bg-orange-500/10"
          >
            <span className="font-medium">{displayName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              {profile?.role && (
                <p className="text-xs leading-none text-muted-foreground capitalize pt-1">Role: {profile.role}</p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDashboardClick} className="cursor-pointer">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${dashboardUrl}/profile`} className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${dashboardUrl}/settings`} className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/contact" className="flex items-center gap-2 cursor-pointer">
              <LifeBuoy className="h-4 w-4" />
              <span>Support</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-2 cursor-pointer text-red-600 hover:!text-red-600 focus:!text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
