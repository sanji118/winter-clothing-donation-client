import { motion, useAnimation } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ContactInfo = ({ contactInfo }) => {
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

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
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

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    },
    float: {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-white p-6 rounded-xl shadow-md border border-pink-100"
    >
      <motion.h3
        variants={titleVariants}
        className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-600"
      >
        <motion.span
          variants={iconVariants}
          animate="float"
        >
          <FaEnvelope className="text-orange-400" />
        </motion.span>
        Contact
      </motion.h3>

      <motion.div
        variants={contentVariants}
        className="flex items-center gap-3"
      >
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="text-cyan-500"
        >
          <FaEnvelope />
        </motion.div>
        <div>
          <p className="font-medium text-gray-500">Email</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={`mailto:${contactInfo}`}
            className="text-cyan-600 hover:underline"
          >
            {contactInfo}
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;