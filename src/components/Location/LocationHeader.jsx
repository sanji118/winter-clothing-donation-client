import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';

export const LocationHeader = () => (
  <div className="text-center mb-16">
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center justify-center mb-4"
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-emerald-100 rounded-full opacity-60 blur-md"></div>
        <h2 className="text-4xl md:text-5xl font-bold relative bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent px-2">
          <FaLeaf className="inline-block mr-3 -mt-1" />
          Campaigns by Region
          <FaLeaf className="inline-block ml-3 -mt-1" />
        </h2>
      </div>
    </motion.div>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      Discover our impactful initiatives across different communities
    </p>
  </div>
);