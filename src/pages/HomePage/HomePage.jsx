import React from 'react'
import Banner from './Banner'
import DonateCharity from './DonateCharity';
import CharityService from './CharityService';
import MakeADonation from '../../routes/MakeADonation';

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <DonateCharity/>
      <CharityService/>
      <MakeADonation/>
    </div>
  )
}

export default HomePage;