export const DecorativeBgLocation = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50 to-transparent opacity-30"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-emerald-100 opacity-20 blur-3xl"></div>
    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-2xl"></div>
  </div>
);