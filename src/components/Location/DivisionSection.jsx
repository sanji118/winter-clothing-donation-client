import { motion } from 'framer-motion';
import { FaHandsHelping, FaTree, FaMountain, FaWater, FaCity, FaSeedling, FaLeaf} from 'react-icons/fa';
import { CampaignCard } from './CampaignCard';
import { Link } from 'react-router-dom';


const getDivisionIcon = (division) => {
  const icons = {
    'Forest': <FaTree className="text-green-500" />,
    'Mountain': <FaMountain className="text-amber-600" />,
    'Coastal': <FaWater className="text-blue-400" />,
    'Urban': <FaCity className="text-gray-500" />,
    'Rural': <FaSeedling className="text-emerald-400" />,
    default: <FaLeaf className="text-green-400" />
  };
  return icons[division] || icons.default;
};
export const DivisionSection = ({ division, campaigns }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="relative"
  >
    <div className="flex items-center mb-8 relative pl-6">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-full"></div>
      <div className="text-2xl mr-4">
        {getDivisionIcon(division)}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-800 relative inline-block">
          {division}
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></span>
        </h3>
      </div>
      <div className="ml-auto px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full flex items-center text-sm">
        <FaHandsHelping className="mr-2" />
        {campaigns.length} Initiatives
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {campaigns.map((campaign, index) => (
        <Link to={'/campaigns'} key={index}><CampaignCard 
          key={campaign.title} 
          campaign={campaign} 
          index={index} 
        /></Link>
      ))}
    </div>
  </motion.div>
);