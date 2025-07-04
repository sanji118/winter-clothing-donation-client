import React from 'react'
import Banner from './Banner'
import DonateCharity from './DonateCharity';
import CharityService from './CharityService';
import MakeADonation from './MakeADonation';
import Volunteers from './Volunteers';
import Donations from './Donations';
import SuccessStory from './SuccessStory';
import TestimonialSection from './TestimonialSection';

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
    </div>
  )
}

export default HomePage;