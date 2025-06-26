import { motion } from "framer-motion";
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from "react-router-dom";
import WavyText from "../components/WavyText";
import GoogleButton from "../components/ui/GoogleButton";
import Input from "../components/ui/Input";

const Login = ({toggleAuthMode}) => {
  return (
    <div
        className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl backdrop-blur-md bg-[#1E293B]/90 border border-[#334155]/50 m-10"
      >
        <div className="flex flex-col md:flex-row-reverse">
          
          {/* Right Side - Intro Text */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex flex-col items-start justify-center p-8 lg:p-10 w-full lg:w-1/2 bg-gradient-to-b from-[#0F172A] to-[#1E293B]"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#E2E8F0] mb-4">
              <div className="flex gap-2">Welcome back to <WavyText text="Cozy Kindness" />!</div>
            </h2>
            <p className="text-[#CBD5E1] text-base lg:text-lg">
              Continue your journey of bringing warmth to those in need during winter. 
              Your login helps us coordinate donations and spread kindness.
            </p>
            <div className="mt-6 text-[#F8FAFC]">
              <h3 className="font-bold mb-2">Why your contribution matters:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm lg:text-base">
                <li>Helps keep people warm in freezing temperatures</li>
                <li>Supports our community outreach programs</li>
                <li>Connects donors with those in need</li>
                <li>Tracks your donation impact</li>
              </ul>
            </div>
          </motion.div>

          {/* Left Side - Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="w-full lg:w-1/2 p-8 lg:p-10 bg-[#1E293B]/90 backdrop-blur-md"
          >
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#F1F5F9] mb-2">Sign In</h1>
              <p className="text-[#CBD5E1] text-sm lg:text-base">Access your Cozy Kindness account</p>
            </div>

            <form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[#E2E8F0] mb-2 text-sm font-medium">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-[#94A3B8] z-50" />
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    required/>
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  to="/auth/forgot-password" 
                  className="text-sm text-[#7DD3FC] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-[#7DD3FC] to-[#38BDF8] text-[#082F49] font-semibold py-3 rounded-lg shadow-md transition-all hover:shadow-lg hover:shadow-[#7DD3FC]/20"
              >
                Sign In
              </motion.button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-[#475569]"></div>
                <span className="px-3 text-[#94A3B8] text-sm">or</span>
                <div className="flex-1 h-px bg-[#475569]"></div>
              </div>

              {/* Google Button */}
              <GoogleButton/>

              {/* Sign Up Link */}
              <p className="text-sm text-center text-[#CBD5E1] mt-4">
                Don't have an account?{' '}
                <button 
                type="button"
                onClick={toggleAuthMode}
                className="text-[#7DD3FC] hover:underline font-medium"
                >
                  Sign up here
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
  );
};

export default Login;