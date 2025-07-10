import { motion } from 'framer-motion';

const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 py-10">
        {/* Volunteers Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-cyan-800 text-3xl sm:text-4xl">15k+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Incredible Volunteers</div>
        </motion.div>

        {/* Campaigns Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-yellow-500 text-3xl sm:text-4xl">1k+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Successful Campaigns</div>
        </motion.div>

        {/* Donors Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-cyan-800 text-3xl sm:text-4xl">400+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Monthly Donors</div>
        </motion.div>

        {/* Team Support Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-yellow-500 text-3xl sm:text-4xl">35k+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Team Support</div>
        </motion.div>
      </div>
  )
}

export default Stats