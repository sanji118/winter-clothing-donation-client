
import { DonationForm } from '../../components/Donations/DonationForm';
import { ErrorState } from '../../components/ui/ErrorState';
import { LoadingState } from '../../components/ui/LoadingState';
import { getCampaigns } from '../../services/campaignService';
import { useQuery } from '@tanstack/react-query';

const DonateNow = () => {
  const { data: campaigns = [], isLoading, isError } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });

  if (isLoading) return <LoadingState name={'Donation Form'} />;
  if (isError) return <ErrorState  name={'Donation Form'} />;
  return (
    <div>
      <div>
      </div>
      <DonationForm campaigns = { campaigns } />
    </div>
  )
}

export default DonateNow