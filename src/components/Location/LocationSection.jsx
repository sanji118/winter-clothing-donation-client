import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { getCampaigns } from '../../utils/useCampaigns';
import { LoadingState } from '../ui/LoadingState';
import { ErrorState } from '../ui/ErrorState';
import { DivisionSection } from './DivisionSection';
import { CampaignMap } from './CampaignMap';
import { DecorativeBgLocation } from './DecorativeBgLocation';
import { LocationHeader } from './LocationHeader';

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

  if (isLoading) return <LoadingState name={'Campaigns'}/>;
  if (isError) return <ErrorState />;

  return (
    <section className="px-4 py-10 relative overflow-hidden">
      <DecorativeBgLocation />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <LocationHeader />

        <div className="space-y-20">
          {Object.keys(groupedByDivision).map((division) => (
            <DivisionSection 
              key={division}
              division={division}
              campaigns={groupedByDivision[division]}
            />
          ))}
        </div>

        <CampaignMap campaigns={campaigns} />
      </motion.div>
    </section>
  );
};

export default LocationSection;