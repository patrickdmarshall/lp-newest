"use client";

import { useState, useEffect, useMemo } from "react";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DiscoverHero from "@/components/DiscoverHero";
import { supabase } from "@/lib/supabase";

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "artist")
          .not("slug", "is", null)
          .order("name");

        if (error) {
          console.error("Error loading artists:", error);
          return;
        }

        setArtists(data || []);
      } catch (error) {
        console.error("Error loading artists:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  const allGenres = Array.from(
    new Set(artists.flatMap((artist) => artist.genres || []))
  );

  // Filter artists based on search term and selected genre
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch =
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genres.some((genre) =>
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesGenre =
        selectedGenre === "all" || artist.genres.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [artists, searchTerm, selectedGenre]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy">
        <MainNav />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-orange" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <main className="flex-1">
        <div className="bg-navy pt-24">
          <DiscoverHero
            title="Discover Artists"
            subtitle="Explore the vibrant music scene and connect with talented artists from Columbus and beyond."
            searchPlaceholder="Search artists..."
            className="fixed-hero-bg"
          >
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Search Bar */}
              <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    type="text"
                    placeholder="Search artists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base bg-navy/50 border-navy-dark text-white placeholder-gray-400 rounded-full backdrop-blur-sm focus:border-orange focus:ring-orange/20 transition-all duration-300 w-full"
                  />
                </div>
              </div>

              {/* Genre Filter Dropdown */}
              <div className="max-w-xs mx-auto">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-full bg-orange text-white border-orange hover:bg-orange/90 rounded-full py-3 px-6 font-medium">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-light border-navy text-white">
                    <SelectItem
                      value="all"
                      className="hover:bg-navy focus:bg-navy"
                    >
                      All Genres
                    </SelectItem>
                    {allGenres.map((genre) => (
                      <SelectItem
                        key={genre}
                        value={genre}
                        className="hover:bg-navy focus:bg-navy"
                      >
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DiscoverHero>

              {/* Database Migration Notice */}
              <div className="bg-navy py-8">
                <div className="container px-4 md:px-6">
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-400 text-sm">⚠️</span>
                      </div>
                      <div>
                        <h3 className="text-orange-300 font-semibold text-lg">Database Migration in Progress</h3>
                        <p className="text-orange-200/80 text-sm">
                          We're currently migrating our database to improve performance. All artist profiles will be visible again soon. Thank you for your patience!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artists Grid */}
              <div className="bg-navy py-12">
                <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArtists.map((artist) => (
                  <Link key={artist.id} href={`/artists/${artist.slug}`}>
                    <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                      <CardContent className="p-0">
                        <div className="h-80 relative overflow-hidden rounded-t-lg bg-navy-dark">
                          <Image
                            src={
                              artist.profile_picture ||
                              "/images/placeholder-artist.jpg"
                            }
                            alt={artist.name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-orange transition-colors">
                            {artist.name}
                          </h3>
                          <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>{artist.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {(artist.genres || [])
                              .slice(0, 2)
                              .map((genre, index) => (
                                <Badge
                                  key={index}
                                  className="bg-orange/20 text-orange border-none text-xs"
                                >
                                  {genre}
                                </Badge>
                              ))}
                            {(artist.genres || []).length > 2 && (
                              <Badge className="bg-gray-600/20 text-gray-400 border-none text-xs">
                                +{(artist.genres || []).length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredArtists.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    No artists found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
