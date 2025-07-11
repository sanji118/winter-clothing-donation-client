import { useQuery } from "@tanstack/react-query";
import { getCampaignBySlug } from "../../utils/useCampaigns";
import { getDonationBySlug } from "../../utils/useDonations";
import { getFAQsBySlug } from "../../utils/useFaqs";
import { getGalleryBySlug } from "../../utils/useGallery";
import { useParams } from "react-router-dom";

const DonationDetails = () => {
  const {slug} = useParams();


  const {
    data: campaignData = [],
    isLoading,
    isError
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

  console.log(campaignData)

  return (
    <div>
      <h2 className="text-xl font-bold">Donation Details</h2>
      <p>Campaigns: {JSON.stringify(campaignData)}</p>
      <p>Donations: {JSON.stringify(donationData)}</p>
      <p>FAQs: {JSON.stringify(faqData)}</p>
      <p>Gallery: {JSON.stringify(galleryData)}</p>
    </div>
  );
};

export default DonationDetails;
