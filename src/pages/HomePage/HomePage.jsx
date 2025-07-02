import React from 'react'
import Banner from './Banner'
import DonateCharity from './DonateCharity';
import CharityService from './CharityService';
import MakeADonation from './MakeADonation';
import Volunteers from './Volunteers';
import Donations from './Donations';

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <DonateCharity/>
      <CharityService/>
      <MakeADonation/>
      <Volunteers/>
      <Donations/>
    </div>
  )
}

export default HomePage;