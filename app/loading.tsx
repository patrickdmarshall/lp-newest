export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  )
}
