export const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
    <div className="text-4xl text-red-500 mb-4">⚠️</div>
    <p className="text-center text-red-500 font-medium">Failed to load campaigns.</p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);