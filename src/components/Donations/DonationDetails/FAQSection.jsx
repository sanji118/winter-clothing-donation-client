import { motion, useAnimation } from "framer-motion";
import SectionHeading from "../../ui/SectionHeading";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const FAQSection = ({ faqData }) => {
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

  if (!faqData?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      }
    },
    hover: {
      scale: 1.01,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const answerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="mt-8"
    >
      <SectionHeading text="Frequently Asked Questions" />
      <div className="space-y-4 mt-6">
        {faqData.map((faq, index) => (
          <motion.div
            key={faq.question}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            className="collapse collapse-plus bg-white shadow-sm rounded-lg overflow-hidden border border-gray-300"
          >
            <input type="radio" name="faq-accordion" />
            <motion.div className="collapse-title text-lg font-medium text-gray-800 bg-gray-200">
              {faq.question}
            </motion.div>
            <div className="collapse-content bg-gray-50">
              <motion.p
                variants={answerVariants}
                className="text-gray-700"
              >
                {faq.answer}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQSection;