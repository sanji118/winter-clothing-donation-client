import { AnimatePresence } from "framer-motion";
import { useState } from 'react';
import LoginView from "./LoginView";
import RegisterView from "./RegisterView";
import SnowfallAnimation from "../components/ui/SnowfallAnimation";

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsLogin(!isLogin);
    setTimeout(() => setIsAnimating(false), 600); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] px-4 overflow-hidden">

      <SnowfallAnimation darkMode={true}/>
      <div className="w-full md:max-w-7xl rounded-2xl overflow-hidden shadow-xl backdrop-blur-md bg-[#1E293B]/90 border border-[#334155]/50 m-3 md:m-10 relative">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <LoginView key="login" toggleAuth={handleToggle} />
          ) : (
            <RegisterView key="register" toggleAuth={handleToggle} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthCard;