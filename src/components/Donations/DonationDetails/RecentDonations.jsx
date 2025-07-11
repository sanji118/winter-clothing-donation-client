import { motion, useAnimation } from "framer-motion";
import { FaDonate, FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const RecentDonations = ({ donationData }) => {
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
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-green-100 p-6 rounded-xl shadow-md border border-green-300"
    >
      <motion.h3
        variants={titleVariants}
        className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-600"
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaDonate className="text-orange-400" />
        </motion.span>
        Recent Donations
      </motion.h3>

      {donationData.length > 0 ? (
        <ul className="space-y-3 divide-y divide-yellow-100">
          {donationData.slice(0, 5).map((donation, index) => (
            <motion.li
              key={donation.transactionId}
              variants={itemVariants}
              custom={index}
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center"
                >
                  <FaHeart className="text-pink-400 text-xs" />
                </motion.div>
                <span className="font-medium text-gray-800">
                  {donation.userId === 'anonymous' ? 'Anonymous' : donation.userId.split('@')[0]}
                </span>
              </div>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="font-bold text-cyan-600"
              >
                ${donation.amount}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <motion.div
          variants={emptyStateVariants}
          className="text-center py-6"
        >
          <p className="text-gray-500 mb-3">No donations yet</p>
          <p className="text-sm text-gray-400">Be the first to support this cause!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecentDonations;