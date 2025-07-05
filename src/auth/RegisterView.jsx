import { motion } from "framer-motion";
import WavyText from "../components/ui/WavyText";
import RegisterForm from "./RegisterForm";

const RegisterView = ({ toggleAuth }) => (
  <motion.div 
  className="flex flex-col md:flex-row"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
  >
    {/* Left Panel - Content */}
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ 
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.5
      }}
      className="flex flex-col items-start justify-center p-4 md:p-8 lg:p-10 w-full lg:w-1/2 bg-gradient-to-b from-[#3a8099] to-[#71b3b7]"
    >
      <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#E2E8F0] mb-4">
        <WavyText text="Welcome to Cozy Kindness !" />
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

    {/* Right Panel - Form */}
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ 
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.5,
        delay: 0.05
      }}
      className="w-full lg:w-1/2 p-8 lg:p-10 bg-[#1E293B]/90 backdrop-blur-md"
    >
      <RegisterForm toggleAuth={toggleAuth} />
    </motion.div>
  </motion.div>
);

export default RegisterView;