import { motion, useAnimation } from "framer-motion";
import { FaBoxOpen, FaMapMarkerAlt, FaCalendarAlt, FaHandsHelping } from "react-icons/fa";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const CampaignDetailsSidebar = ({ campaignData }) => {
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

  const titleVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      transition: { duration: 0.5 }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: { repeat: Infinity, duration: 2 }
    },
    tilt: {
      rotate: 20,
      transition: { duration: 0.3 }
    },
    bounce: {
      scale: 1.2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-purple-100 p-6 rounded-xl shadow-md border border-purple-300"
    >
      <motion.h3
        variants={titleVariants}
        className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-600"
      >
        <motion.span
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <FaBoxOpen className="text-orange-400" />
        </motion.span>
        Campaign Details
      </motion.h3>

      <div className="space-y-4">
        {/* Status */}
        <motion.div
          variants={itemVariants}
          custom={0}
          className="flex items-start gap-3"
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="mt-1 text-cyan-500"
          >
            <FaCalendarAlt />
          </motion.div>
          <div>
            <p className="font-medium text-gray-500">Status</p>
            <p className="text-gray-800 capitalize">{campaignData.status}</p>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          variants={itemVariants}
          custom={1}
          className="flex items-start gap-3"
        >
          <motion.div
            variants={iconVariants}
            whileHover="bounce"
            className="mt-1 text-cyan-500"
          >
            <FaMapMarkerAlt />
          </motion.div>
          <div>
            <p className="font-medium text-gray-500">Location</p>
            <p className="text-gray-800">{campaignData.location.address}</p>
          </div>
        </motion.div>

        {/* Dates */}
        <motion.div
          variants={itemVariants}
          custom={2}
          className="flex items-start gap-3"
        >
          <motion.div
            variants={iconVariants}
            animate="pulse"
            className="mt-1 text-cyan-500"
          >
            <FaCalendarAlt />
          </motion.div>
          <div>
            <p className="font-medium text-gray-500">Dates</p>
            <p className="text-gray-800">
              {new Date(campaignData.startDate).toLocaleDateString()} - {new Date(campaignData.endDate).toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Items */}
        <motion.div
          variants={itemVariants}
          custom={3}
          className="flex items-start gap-3"
        >
          <motion.div
            variants={iconVariants}
            whileHover="tilt"
            className="mt-1 text-cyan-500"
          >
            <FaBoxOpen />
          </motion.div>
          <div>
            <p className="font-medium text-gray-500">Items</p>
            <p className="text-gray-800">
              Collected: <span className="font-bold text-orange-400">{campaignData.itemsCollected}</span> / Needed: <span className="font-bold text-cyan-600">{campaignData.itemsNeeded}</span>
            </p>
          </div>
        </motion.div>

        {/* Volunteers */}
        {campaignData.volunteersNeeded > 0 && (
          <motion.div
            variants={itemVariants}
            custom={4}
            className="flex items-start gap-3"
          >
            <motion.div
              variants={iconVariants}
              whileHover="bounce"
              className="mt-1 text-cyan-500"
            >
              <FaHandsHelping />
            </motion.div>
            <div>
              <p className="font-medium text-gray-500">Volunteers</p>
              <p className="text-gray-800">
                Needed: <span className="font-bold text-pink-400">{campaignData.volunteersNeeded}</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CampaignDetailsSidebar;