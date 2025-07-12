import React from 'react'
import DonationForm from '../../components/Donations/DonationForm'
import { getCampaigns } from '../../services/campaignService';

const DonateNow = () => {
  const { data: campaigns = [], isLoading, isError } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });
  return (
    <div>DonateNow

      <DonationForm campaigns = { campaigns } />
    </div>
  )
}

export default DonateNow