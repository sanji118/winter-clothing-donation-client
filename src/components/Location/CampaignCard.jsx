import { motion } from 'framer-motion';
import { 
  FaRegCheckCircle, 
  FaSpinner, 
  FaBoxOpen, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

export const CampaignCard = ({ campaign }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 relative">
      <div className="relative flex items-center justify-center mb-5">
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center ${campaign.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
          {campaign.status === 'Completed' ? (
            <FaRegCheckCircle className="mr-1" />
          ) : (
            <FaSpinner className="mr-1 animate-spin" />
          )}
          {campaign.status}
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
          {campaign.title}
        </h4>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {campaign.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round((campaign.itemsCollected / campaign.itemsNeeded) * 100)}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full flex items-center justify-end"
              style={{ width: `${(campaign.itemsCollected / campaign.itemsNeeded) * 100}%` }}
            >
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <FaBoxOpen className="text-blue-400 mr-2" />
            <span>{campaign.itemsCollected}/{campaign.itemsNeeded} items</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="text-emerald-400 mr-2" />
            <span className="truncate max-w-[120px]">{campaign.location.address}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);