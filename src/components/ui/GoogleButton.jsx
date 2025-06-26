import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  return (
    <button 
      type="button"
      className="
        w-full 
        bg-[#334155] hover:bg-[#3E4A61] 
        text-[#E2E8F0] 
        font-medium 
        rounded-lg 
        py-2.5 px-4 
        flex items-center justify-center 
        transition-all duration-200 
        border border-[#475569] hover:border-[#64748B]
        text-sm sm:text-base
        md:py-3 md:px-5
      "
    >
      <FcGoogle className="mr-2 text-lg md:text-xl" />
      <span className="whitespace-nowrap">Sign up with Google</span>
    </button>
  );
};

export default GoogleButton;