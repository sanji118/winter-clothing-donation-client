import React from 'react'
import Banner from './Banner'
import DonateCharity from './DonateCharity';
import CharityService from './CharityService';
import MakeADonation from './MakeADonation';
import Volunteers from './Volunteers';

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <DonateCharity/>
      <CharityService/>
      <MakeADonation/>
      <Volunteers/>
    </div>
  )
}

export default HomePage;