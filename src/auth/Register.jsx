import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser} from 'react-icons/fi';
import { Link } from "react-router-dom";
import WavyText from "../components/WavyText";
import GoogleButton from "../components/ui/GoogleButton";
import Input from "../components/ui/Input";

const Register = ({toggleAuthMode}) => {
  return (
    <div
      className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl backdrop-blur-md bg-[#1E293B]/90 border border-[#334155]/50 m-10"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Intro Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex flex-col items-start justify-center p-8 lg:p-10 w-full lg:w-1/2 bg-gradient-to-b from-[#3a8099] to-[#71b3b7]"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#E2E8F0] mb-4">
            <div className="flex gap-2">Welcome to <WavyText text="Cozy Kindness" /> !</div>
          </h2>
          <p className="text-[#CBD5E1] text-base lg:text-lg">
            Join our community dedicated to providing warm clothing to those in need during winter. 
            Your registration helps us coordinate donations and bring warmth to cold nights.
          </p>
          <div className="mt-6 text-[#F8FAFC]">
            <h3 className="font-bold mb-2">What you can donate:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm lg:text-base">
              <li>Winter coats and jackets</li>
              <li>Wool sweaters and scarves</li>
              <li>Thermal underwear</li>
              <li>Gloves and mittens</li>
              <li>Warm socks and boots</li>
            </ul>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="w-full lg:w-1/2 p-8 lg:p-10 bg-[#1E293B]/90 backdrop-blur-md"
        >
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#F1F5F9] mb-2">Join Cozy Kindness</h1>
            <p className="text-[#CBD5E1] text-sm lg:text-base">Register to donate or receive winter clothing</p>
          </div>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-[#94A3B8] z-50" />
                <Input type="text" placeholder="Your name" required/>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-[#94A3B8] z-50" />
                <Input type="email" placeholder="your@email.com" required
                  />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Your Photo URL</label>
              <div className="relative">
                <input type="text" placeholder="http://example.jpg" required
                  className="bg-[#334155] border border-[#475569] text-white text-sm rounded-lg focus:ring-[#64748B] focus:border-[#64748B] block w-full p-2.5 placeholder-[#94A3B8]/50" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-[#94A3B8] z-50" />
                <Input type="password" placeholder="••••••••" required/>
              </div>
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-gradient-to-r from-[#7DD3FC] to-[#38BDF8] text-[#082F49] font-semibold py-3 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#7DD3FC]/20"
            >
              Join Cozy Kindness
            </motion.button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-[#475569]"></div>
              <span className="px-3 text-[#94A3B8] text-sm">or</span>
              <div className="flex-1 h-px bg-[#475569]"></div>
            </div>

            {/* Google Button */}
            <GoogleButton/>

            {/* Sign In Link */}
            <p className="text-sm text-center text-[#CBD5E1] mt-4">
              Already part of our community?{' '}
              <button
              type="button"
              onClick={toggleAuthMode}
              className="text-[#7DD3FC] hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;