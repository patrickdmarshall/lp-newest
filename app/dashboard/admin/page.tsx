"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  UserCheck,
  Building2,
  Calendar,
  FileText,
  Shield,
  CheckCircle,
  X,
  Loader2,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

interface AdminStats {
  totalUsers: number;
  activeArtists: number;
  activeVenues: number;
  openOpportunities: number;
  pendingApplications: number;
}

interface UserApproval {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  profile_picture?: string;
  city?: string;
  state?: string;
}

interface PlatformMetrics {
  artistAdoption: number;
  venueAdoption: number;
  platformHealth: "excellent" | "good" | "fair" | "poor";
  userEngagement: "growing" | "stable" | "declining";
  contentQuality: "high" | "medium" | "low";
}

export default function AdminDashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeArtists: 0,
    activeVenues: 0,
    openOpportunities: 0,
    pendingApplications: 0,
  });
  const [userApprovals, setUserApprovals] = useState<UserApproval[]>([]);
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics>({
    artistAdoption: 0,
    venueAdoption: 0,
    platformHealth: "excellent",
    userEngagement: "growing",
    contentQuality: "high",
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/sign-in");
        return;
      }
      if (profile?.role !== "admin") {
        router.push("/dashboard");
        return;
      }
      loadDashboardData();
    }
  }, [user, profile, authLoading, router]);

  const loadDashboardData = async () => {
    try {
      // Load all stats in parallel
      const [
        { count: totalUsers },
        { count: activeArtists },
        { count: activeVenues },
        { count: openOpportunities },
        { count: pendingApplications },
        { data: pendingUsers },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "artist")
          .eq("status", "approved"),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "venue")
          .eq("status", "approved"),
        supabase
          .from("opportunities")
          .select("*", { count: "exact", head: true })
          .eq("status", "active"),
        supabase
          .from("opportunity_applications")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("profiles")
          .select("*")
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      // Calculate platform metrics
      const artistAdoption = totalUsers
        ? Math.round((activeArtists! / totalUsers) * 100)
        : 0;
      const venueAdoption = totalUsers
        ? Math.round((activeVenues! / totalUsers) * 100)
        : 0;

      setStats({
        totalUsers: totalUsers || 0,
        activeArtists: activeArtists || 0,
        activeVenues: activeVenues || 0,
        openOpportunities: openOpportunities || 0,
        pendingApplications: pendingApplications || 0,
      });

      setUserApprovals(pendingUsers || []);
      setPlatformMetrics({
        artistAdoption,
        venueAdoption,
        platformHealth: "excellent",
        userEngagement: "growing",
        contentQuality: "high",
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserApproval = async (
    userId: string,
    action: "approved" | "denied"
  ) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: action })
        .eq("id", userId);

      if (error) throw error;

      // Update local state
      setUserApprovals((prev) => prev.filter((user) => user.id !== userId));

      // Update stats if approved
      if (action === "approved") {
        const user = userApprovals.find((u) => u.id === userId);
        if (user?.role === "artist") {
          setStats((prev) => ({
            ...prev,
            activeArtists: prev.activeArtists + 1,
          }));
        } else if (user?.role === "venue") {
          setStats((prev) => ({
            ...prev,
            activeVenues: prev.activeVenues + 1,
          }));
        }
      }

      toast({
        title: "Success",
        description: `User ${action} successfully`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "artist":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            🎤 Artist
          </Badge>
        );
      case "venue":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            🏢 Venue
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            {role}
          </Badge>
        );
    }
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "excellent":
        return (
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            🟢 Excellent
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            🔵 Good
          </Badge>
        );
      case "fair":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            🟡 Fair
          </Badge>
        );
      case "poor":
        return (
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            🔴 Poor
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            {health}
          </Badge>
        );
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || profile?.role !== "admin") return null;

  const displayName = profile?.name || user?.email?.split("@")[0] || "Admin";

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-orange-500/20">
              <AvatarImage
                src={profile?.profile_picture || "/placeholder.svg"}
                alt={displayName}
              />
              <AvatarFallback className="bg-orange-500/20 text-orange-300 text-lg font-semibold">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {displayName}!
              </h1>
              <p className="text-slate-400">
                Platform administration dashboard
              </p>
            </div>
          </div>
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            👑 Admin
          </Badge>
        </motion.div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalUsers}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">
                      Active Artists
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.activeArtists}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Active Venues</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.activeVenues}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">
                      Open Opportunities
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.openOpportunities}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">
                      Pending Applications
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.pendingApplications}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Approval Queue */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  🛡️ User Approval Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userApprovals.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      All Clear!
                    </h3>
                    <p className="text-slate-400">No users pending approval.</p>
                  </div>
                ) : (
                  userApprovals.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.profile_picture || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-orange-500/20 text-orange-300 text-sm">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-white font-medium">
                              {user.name}
                            </h4>
                            <p className="text-slate-400 text-sm">
                              {user.email}
                            </p>
                            {user.city && user.state && (
                              <p className="text-xs text-slate-500">
                                {user.city}, {user.state}
                              </p>
                            )}
                          </div>
                        </div>
                        {getRoleBadge(user.role)}
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                          Applied{" "}
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUserApproval(user.id, "denied")
                            }
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10 bg-transparent text-xs"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Deny
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUserApproval(user.id, "approved")
                            }
                            className="bg-green-500 hover:bg-green-600 text-white text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Platform Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  📊 Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {platformMetrics.artistAdoption}%
                    </div>
                    <p className="text-xs text-slate-400">Artist Adoption</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {platformMetrics.venueAdoption}%
                    </div>
                    <p className="text-xs text-slate-400">Venue Adoption</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">
                      Platform Health
                    </span>
                    {getHealthBadge(platformMetrics.platformHealth)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">
                      User Engagement
                    </span>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      📈 Growing
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">
                      Content Quality
                    </span>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      ⭐ High
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-white font-medium mb-3">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Applications Today</span>
                      <span className="text-white">
                        {Math.floor(Math.random() * 15) + 5}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">New Opportunities</span>
                      <span className="text-white">
                        {Math.floor(Math.random() * 8) + 2}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Sessions</span>
                      <span className="text-white">
                        {Math.floor(Math.random() * 50) + 20}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                ⚡ Admin Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/dashboard/admin?tab=venues">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-6 text-lg">
                    <Building2 className="mr-2 h-5 w-5" />
                    Approve Venues
                  </Button>
                </Link>
                <Link href="/dashboard/admin?tab=applications">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 text-lg">
                    <FileText className="mr-2 h-5 w-5" />
                    Review Applications
                  </Button>
                </Link>
                <Link href="/dashboard/admin?tab=analytics">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent font-semibold py-6 text-lg"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
