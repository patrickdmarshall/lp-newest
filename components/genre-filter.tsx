"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface GenreFilterProps {
  genres: string[]
  selectedGenres: string[]
  onGenreChange: (genre: string, isChecked: boolean) => void
}

export function GenreFilter({ genres, selectedGenres, onGenreChange }: GenreFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedGenres = isExpanded ? genres : genres.slice(0, 6)

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        {displayedGenres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenres.includes(genre) ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              selectedGenres.includes(genre)
                ? "bg-orange text-white hover:bg-orange/90"
                : "border-gray-600 text-gray-300 hover:bg-navy-light hover:text-white"
            }`}
            onClick={() => onGenreChange(genre, !selectedGenres.includes(genre))}
          >
            {genre}
          </Badge>
        ))}
      </div>
      
      {genres.length > 6 && (
        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
