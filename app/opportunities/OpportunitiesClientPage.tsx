"use client";

import React, { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { useAuth } from "@/contexts/auth-context";
import { SignInWall } from "@/components/sign-in-wall";

export default function OpportunitiesClientPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4"></div>
          <p className="text-white">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <SignInWall />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-white text-3xl font-bold mb-8">
          Performance Opportunities
        </h1>
        <p className="text-gray-300">Coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}
