import type { Metadata } from "next"
import Hero from "@/components/Hero"
import About from "@/components/About"
import NotableShows from "@/components/NotableShows"

async function getArtistBySlug(slug: string) {
  // Mock artist data for now - replace with actual Supabase query
  const mockArtists: Record<string, any> = {
    "trek-manifest": {
      name: "Trek Manifest",
      bio: "Columbus-based indie rock band known for their energetic live performances.",
      notableShows: ["Newport Music Hall", "The Basement", "AR Music Bar"],
    },
  }

  return mockArtists[slug] || null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = await getArtistBySlug(params.slug)
  return {
    title: artist ? `${artist.name} - Artist Profile` : "Artist Not Found",
    description: artist ? artist.bio : "No artist found with this slug.",
  }
}

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await getArtistBySlug(params.slug)

  if (!artist) {
    return <div>Artist Not Found</div>
  }

  return (
    <div className="container mx-auto px-4">
      <Hero artist={artist} />
      <About bio={artist.bio} />
      <NotableShows shows={artist.notableShows} />
      {/* rest of code here */}
    </div>
  )
}
