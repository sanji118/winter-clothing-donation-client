import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCampaigns } from '../../utils/useCampaigns';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaRegCheckCircle, 
  FaSpinner, 
  FaBoxOpen, 
  FaLeaf, 
  FaHandsHelping,
  FaMountain,
  FaTree,
  FaWater,
  FaSeedling,
  FaCity
} from 'react-icons/fa';

const LocationSection = () => {
  const { data: campaigns = [], isLoading, isError } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });

  // Group campaigns by division
  const groupedByDivision = campaigns.reduce((acc, campaign) => {
    const division = campaign.division;
    if (!acc[division]) acc[division] = [];
    acc[division].push(campaign);
    return acc;
  }, {});

  // Custom SVG marker icon
  const createCustomIcon = () => {
    return new L.DivIcon({
      html: `
        <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4ade80" d="M16 1.5c-4.142 0-7.5 3.358-7.5 7.5 0 7.5 7.5 15 7.5 15s7.5-7.5 7.5-15c0-4.142-3.358-7.5-7.5-7.5z"/>
          <circle cx="16" cy="9" r="4" fill="#ffffff"/>
        </svg>
      `,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
  };

  // Get appropriate icon for each division type
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

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="text-4xl text-blue-500 mb-4"
      >
        <FaSpinner />
      </motion.div>
      <p className="text-center text-lg font-medium">Loading campaigns...</p>
    </div>
  );

  if (isError) return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
      <div className="text-4xl text-red-500 mb-4">⚠️</div>
      <p className="text-center text-red-500 font-medium">Failed to load campaigns.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <section className="px-4 py-10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-emerald-100 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-2xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        {/* Header section */}
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

        {/* Fancy cards section */}
        <div className="space-y-20">
          {Object.keys(groupedByDivision).map((division) => (
            <motion.div 
              key={division}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Division header */}
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
                  {groupedByDivision[division].length} Initiatives
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedByDivision[division].map((campaign, index) => (
                  <motion.div
                    key={campaign.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    {/* Main card */}
                    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 relative">
                      {/* Card header with decorative elements */}
                      <div className="relative flex items-center justify-center mb-5">
                        {/* Status indicator */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center ${campaign.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                          {campaign.status === 'Completed' ? (
                            <FaRegCheckCircle className="mr-1" />
                          ) : (
                            <FaSpinner className="mr-1 animate-spin" />
                          )}
                          {campaign.status}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {campaign.title}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {campaign.description}
                        </p>
                        
                        {/* Progress indicator */}
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

                        {/* Additional info */}
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
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Map Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 relative"
        >
          <div className="absolute -top-20 left-0 right-0 flex justify-center">
            <div className="bg-white px-8 py-3 rounded-full shadow-xl border border-gray-200 flex items-center">
              <FaMapMarkerAlt className="text-emerald-500 mr-2" />
              <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Interactive Campaign Map
              </h3>
            </div>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-blue-50 to-emerald-50">
            <MapContainer 
              center={[23.685, 90.3563]} 
              zoom={7}
              style={{ height: '500px', width: '100%' }}
              className="z-0"
              zoomControl={true}
              scrollWheelZoom={true}
              doubleClickZoom={true}
              boundsOptions={{
                padding: [50, 50],
                maxZoom: 12
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {campaigns.map((campaign) => (
                <Marker
                  key={campaign.title}
                  position={[campaign.location.lat, campaign.location.lng]}
                  icon={createCustomIcon()}
                >
                  <Popup className="rounded-xl shadow-xl border border-emerald-100">
                    <div className="p-3">
                      <h4 className="font-bold text-emerald-700 mb-1">{campaign.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{campaign.location.address}</p>
                      <div className="flex items-center text-xs">
                        <span className={`px-2 py-1 rounded-full ${campaign.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                          {campaign.status}
                        </span>
                        <span className="ml-auto text-gray-500">
                          {campaign.itemsCollected}/{campaign.itemsNeeded} collected
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LocationSection;