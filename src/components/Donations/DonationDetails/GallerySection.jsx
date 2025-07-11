import { motion, useAnimation } from "framer-motion";
import SectionHeading from "../../ui/SectionHeading";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const GallerySection = ({ galleryData }) => {
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

  if (!galleryData?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      zIndex: 10,
      transition: { duration: 0.3 }
    }
  };

  const captionVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
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
      <SectionHeading text="Gallery" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {galleryData.map((item, index) => (
          <motion.div
            key={item.image}
            variants={itemVariants}
            whileHover="hover"
            className="group rounded-lg overflow-hidden shadow-md relative"
          >
            <img
              src={item.image}
              alt={item.caption}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-end p-4 hover:bg-[#0000006b]"
            >
              <motion.p
                variants={captionVariants}
                className="text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                {item.caption}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GallerySection;