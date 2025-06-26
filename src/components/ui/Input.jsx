import React from 'react'

const Input = ({
    type,
    placeholder,
    ...props
}) => {
  return (
    <div className='relative'>
        <input 
        type={type || 'text'}
        className='pl-10 bg-[#334155] border border-[#475569] text-white text-sm rounded-lg focus:ring-[#64748B] focus:border-[#64748B] block w-full p-2.5 placeholder-[#94A3B8]/50'
        placeholder={placeholder}
        {...props}
        />
    </div>
  )
}

export default Input