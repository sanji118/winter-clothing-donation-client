import React from 'react'

const SectionHeading = ({text}) => {
  return (
    <div>
        <h1 className='text-2xl md:text-3xl lg:text-5xl mb-4 font-bold py-5 max-w-2xl'>{text}</h1>
    </div>
  )
}

export default SectionHeading