"use client"

import { Card } from "@/components/ui/card"

const ShimmerEffect = () => (
  <div className="animate-pulse bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 bg-[length:200%_100%] animate-shimmer" />
)

export function HeroCardSkeleton() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-slate-700 animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-32 bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="text-center space-y-2">
            <div className="h-8 w-12 bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-16 bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <div className="h-8 w-12 bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-16 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export function MetricTileSkeleton() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
          <div className="h-8 w-16 bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="h-12 w-12 bg-slate-700 rounded-full animate-pulse" />
      </div>
    </Card>
  )
}

export function OpportunityCardSkeleton() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-slate-700 rounded animate-pulse" />
          <div className="h-6 w-20 bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="h-10 w-full bg-slate-700 rounded animate-pulse" />
      </div>
    </Card>
  )
}
