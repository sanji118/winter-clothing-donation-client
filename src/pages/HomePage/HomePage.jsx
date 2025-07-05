import Banner from '../../components/Banner'
import DonateCharity from '../../components/DonateCharity';
import CharityService from '../../components/Charity/CharityService';
import MakeADonation from '../../components/MakeADonation';
import Volunteers from '../../components/Volunteers/Volunteers';
import Donations from '../../components/Donations/Donations';
import SuccessStory from '../../components/SuccessStory';
import TestimonialSection from '../../components/TestimonialSection';
import LocationSection from '../../components/Location/LocationSection';

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <DonateCharity/>
      <CharityService/>
      <MakeADonation/>
      <Volunteers/>
      <Donations/>
      <SuccessStory/>
      <TestimonialSection/>
      <LocationSection/>
    </div>
  )
}

export default HomePage;