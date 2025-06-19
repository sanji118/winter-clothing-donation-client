import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import DecorativeSnowflakes from "../components/ui/DecorativeSnowflakes";
import SnowfallAnimation from "../components/ui/SnowfallAnimation";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden flex items-center justify-center p-4">
      
      <SnowfallAnimation darkMode={true} />

      {/* ===== Main Card ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 100 }
        }}
        className="relative bg-[#1E293B]/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#334155]/50"
      >
        {/* ===== Header ===== */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { delay: 0.2, type: "spring" }
            }}
          >
            <h1 className="text-4xl font-bold text-[#7DD3FC] mb-2 underdog">
              Cozy Kindness
            </h1>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.4 }
              }}
              className="text-[#94A3B8]"
            >
              Welcome back! Please sign in
            </motion.p>
          </motion.div>
        </div>

        {/* ===== Email Field ===== */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: { delay: 0.5 }
          }}
          className="mb-4"
        >
          <label className="block text-[#94A3B8] mb-2 text-sm font-medium">Email</label>
          <motion.div
            animate={{
              borderColor: isFocused.email ? "#7DD3FC" : "#334155",
              transition: { duration: 0.3 }
            }}
            className="relative border rounded-lg overflow-hidden"
          >
            <input
              type="email"
              className="w-full bg-[#1E293B] px-4 py-3 pl-10 focus:outline-none text-[#E2E8F0] placeholder-[#64748B]"
              placeholder="your@email.com"
              onFocus={() => setIsFocused({...isFocused, email: true})}
              onBlur={() => setIsFocused({...isFocused, email: false})}
            />
            <motion.div
              animate={{
                color: isFocused.email ? "#7DD3FC" : "#64748B",
                scale: isFocused.email ? 1.1 : 1
              }}
            >
              <FiMail className="absolute left-3 top-3.5 h-5 w-5 z-50" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ===== Password Field ===== */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: { delay: 0.6 }
          }}
          className="mb-1"
        >
          <label className="block text-[#94A3B8] mb-2 text-sm font-medium">Password</label>
          <motion.div
            animate={{
              borderColor: isFocused.password ? "#7DD3FC" : "#334155",
              transition: { duration: 0.3 }
            }}
            className="relative border rounded-lg overflow-hidden"
          >
            <input
              type="password"
              className="w-full bg-[#1E293B] px-4 py-3 pl-10 focus:outline-none text-[#E2E8F0] placeholder-[#64748B]"
              placeholder="••••••••"
              onFocus={() => setIsFocused({...isFocused, password: true})}
              onBlur={() => setIsFocused({...isFocused, password: false})}
            />
            <motion.div
              animate={{
                color: isFocused.password ? "#7DD3FC" : "#64748B",
                scale: isFocused.password ? 1.1 : 1
              }}
            >
              <FiLock className="absolute left-3 top-3.5 h-5 w-5 z-50" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ===== Forgot Password Link ===== */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.7 }
          }}
          className="text-right mb-6"
        >
          <motion.a 
            whileHover={{ x: 2 }}
            href="#"
            className="text-sm text-[#7DD3FC] hover:underline flex items-center justify-end gap-1"
          >
            Forgot password?
          </motion.a>
        </motion.div>

        {/* ===== Sign In Button ===== */}
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
          Sign In
        </motion.button>

        {/* ===== Divider ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.9 }
          }}
          className="flex items-center mb-6"
        >
          <motion.div 
            className="flex-1 h-px bg-[#334155]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          />
          <span className="px-4 text-[#64748B] text-sm">or continue with</span>
          <motion.div 
            className="flex-1 h-px bg-[#334155]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
          />
        </motion.div>

        {/* ===== Google Sign-In Button ===== */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1,
            y: 0,
            transition: { delay: 1 }
          }}
          whileHover={{ 
            y: -2,
            boxShadow: "0 4px 12px rgba(125, 211, 252, 0.2)"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#1E293B] border border-[#334155] rounded-lg py-3 px-4 flex items-center justify-center gap-3 shadow-sm text-[#E2E8F0]"
        >
          <FcGoogle className="h-5 w-5" />
          <span className="font-medium">Sign in with Google</span>
        </motion.button>

        {/* ===== Sign Up Link ===== */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 1.1 }
          }}
          className="mt-6 text-center text-[#94A3B8] text-sm"
        >
          Don't have an account?{' '}
          <Link 
            to="/auth/register"
            className="text-[#7DD3FC] hover:underline"
          >
            Sign up
          </Link>
        </motion.div>
      </motion.div>

      <DecorativeSnowflakes darkMode={true} />
    </div>
  );
};

export default Login;