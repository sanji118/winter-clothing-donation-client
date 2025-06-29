import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import GoogleButton from "../components/ui/GoogleButton";
import Input from "../components/ui/Input";
import useAuth from "../utils/useAuth";

const RegisterForm = ({ toggleAuth }) => {
  const {user, signInWithGoogle, createUser, signOutUser} = useAuth();
  return(
    <>
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#F1F5F9] mb-2">Join Cozy Kindness</h1>
        <p className="text-[#CBD5E1] text-sm lg:text-base">Register to donate or receive winter clothing</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Full Name</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-[#94A3B8]" />
            <Input type="text" name="name" placeholder="Your name" required />
          </div>
        </div>

        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-[#94A3B8]" />
            <Input type="email" name="email" placeholder="your@email.com" required />
          </div>
        </div>

        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Your Photo URL</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="http://example.jpg" 
              required
              className="bg-[#334155] border border-[#475569] text-white text-sm rounded-lg focus:ring-[#64748B] focus:border-[#64748B] block w-full p-2.5 placeholder-[#94A3B8]/50" 
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#94A3B8]" />
            <Input type="password" placeholder="••••••••" required />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-[#7DD3FC] to-[#38BDF8] text-[#082F49] font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:shadow-[#7DD3FC]/20"
        >
          Join Cozy Kindness
        </motion.button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#475569]"></div>
          <span className="px-3 text-[#94A3B8] text-sm">or</span>
          <div className="flex-1 h-px bg-[#475569]"></div>
        </div>

        <GoogleButton />

        <p className="text-sm text-center text-[#CBD5E1] mt-4">
          Already part of our community?{' '}
          <button
            type="button"
            onClick={toggleAuth}
            className="text-[#7DD3FC] hover:underline font-medium"
          >
            Sign in here
          </button>
        </p>
      </form>
    </>
  )
}

export default RegisterForm;