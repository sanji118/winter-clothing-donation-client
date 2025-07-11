import { easeInOut, motion } from 'framer-motion';
import { FaHandHoldingHeart, FaPeopleCarry, FaTruck, FaHandsHelping } from 'react-icons/fa';

const missionData = [
  {
    icon: <FaHandHoldingHeart size={36} className="text-rose-600" />,
    title: "Warmth with Compassion",
    description: "Our mission is to collect and distribute winter clothing to those who need it most, spreading warmth and love across Bangladesh.",
  },
  {
    icon: <FaPeopleCarry size={36} className="text-sky-600" />,
    title: "Connecting Volunteers",
    description: "We bridge the gap between donors and volunteers, ensuring donated clothes reach every corner of the country efficiently.",
  },
  {
    icon: <FaTruck size={36} className="text-emerald-600" />,
    title: "Efficient Delivery",
    description: "We ensure that every item donated is tracked and delivered timely to families and individuals in need during the winter season.",
  },
  {
    icon: <FaHandsHelping size={36} className="text-indigo-600" />,
    title: "Trusted Giving",
    description: "Our platform builds trust through transparency, allowing you to see where your donations go and how they make a difference.",
  },
];

const MissionSection = () => {
  return (
    <section className="bg-blue-50 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          We aim to bring warmth and dignity to every underprivileged person facing the bitter cold. Through connection, compassion, and community—we deliver hope.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionData.map((mission, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'tween', ease:easeInOut, duration: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <motion.div 
              className="mb-4 inline-block"
              initial={{rotateY: 0}}
              whileHover={{rotateY: 180}}
              transition={{duration: 0.3, ease: "easeInOut"}}
              >{mission.icon}</motion.div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{mission.title}</h3>
              <p className="text-gray-600 text-sm">{mission.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
