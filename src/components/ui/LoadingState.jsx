import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

export const LoadingState = ({name}) => (
  <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      className="text-4xl text-yellow-500 mb-4"
    >
      <FaSpinner />
    </motion.div>
    <p className="text-center text-lg font-medium">Loading {name}...</p>
  </div>
);