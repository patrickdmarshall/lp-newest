"use client"

interface NotableShowsProps {
  shows?: string[]
}

export default function NotableShows({ shows }: NotableShowsProps) {
  if (!shows || shows.length === 0) return null

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Notable Shows</h3>
      <ul className="space-y-2">
        {shows.map((show, index) => (
          <li key={index} className="text-slate-400 flex items-center">
            <span className="text-orange-400 mr-2">•</span>
            {show}
          </li>
        ))}
      </ul>
    </div>
  )
}
