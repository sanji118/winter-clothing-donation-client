import { motion, useAnimation } from "framer-motion";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const DonationProgress = ({ campaign, progress, raised, goal, onDonateNow }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, rotateX: -90 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 10,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const progressVariants = {
    hidden: { rotateY: 180 },
    visible: {
      rotateY: 0,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 60
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const disabledButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.4
      }
    }
  };

  const pulseVariants = {
    visible: {
      scale: [1, 1.1, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const isActive = campaign.status === 'Active';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="my-5 p-6 rounded-xl bg-amber-100 shadow-md flex flex-col md:flex-row justify-between items-center gap-6 border border-amber-200"
    >
      <div className="flex items-center gap-4">
        <motion.div
          variants={progressVariants}
          className="relative"
        >
          <div 
            className="radial-progress text-cyan-500" 
            style={{ "--value": progress, "--size": "6rem", "--thickness": "8px" }} 
            role="progressbar"
          >
            <motion.div
              variants={pulseVariants}
              className="absolute inset-0 flex items-center justify-center -left-16"
            >
              <FaHeart className="text-orange-400 text-xl" />
            </motion.div>
            {Math.floor(progress)}%
          </div>
        </motion.div>
        <motion.div
          variants={textVariants}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <motion.div
              variants={pulseVariants}
              className="w-3 h-3 rounded-full bg-green-300"
            />
            <p className="font-medium text-gray-800">
              Raised: <span className="text-green-600 font-bold">${raised.toLocaleString()}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              variants={pulseVariants}
              className="w-3 h-3 rounded-full bg-green-500"
            />
            <p className="font-medium text-gray-800">
              Goal: <span className="text-gray-600 font-bold">${goal.toLocaleString()}</span>
            </p>
          </div>
        </motion.div>
      </div>
      
      <motion.button
        variants={isActive ? buttonVariants : disabledButtonVariants}
        whileHover={isActive ? "hover" : {}}
        whileTap={isActive ? "tap" : {}}
        onClick={isActive ? onDonateNow : null}
        disabled={!isActive}
        className={`px-6 py-3 rounded-lg font-bold shadow-md transition-all duration-300 flex items-center gap-2 ${
          isActive 
            ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white hover:shadow-lg cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}  
      >
        {isActive ? (
          <div>
            Donate Now 
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <FaArrowRight />
            </motion.span>
          </div>
        ) : (
          <div>{campaign.status}</div>
        )}
      </motion.button>
    </motion.div>
  );
};

export default DonationProgress;