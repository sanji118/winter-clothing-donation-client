import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../../services/campaignService';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import image from '../../../public/pageBanners/campaign-banner.jpg';
import { FaMapMarkerAlt, FaCalendarAlt, FaDonate } from 'react-icons/fa';
import PageBanner from '../../components/ui/PageBanner';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';

const DonationCampaigns = () => {
  const { data: campaigns = [], isLoading, isError } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });

  if (isLoading) return <LoadingState name="campaigns" />;
  if (isError) return <ErrorState name="campaigns" />;

  return (
    <div>
      <PageBanner image={image} />
      <div className="space-y-8 p-5 md:p-20">
        {campaigns.map((campaign, index) => {
          const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
          
          return (
            <motion.div
              key={campaign.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 h-64 md:h-auto relative">
                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    campaign.status.toLowerCase() === 'active' ? 'bg-gray-100 text-gray-800' 
                    : campaign.status.toLowerCase() === 'upcoming' ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              </div>

              <div className="md:w-3/5 p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{campaign.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="flex items-center mr-2"><FaMapMarkerAlt className="mr-1" /> {campaign.division}</span>
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" /> 
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                </div>

                <div className="mt-auto">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">৳{campaign.raised.toLocaleString()} raised</span>
                      <span className="text-gray-500">Goal: ৳{campaign.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-gray-400 to-gray-600 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {Math.round(progress)}% funded
                    </div>
                  </div>

                  <Link 
                    to={`/campaigns/slug/${campaign.slug}`}
                    className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    <FaDonate className="mr-2" /> Donate Now
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationCampaigns;