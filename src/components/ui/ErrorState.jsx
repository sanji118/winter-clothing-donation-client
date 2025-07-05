export const ErrorState = ({name}) => (
  <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
    <div className="text-4xl text-red-500 mb-4">⚠️</div>
    <p className="text-center text-red-500 font-medium">Failed to load {name}.</p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);