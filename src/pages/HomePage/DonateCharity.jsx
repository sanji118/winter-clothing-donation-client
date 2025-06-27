import { FaHandHoldingHeart, FaUsers, FaHandsHelping,  FaUserFriends } from "react-icons/fa";
import fundRaising from '../../assets/fundraiser.png';
import donation from '../../assets/donation.png';

const DonateCharity = () => {
  return (
    <div className="min-h-screen px-5 md:px-20 py-16">
      <div>
        <p className="underdog italic text-cyan-600 font-bold text-xl">Welcome to Cozy Kindness</p>
        <h1 className="text-5xl font-bold my-6">
            Transforming Lives, One Donation At A Time
        </h1>
        <p className="text-lg text-gray-600 mb-8">
            Make a difference in moments. Our secure online donation platform makes it easy to give—with multiple payment options and the flexibility to choose one-time or recurring contributions. Your generosity directly fuels our mission and touches lives in need.
        </p>
      </div>

      {/* Features Section */}
      <div>
          {/* Fundraising Card */}
          <div className="flex gap-7 py-5 items-center">
            <div><img src={fundRaising} alt="" className="w-20" /></div>
            <div>
                <h1 className="text-2xl">Fund Raising</h1>
                <p className="text-gray-600">Experience the real impact of our work through the voices of those we've empowered.</p>
            </div>
          </div>

          {/* Donation Making Card */}
          <div className="flex gap-7 py-5 items-center">
            <div><img src={donation} alt="" className="w-20" /></div>
            <div>
                <h1 className="text-2xl">Donation Making</h1>
                <p className=" text-gray-600">Each story reflects the power of your support and the unwavering resilience of our communities.</p>
            </div>
          </div>
          <button className="btn rounded-full bg-cyan-600 text-white shadow-none px-8 py-6">About More</button>
        </div>

        {/* StatsSection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {/* Volunteers Stat */}
            <div className="stat place-items-center text-center">
                <div className="stat-value text-cyan-800">15k+</div>
                <div className="stat-title text-gray-600">Incredible Volunteers</div>
            </div>

            {/* Campaigns Stat */}
            <div className="stat place-items-center text-center">
                <div className="stat-value text-yellow-500">1k+</div>
                <div className="stat-title text-gray-600">Successful Campaigns</div>
            </div>

            {/* Donors Stat */}
            <div className="stat place-items-center text-center">
                <div className="stat-value text-cyan-800">400+</div>
                <div className="stat-title text-gray-600">Monthly Donors</div>
            </div>

            {/* Team Support Stat */}
            <div className="stat place-items-center text-center">
                <div className="stat-value text-yellow-500">35k+</div>
                <div className="stat-title text-gray-600">Team Support</div>
            </div>
        </div>
    </div>
  );
};

export default DonateCharity;


