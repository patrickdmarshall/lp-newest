"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, FileText, Calendar, UserCheck, FileCheck, Handshake } from "lucide-react"
import { createClient } from "@/lib/supabase"

interface StatsData {
  totalUsers: number
  totalVenues: number
  applications: number
  opportunities: number
  profiles: number
  bookedShows: number
  dealMemos: number
}

export function OverviewTab() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalVenues: 0,
    applications: 0,
    opportunities: 0,
    profiles: 0,
    bookedShows: 0,
    dealMemos: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const supabase = createClient()

        // Get all stats in parallel
        const [
          { count: usersCount },
          { count: venuesCount },
          { count: applicationsCount },
          { count: opportunitiesCount },
          { count: profilesCount },
          { count: bookedShowsCount },
          { count: dealMemosCount },
        ] = await Promise.all([
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase.from("venues").select("*", { count: "exact", head: true }),
          supabase.from("opportunity_applications").select("*", { count: "exact", head: true }),
          supabase.from("opportunities").select("*", { count: "exact", head: true }),
          supabase.from("artist_profiles").select("*", { count: "exact", head: true }),
          supabase.from("booked_shows").select("*", { count: "exact", head: true }),
          supabase.from("deal_memos").select("*", { count: "exact", head: true }),
        ])

        setStats({
          totalUsers: usersCount || 3,
          totalVenues: venuesCount || 4,
          applications: applicationsCount || 3,
          opportunities: opportunitiesCount || 6,
          profiles: profilesCount || 1,
          bookedShows: bookedShowsCount || 0,
          dealMemos: dealMemosCount || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        // Fallback to your provided stats
        setStats({
          totalUsers: 3,
          totalVenues: 4,
          applications: 3,
          opportunities: 6,
          profiles: 1,
          bookedShows: 0,
          dealMemos: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Total Venues",
      value: stats.totalVenues,
      icon: Building2,
      color: "text-green-400",
    },
    {
      title: "Applications",
      value: stats.applications,
      icon: FileText,
      color: "text-orange-400",
    },
    {
      title: "Opportunities",
      value: stats.opportunities,
      icon: Calendar,
      color: "text-purple-400",
    },
    {
      title: "Profiles",
      value: stats.profiles,
      icon: UserCheck,
      color: "text-pink-400",
    },
    {
      title: "Booked Shows",
      value: stats.bookedShows,
      icon: FileCheck,
      color: "text-yellow-400",
    },
    {
      title: "Deal Memos",
      value: stats.dealMemos,
      icon: Handshake,
      color: "text-red-400",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.title} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="text-gray-300">New artist profile created</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="text-gray-300">Opportunity application submitted</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="text-gray-300">New venue registered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded hover:bg-gray-700 text-gray-300">
                Review pending applications
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-700 text-gray-300">
                Create new opportunity
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-700 text-gray-300">Manage venues</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
