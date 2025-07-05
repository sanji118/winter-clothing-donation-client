import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

export const CampaignMap = ({ campaigns }) => (
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
);