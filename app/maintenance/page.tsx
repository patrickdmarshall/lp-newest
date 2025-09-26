export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange mb-4">Level Play</h1>
          <div className="w-16 h-1 bg-orange mx-auto"></div>
        </div>
        
        <h2 className="text-2xl font-semibold text-white mb-4">
          We're Currently Under Maintenance
        </h2>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          We're working hard to improve your experience. Please check back soon!
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange"></div>
          <span className="text-sm">Maintenance in progress...</span>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Expected to be back online shortly</p>
        </div>
      </div>
    </div>
  );
}
