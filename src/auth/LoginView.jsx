import { motion } from "framer-motion";
import WavyText from "../components/ui/WavyText";
import LoginForm from "./LoginForm";

const LoginView = ({ toggleAuth }) => (
  <motion.div 
  className="flex flex-col md:flex-row-reverse"
  initial={{opacity: 0 }}
  animate={{opacity: 1 }}
  exit={{opacity: 0 }}
  transition={{ duration: 0.3}}
  >
    {/* Right Panel - Content */}
    <motion.div
      initial={{x: '100%' }}
      animate={{x: 0}}
      exit={{x: '-100%'}}
      transition={{ type: 'spring', stiffness: 150, damping: 20, duration: 0.5}}
      className="flex flex-col items-start justify-center p-8 lg:p-10 w-full lg:w-1/2 bg-gradient-to-b from-[#3a8099] to-[#71b3b7]"
    >
      <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#E2E8F0] mb-4">
        <WavyText text="Welcome back to Cozy Kindness !" />
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

    {/* Left Panel - Form */}
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ 
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.5,
        delay: 0.05}}
      className="w-full lg:w-1/2 p-8 lg:p-10 bg-[#1E293B]/90 backdrop-blur-md"
    >
      <LoginForm toggleAuth={toggleAuth} />
    </motion.div>
  </motion.div>
);

export default LoginView;