import { useQuery } from "@tanstack/react-query";
import { getCampaignBySlug, postCommentToCampaign } from "../../utils/useCampaigns";
import { getDonationBySlug } from "../../utils/useDonations";
import { getFAQsBySlug } from "../../utils/useFaqs";
import { getGalleryBySlug } from "../../utils/useGallery";
import { useParams, useNavigate } from "react-router-dom";
import PageBanner from "../ui/PageBanner";
import image from '../../../public/pageBanners/donation-banner.jpg'
import SectionHeading from "../ui/SectionHeading";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";
import { motion } from "framer-motion";
import { FaDonate, FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaBoxOpen, FaHandsHelping, FaEnvelope, FaArrowRight } from "react-icons/fa";
import CommentsSection from "../CommentSection";

const DonationDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    data: campaignData,
    isLoading: campaignLoading,
    isError: campaignError
  } = useQuery({
    queryKey: ["campaigns", slug],
    queryFn: () => getCampaignBySlug(slug),
  });

  const { data: donationData = [] } = useQuery({
    queryKey: ["donations", slug],
    queryFn: () => getDonationBySlug(slug),
  });

  const { data: faqData = [] } = useQuery({
    queryKey: ["faq", slug],
    queryFn: () => getFAQsBySlug(slug),
  });

  const { data: galleryData = [] } = useQuery({
    queryKey: ["gallery", slug],
    queryFn: () => getGalleryBySlug(slug),
  });

  if (campaignLoading) return <LoadingState name={'Details'}/>;
  if (campaignError) return <ErrorState name="Failed to load campaign details" />;
  if (!campaignData) return <ErrorState name="Campaign not found" />;

  const progress = Math.min((campaignData.raised / campaignData.goal) * 100, 100);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleDonateNow = () => {
    // Navigate to donation form page
    navigate(`/donate/${slug}`);
  };

  return (
    <div className="bg-gray-50">
      <PageBanner title={'Donation'} image={image} />
      
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="p-5 md:p-20 grid grid-cols-1 lg:grid-cols-6 gap-8 max-w-7xl mx-auto"
      >
        {/* Main Content */}
        <div className="lg:col-span-4 space-y-8">
          {/* Campaign Image */}
          <motion.div variants={item} className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={campaignData.image} 
              alt={campaignData.title} 
              className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          
          {/* Campaign Title */}
          <motion.div variants={item}>
            <SectionHeading text={campaignData.title} />
          </motion.div>
          
          {/* Campaign Description */}
          <motion.div variants={item} className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed">{campaignData.description}</p>
          </motion.div>
          
          {/* Progress Section */}
          <motion.div 
            variants={item}
            className="my-5 p-6 rounded-xl bg-amber-100 shadow-md flex flex-col md:flex-row justify-between items-center gap-6 border border-amber-200"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="radial-progress text-cyan-500" 
                  style={{ "--value": progress, "--size": "6rem", "--thickness": "8px" }} 
                  role="progressbar">
                  {Math.floor(progress)}%
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-300"></div>
                  <p className="font-medium text-gray-800">
                    Raised: <span className="text-green-600 font-bold">${campaignData.raised.toLocaleString()}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="font-medium text-gray-800">
                    Goal: <span className="text-gray-600 font-bold">${campaignData.goal.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleDonateNow}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              Donate Now <FaArrowRight />
            </button>
          </motion.div>

          {/* Gallery Section */}
          {galleryData.length > 0 && (
            <motion.div variants={item} className="mt-8">
              <SectionHeading text="Gallery" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {galleryData.map((item, index) => (
                  <motion.div 
                    key={item.image} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-lg overflow-hidden shadow-md relative"
                  >
                    <img 
                      src={item.image} 
                      alt={item.caption} 
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end p-4 hover:bg-[#0000006b]">
                      <p className="text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {item.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Section */}
          {faqData.length > 0 && (
            <motion.div variants={item} className="my-8">
              <SectionHeading text="Frequently Asked Questions" />
              <div className="space-y-4 mt-6">
                {faqData.map((faq) => (
                  <motion.div 
                    key={faq.question} 
                    whileHover={{ scale: 1.01 }}
                    className="collapse collapse-plus bg-white shadow-sm rounded-lg overflow-hidden border border-gray-300"
                  >
                    <input type="radio" name="faq-accordion" /> 
                    <div className="collapse-title text-lg font-medium text-gray-800 bg-gray-200">
                      {faq.question}
                    </div>
                    <div className="collapse-content bg-gray-50"> 
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}


          <div>
            <CommentsSection 
              id={campaignData._id} 
              comments={campaignData.comments} 
              type="donation" 
              postCommentFunction={postCommentToCampaign} 
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Donations */}
          <motion.div 
            variants={item}
            className="bg-green-100 p-6 rounded-xl shadow-md border border-green-300"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-600">
              <FaDonate className="text-orange-400" /> Recent Donations
            </h3>
            {donationData.length > 0 ? (
              <ul className="space-y-3 divide-y divide-yellow-100">
                {donationData.slice(0, 5).map((donation) => (
                  <li key={donation.transactionId} className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <FaHeart className="text-pink-400 text-xs" />
                      </div>
                      <span className="font-medium text-gray-800">
                        {donation.userId === 'anonymous' ? 'Anonymous' : donation.userId.split('@')[0]}
                      </span>
                    </div>
                    <span className="font-bold text-cyan-600">${donation.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-3">No donations yet</p>
                <p className="text-sm text-gray-400">Be the first to support this cause!</p>
              </div>
            )}
          </motion.div>

          {/* Campaign Details */}
          <motion.div 
            variants={item}
            className="bg-purple-100 p-6 rounded-xl shadow-md border border-purple-300"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-600">
              <FaBoxOpen className="text-orange-400" /> Campaign Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-cyan-500">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="font-medium text-gray-500">Status</p>
                  <p className="text-gray-800 capitalize">{campaignData.status}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 text-cyan-500">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-medium text-gray-500">Location</p>
                  <p className="text-gray-800">{campaignData.location.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 text-cyan-500">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="font-medium text-gray-500">Dates</p>
                  <p className="text-gray-800">
                    {new Date(campaignData.startDate).toLocaleDateString()} - {new Date(campaignData.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 text-cyan-500">
                  <FaBoxOpen />
                </div>
                <div>
                  <p className="font-medium text-gray-500">Items</p>
                  <p className="text-gray-800">
                    Collected: <span className="font-bold text-orange-400">{campaignData.itemsCollected}</span> / Needed: <span className="font-bold text-cyan-600">{campaignData.itemsNeeded}</span>
                  </p>
                </div>
              </div>
              
              {campaignData.volunteersNeeded > 0 && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-cyan-500">
                    <FaHandsHelping />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Volunteers</p>
                    <p className="text-gray-800">
                      Needed: <span className="font-bold text-pink-400">{campaignData.volunteersNeeded}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={item}
            className="bg-white p-6 rounded-xl shadow-md border border-pink-100"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-600">
              <FaEnvelope className="text-orange-400" /> Contact
            </h3>
            <div className="flex items-center gap-3">
              <div className="text-cyan-500">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-medium text-gray-500">Email</p>
                <a 
                  href={`mailto:${campaignData.contactInfo}`} 
                  className="text-cyan-600 hover:underline"
                >
                  {campaignData.contactInfo}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationDetails;