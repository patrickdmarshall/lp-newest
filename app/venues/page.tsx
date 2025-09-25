"use client";

import React, { useState, useEffect } from "react";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-white text-3xl font-bold mb-8">Discover Venues</h1>
        <p className="text-gray-300">Coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}
