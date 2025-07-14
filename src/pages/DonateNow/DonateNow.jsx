
import { useLocation } from 'react-router-dom';
import { DonationForm } from '../../components/Donations/DonationForm';
import { ErrorState } from '../../components/ui/ErrorState';
import { LoadingState } from '../../components/ui/LoadingState';
import { getCampaigns } from '../../services/campaignService';
import { useQuery } from '@tanstack/react-query';
import SectionHeading from '../../components/ui/SectionHeading';
import OrganizerSection from '../../components/Donations/DonationDetails/OrganizerSection';

const DonateNow = () => {
  const location = useLocation();
  const { state } = location || {};
  const selectedCampaignId = state?.selectedCampaignId;
  const selectedCampaignSlug = state?.selectedCampaignSlug;
  const selectedCampaignTitle = state?.selectedCampaignTitle;
  const organizer = state?.organizer;
  console.log(selectedCampaignSlug, selectedCampaignTitle)

  const { data: campaigns = [], isLoading, isError } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingState name={'Donation Form'} />;
  if (isError) return <ErrorState  name={'Donation Form'} />;

  console.log(organizer);
  return (
    <div className='p-5 md:p-20 bg-cyan-50'>
      <div className='w-fit mx-auto'>
        <SectionHeading text={'Make a Donation and be smile of others'} />
        <p className='opacity-80'>Support our causes by contributing to one of our active campaigns.</p>
      </div>
      <div className='my-10'>
        <DonationForm
         campaigns = { campaigns }
         defaultCampaignId = {selectedCampaignId}
         defaultCampaignSlug={selectedCampaignSlug}
         defaultCampaignTitle={selectedCampaignTitle}
         />
      </div>
      
      {organizer && <OrganizerSection organizer={organizer} /> }
    </div>
  )
}

export default DonateNow