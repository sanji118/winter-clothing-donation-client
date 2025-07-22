import React, { useState } from 'react';
import useAuth from '../services/authService';
import { useQuery } from '@tanstack/react-query';
import { getDonations } from '../services/donationService';
import { 
  FiUser, FiMail, FiPhone, FiDownload, 
  FiCalendar 
} from 'react-icons/fi';
import { 
  FaDonate, FaHandsHelping, FaAward, FaTemperatureLow,
  FaChild, FaCoins
} from 'react-icons/fa';
import { formatDate, formatCurrency } from '../utils/formatUtils';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { Link } from 'react-router-dom';
import { generateDonationReceipt } from '../utils/Receipt';

const Profile = ({userRole}) => {
  const { user } = useAuth();
  const [generatingReceipt, setGeneratingReceipt] = useState(null);
  
  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ['donations'],
    queryFn: getDonations
  });

  const userDonations = donations.filter(donation => donation.userId === user?.uid);
  const totalDonated = userDonations.reduce((sum, donation) => sum + donation.amount, 0);

  const handleDownloadReceipt = async (donation) => {
    try {
      setGeneratingReceipt(donation._id);
      await generateDonationReceipt(donation, user);
    } catch (error) {
      console.error("Error generating receipt:", error);
      alert("Failed to generate receipt. Please try again.");
    } finally {
      setGeneratingReceipt(null);
    }
  };

  if (isLoading) return <LoadingState name={'Profile'} />;
  if (isError) return <ErrorState name={'Profile'} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-gradient-to-br from-blue-200 to-blue-500 p-6 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full flex items-center justify-center">
              <img 
                src={user?.photoURL || 'https://i.postimg.cc/vmCTB2Yb/default-user.jpg'} 
                alt="Profile" 
                className='w-32 h-32 rounded-full object-cover border-4 border-white'
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/150'
                }}
              />
            </div>
          </div>
          <div className="p-8 w-full">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {user?.displayName || 'Anonymous Donor'}
                </h1>
                <p className="mt-2 text-gray-600 flex items-center">
                  <FiMail className="mr-2" /> {user?.email || 'Email not provided'}
                </p>
                {user?.phoneNumber && (
                  <p className="mt-1 text-gray-600 flex items-center">
                    <FiPhone className="mr-2" /> {user.phoneNumber}
                  </p>
                )}
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-medium">
                Total Impact: {userDonations.length} donations
              </div>
            </div>

            {/* Impact Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaCoins className="text-blue-600 mr-2" size={20} />
                  <span className="font-semibold">Total Donated</span>
                </div>
                <p className="text-2xl font-bold mt-2">{formatCurrency(totalDonated)}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaTemperatureLow className="text-orange-600 mr-2" size={20} />
                  <span className="font-semibold">Donations</span>
                </div>
                <p className="text-2xl font-bold mt-2">{userDonations.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaChild className="text-green-600 mr-2" size={20} />
                  <span className="font-semibold">Lives Impacted</span>
                </div>
                <p className="text-2xl font-bold mt-2">{userDonations.length * 5}+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation History */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaDonate className="mr-2 text-blue-600" />Donation History
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {userDonations.length > 0 ? (
            userDonations.map((donation) => (
              <div key={donation._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {donation.campaignSlug?.replace(/-/g, ' ') || 'Winter Clothing Drive'}
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-1.5" />
                      {formatDate(donation.date)}
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        {donation.paymentMethod || 'Credit Card'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-center">
                    <span className="text-lg font-semibold mr-4">
                      {formatCurrency(donation.amount)}
                    </span>
                    <button 
                      onClick={() => handleDownloadReceipt(donation)}
                      disabled={generatingReceipt === donation._id}
                      className={`flex items-center ${generatingReceipt === donation._id 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-blue-600 hover:text-blue-800'}`}
                    >
                      <FiDownload className="mr-1" />
                      {generatingReceipt === donation._id ? 'Generating...' : 'Receipt'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No donations found. Consider making your first donation!
              <Link to="/donate" className="ml-2 text-blue-600 hover:underline">
                Donate Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Impact Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <FaHandsHelping className="mr-2 text-blue-600" /> Your Seasonal Impact
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-400">
              <p>Impact visualization coming soon</p>
              <p className="text-sm mt-2">We're working on beautiful charts to show your impact over time</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <FaAward className="mr-2 text-orange-500" /> Your Achievements
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FaTemperatureLow className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Winter Warrior</h4>
                <p className="text-sm text-gray-600">Completed {userDonations.length} winter donations</p>
              </div>
            </div>
            {userDonations.length > 0 && (
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaChild className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Cold Weather Champion</h4>
                  <p className="text-sm text-gray-600">Helped {userDonations.length * 5} people stay warm</p>
                </div>
              </div>
            )}
            {totalDonated > 500 && (
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FaAward className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Generous Benefactor</h4>
                  <p className="text-sm text-gray-600">Donated over {formatCurrency(500)} to winter causes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">This Winter Needs You</h3>
            <p className="opacity-90">Your donation can provide warmth to families in need</p>
          </div>
          <Link 
            to={'/donate'} 
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Donate Winter Essentials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;