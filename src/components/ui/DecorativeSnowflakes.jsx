import React from 'react'

const DecorativeSnowflakes = () => {
  return (
    <div>
        <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-white/80 blur-[1px] animate-float"></div>
        <div className="absolute top-1/3 right-20 w-4 h-4 rounded-full bg-white/60 blur-[1px] animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-5 h-5 rounded-full bg-white/70 blur-[1px] animate-float delay-2000"></div>
    </div>
  )
}

export default DecorativeSnowflakes