"use client"
import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogOut, LayoutDashboard, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { usePathname, useRouter } from "next/navigation"

export function MainNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Navigation items that should always work regardless of auth status
  const navItems = [
    { href: "/artists", label: "Artists" },
    { href: "/venues", label: "Venues" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/backstage", label: "Backstage" },
    { href: "/contact", label: "Contact" },
  ]

  const getDashboardUrl = () => {
    if (!profile) return "/dashboard"

    if (profile.role === "admin" || profile.role === "venue") {
      return "/admin-dashboard"
    }
    return "/dashboard"
  }

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

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await signOut()

      // Clear any cached data
      if (typeof window !== "undefined") {
        localStorage.clear()
        sessionStorage.clear()
      }

      // Force redirect to home page
      window.location.href = "/"
    } catch (error) {
      // Force redirect even if there's an error
      window.location.href = "/"
    }
  }

  // Handle navigation clicks to ensure they go to the right place
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    router.push(href)
  }

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const dashboardUrl = getDashboardUrl()
    setMobileMenuOpen(false)
    window.location.href = dashboardUrl
  }

  // Check if we're on a dashboard page
  const isDashboardPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin-dashboard")

  const displayName = getDisplayName()

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isDashboardPage
          ? "bg-navy/95 backdrop-blur-xl py-3 shadow-2xl border-b border-navy-light/20"
          : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between px-4">
        <button
          onClick={(e) => handleNavClick("/", e)}
          className="flex items-center space-x-2 z-10 hover:opacity-80 transition-opacity"
        >
          <div className="relative h-10 w-20 md:h-12 md:w-24">
            <Image src="/logo.png" alt="Level Play" fill className="object-contain" priority />
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <button
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                      "hover:bg-orange/10 hover:text-orange focus:text-orange focus:outline-none",
                      pathname === item.href ? "text-orange bg-orange/10" : "text-white hover:scale-105",
                    )}
                  >
                    {item.label}
                  </button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-orange/10 hover:text-orange rounded-full"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-navy/95 backdrop-blur-xl border-navy-light w-full sm:w-80">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-navy-light/20">
                  <Image src="/logo.png" alt="Level Play" width={100} height={60} className="object-contain" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:bg-orange/10 hover:text-orange rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 py-6 flex-1">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className={cn(
                        "text-left text-lg font-medium py-3 px-4 rounded-xl transition-all duration-200",
                        pathname === item.href
                          ? "text-orange bg-orange/10"
                          : "text-white hover:bg-orange/10 hover:text-orange hover:translate-x-2",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* User Section */}
                <div className="pt-6 border-t border-navy-light/20">
                  {user && profile ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-navy-light/50 rounded-xl">
                        <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-orange" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{displayName}</p>
                          <p className="text-xs text-gray-400 capitalize">{profile.role}</p>
                        </div>
                      </div>
                      <Button
                        onClick={handleDashboardClick}
                        className="w-full bg-orange/10 text-orange hover:bg-orange hover:text-navy rounded-xl py-3"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl py-3 bg-transparent"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={(e) => handleNavClick("/sign-in", e)}
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl py-3"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={(e) => handleNavClick("/sign-up", e)}
                        className="w-full bg-gradient-to-r from-orange to-orange-light text-navy font-medium rounded-xl py-3"
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {user && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-orange/10 text-white rounded-full px-4 py-2"
                >
                  <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-orange" />
                  </div>
                  <span className="font-medium">{displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-navy-light/95 backdrop-blur-xl border-navy text-white rounded-xl"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                  {profile?.role && <p className="text-xs text-gray-400 capitalize pt-1">Role: {profile.role}</p>}
                </div>
                <DropdownMenuSeparator className="bg-navy" />
                <DropdownMenuItem
                  onClick={handleDashboardClick}
                  className="hover:bg-navy cursor-pointer rounded-lg mx-1"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick("/account", e)
                  }}
                  className="hover:bg-navy cursor-pointer rounded-lg mx-1"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-navy" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="hover:bg-red-500/10 text-red-400 cursor-pointer rounded-lg mx-1"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                onClick={(e) => handleNavClick("/sign-in", e)}
                variant="ghost"
                className="text-white hover:bg-orange/10 hover:text-orange rounded-full px-6 py-2"
              >
                Sign In
              </Button>
              <Button
                onClick={(e) => handleNavClick("/sign-up", e)}
                className="bg-gradient-to-r from-orange to-orange-light text-navy font-medium rounded-full px-6 py-2 hover:scale-105 transition-transform"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
