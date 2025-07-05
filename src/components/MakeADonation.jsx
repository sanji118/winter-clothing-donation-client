import { Link } from 'react-router-dom';
import heart from '../assets/images/heart.gif';
import SectionHeading from './ui/SectionHeading';
import SectionSubHeading from './ui/SectionSubHeading';

const MakeADonation = () => {

  return (
    <div className="bg-cyan-900 p-5 md:p-20 my-20 text-white">
      {/* Header */}
      <div>
        <SectionSubHeading text={'Make a donation'} />
        <div className='flex items-start max-w-xl'>
          <SectionHeading text={'Be the Reason Someone Smiles Volunteer or Donate Today'}/>
          <img src={heart} alt="heart" className="w-14 md:w-20" />
        </div>
        <p className="opacity-60">
          Our volunteers are the heartbeat of everything we do. Join us to create real change in your community.
          Whether you give a few hours or a few days, your time and talents make a lasting impact.
        </p>
      </div>

      {/* Campaign Section */}
      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center bg-white text-black p-6 rounded-xl">
        {/* Image */}
        <div>
          <img
            src="https://i.postimg.cc/pLsJx7Xp/flat-illustration-clothing-donation-concept-52683-55515.avif"
            alt="Warm Coats for Dhaka's Streets"
            className="rounded-xl"
          />
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Warm Coats for Dhaka's Streets</h2>
          <p className="mb-10 opacity-80">
            A campaign to distribute warm coats and blankets to the homeless in Dhaka city.
          </p>
          <div className=' tooltip tooltip-open tooltip-info' data-tip="70%">
            <progress className='progress progress-warning w-56' value={'70'} max={'100'} ></progress>
          </div>

          <div className="flex justify-between text-sm mb-4 mt-1">
            <span className="font-semibold">$5000 Raised</span>
            <span className="text-gray-500">Goal: $10000</span>
          </div>

          <Link to={'/donate'}><button className="bg-cyan-600 hover:bg-cyan-700 transition px-6 py-3 rounded-full font-semibold text-white">
            Donate Now
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default MakeADonation;
