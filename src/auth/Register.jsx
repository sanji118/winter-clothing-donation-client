import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiImage } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";
import SnowfallAnimation from "../components/ui/SnowfallAnimation";
import WavyText from "../components/WavyText";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <SnowfallAnimation darkMode={true} />
      {/* Registration Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-400 mb-2">Create Account</h1>
          <div className="flex  gap-2  justify-center text-gray-400">Join our <span className="underdog text-cyan-400"><WavyText text={'Cozy Kindness'}/></span> community today</div>
        </div>

        {/* Registration Form */}
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5 outline-none transition-all"
                placeholder="Your name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5 outline-none transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Profile Photo URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiImage className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="url"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5 outline-none transition-all"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <motion.button
          initial={{ scale: 0.95 }}
          animate={{ 
            scale: 1,
            transition: { delay: 0.8 }
          }}
          whileHover={{ 
            scale: 1.02,
            background: "linear-gradient(to right, #0EA5E9, #7DD3FC)"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#7DD3FC] text-[#0F172A] font-medium py-3 rounded-lg shadow-lg mb-6"
        >
          Register
        </motion.button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            className="w-full text-gray-300 bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center transition-all"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-sm text-gray-400 text-center mt-4">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-cyan-400 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;