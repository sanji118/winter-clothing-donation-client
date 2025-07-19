import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import image from '../../../../public/pageBanners/donation-banner.jpg'
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import DonationProgress from "./DonationProgress";
import GallerySection from "./GallerySection";
import FAQSection from "./FAQSection";
import RecentDonations from "./RecentDonations";
import CampaignDetailsSidebar from "./CampaignDetailsSidebar";
import ContactInfo from "./ContactInfo";
import { getCampaignBySlug, postCommentToCampaign } from "../../../services/campaignService";
import { getFAQsBySlug } from "../../../services/faqService";
import { getDonationBySlug } from "../../../services/donationService";
import { getGalleryBySlug } from "../../../services/galleryService";
import { LoadingState } from "../../ui/LoadingState";
import { ErrorState } from "../../ui/ErrorState";
import PageBanner from "../../ui/PageBanner";
import CommentsSection from "../../CommentSection";
import SectionHeading from "../../ui/SectionHeading";
import { useInView } from "react-intersection-observer";
import OrganizerSection from "./OrganizerSection";

const DonationDetails = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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

  const handleDonateNow = () => {
    navigate('/donate', {
      state: {
        selectedCampaignId: campaignData._id,
        selectedCampaignTitle: campaignData.title,
        selectedCampaignSlug: campaignData.slug,
        organizer: campaignData.organizer
      }
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15,
        mass: 0.5
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-gray-50">
      <PageBanner title={'Donation'} image={image} />
      
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="p-5 md:p-20 grid grid-cols-1 lg:grid-cols-6 gap-8 max-w-7xl mx-auto"
      >
        {/* Main Content */}
        <div className="lg:col-span-4 space-y-8">
          {/* Campaign Image */}
          <motion.div 
            variants={slideUp}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img 
              src={campaignData.image} 
              alt={campaignData.title} 
              className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          
          {/* Campaign Title */}
          <motion.div variants={slideUp}>
            <SectionHeading text={campaignData.title} />
          </motion.div>
          
          {/* Campaign Description */}
          <motion.div 
            variants={slideUp}
            className="prose max-w-none text-gray-700"
          >
            <p className="text-lg leading-relaxed">{campaignData.description}</p>
          </motion.div>
          
          <DonationProgress
           campaign={campaignData} 
            progress={progress}
            raised={campaignData.raised}
            goal={campaignData.goal}
            onDonateNow={handleDonateNow}
          />

          <GallerySection galleryData={galleryData} />
          <FAQSection faqData={faqData} />

          <motion.div variants={fadeIn}>
            <CommentsSection 
              id={campaignData._id} 
              comments={campaignData.comments} 
              type="donation" 
              postCommentFunction={postCommentToCampaign} 
            />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          <OrganizerSection organizer={campaignData.organizer} />
          <RecentDonations donationData={donationData} />
          <CampaignDetailsSidebar campaignData={campaignData} />
          <ContactInfo contactInfo={campaignData.contactInfo} />
        </div>
      </motion.div>
    </div>
  );
};

export default DonationDetails;