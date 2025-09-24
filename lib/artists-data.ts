export interface Artist {
  id: string
  name: string
  slug: string
  bio: string
  location: string
  genres: string[]
  image: string
  notable_shows?: string[]
  spotify_url?: string
  instagram_url?: string
  youtube_url?: string
}

// Mock data for artists
const artists: Artist[] = [
  {
    id: "1",
    name: "Trek Manifest",
    slug: "trek-manifest",
    bio: "An indie rock band from Columbus, Ohio, known for their energetic live performances and catchy melodies.",
    location: "Columbus, OH",
    genres: ["Indie Rock", "Alternative"],
    image: "/images/trek-manifest.jpg",
    notable_shows: ["Newport Music Hall", "The Basement", "AR Music Bar"],
    spotify_url: "https://open.spotify.com/artist/example",
    instagram_url: "https://instagram.com/trekmanifest",
  },
  {
    id: "2",
    name: "Dom DeShawn",
    slug: "dom-deshawn",
    bio: "A soulful R&B artist bringing smooth vocals and contemporary sounds to the Columbus music scene.",
    location: "Columbus, OH",
    genres: ["R&B", "Soul", "Pop"],
    image: "/images/dom-deshawn-updated.jpg",
    notable_shows: ["Kemba Live", "The Basement"],
    spotify_url: "https://open.spotify.com/artist/example",
    instagram_url: "https://instagram.com/domdeshawn",
  },
  {
    id: "3",
    name: "Cherimondis J",
    slug: "cherimondis-j",
    bio: "A dynamic hip-hop artist with powerful lyrics and engaging stage presence.",
    location: "Columbus, OH",
    genres: ["Hip-Hop", "Rap"],
    image: "/images/cherimondis-j.jpg",
    notable_shows: ["AR Music Bar", "The Basement"],
    spotify_url: "https://open.spotify.com/artist/example",
    instagram_url: "https://instagram.com/cherimondisj",
  },
  {
    id: "4",
    name: "Adam Paddock",
    slug: "adam-paddock",
    bio: "A folk singer-songwriter with heartfelt lyrics and acoustic melodies.",
    location: "Columbus, OH",
    genres: ["Folk", "Acoustic", "Singer-Songwriter"],
    image: "/images/adam-paddock-new.jpeg",
    notable_shows: ["The Basement", "AR Music Bar"],
    spotify_url: "https://open.spotify.com/artist/example",
    instagram_url: "https://instagram.com/adampaddock",
  },
  {
    id: "5",
    name: "Vitruvian Soul",
    slug: "vitruvian-soul",
    bio: "Progressive rock band known for complex compositions and philosophical themes.",
    location: "Columbus, OH",
    genres: ["Progressive Rock", "Alternative"],
    image: "/images/vitruvian-soul.jpg",
    notable_shows: ["Newport Music Hall", "Kemba Live"],
    spotify_url: "https://open.spotify.com/artist/example",
    instagram_url: "https://instagram.com/vitruviansoul",
  },
]

export function getArtists(): Artist[] {
  return artists
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug)
}

export function getAllGenres(): string[] {
  const allGenres = artists.flatMap((artist) => artist.genres)
  return Array.from(new Set(allGenres)).sort()
}

export function getArtistsByGenre(genre: string): Artist[] {
  return artists.filter((artist) => artist.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase())))
}

export function searchArtists(query: string): Artist[] {
  const lowercaseQuery = query.toLowerCase()
  return artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(lowercaseQuery) ||
      artist.bio.toLowerCase().includes(lowercaseQuery) ||
      artist.genres.some((genre) => genre.toLowerCase().includes(lowercaseQuery)),
  )
}
