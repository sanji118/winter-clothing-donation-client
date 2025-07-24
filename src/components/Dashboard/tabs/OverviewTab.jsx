import { useQuery } from '@tanstack/react-query';
import { 
  HeartHandshake, Calendar, Package,
  MapPin, Clock, DollarSign,
  Shirt,
} from 'lucide-react';
import { GiLabCoat } from "react-icons/gi";
import { getVolunteers } from '../../../services/volunteerService';
import { getCampaigns } from '../../../services/campaignService';
import { getDonations } from '../../../services/donationService';
import { getUsers } from '../../../services/userService';
import useAuth from '../../../services/authService';

const OverviewTab = ({ role = 'user' }) => {
    const { user } = useAuth()
  
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns
  });
  const { data: donations } = useQuery({
    queryKey: ['donations'],
    queryFn: getDonations
  });
  const { data: users } = useQuery({
    queryKey: ['users'], 
    queryFn: getUsers
  });
  const { data: volunteers } = useQuery({
    queryKey: ['volunteers'], 
    queryFn:  getVolunteers
   });

  // Calculate metrics
  const activeCampaigns = campaigns?.filter(c => c.status === 'Active') || [];
  const totalRaised = donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
  const dhakaCampaigns = campaigns?.filter(c => c.division === 'Dhaka') || [];
  const upcomingEvents = campaigns?.filter(c => c.status === 'Upcoming');
  const volunteerNeededForUpcomingEvent = upcomingEvents?.filter(c => 
    c.volunteersNeeded > (c.volunteersRegistered || 0)
  );
  // Role-based stats
  const stats = {
    admin: [
      { 
        label: 'Active Campaigns', 
        value: activeCampaigns.length,
        icon: GiLabCoat,
        color: 'bg-purple-100 text-purple-700',
        trend: activeCampaigns.length > 5 ? 'up' : 'neutral'
      },
      { 
        label: 'Total Donations', 
        value: `৳${totalRaised.toLocaleString()}`,
        icon: DollarSign,
        color: 'bg-green-100 text-green-700',
        trend: 'up'
      },
      { 
        label: 'Dhaka Initiatives', 
        value: dhakaCampaigns.length,
        icon: MapPin,
        color: 'bg-blue-100 text-blue-700',
        trend: 'neutral'
      },
      { 
        label: 'Volunteers', 
        value: volunteers?.length || 0,
        icon: HeartHandshake,
        color: 'bg-pink-100 text-pink-700',
        trend: 'up'
      }
    ],
    partner: [
      {
        label: 'Your Campaigns',
        value: campaigns?.filter(c => c.organizer.email === user.email).length || 0,
        icon: Shirt,
        color: 'bg-purple-100 text-purple-700'
      },
      {
        label: 'Items Collected',
        value: campaigns?.reduce((sum, c) => sum + (c.itemsCollected || 0), 0),
        icon: Package,
        color: 'bg-amber-100 text-amber-700'
      }
    ],
    volunteer: [
      {
        label: 'Upcoming Events',
        value: volunteerNeededForUpcomingEvent,
        icon: Calendar,
        color: 'bg-blue-100 text-blue-700'
      },
      {
        label: 'Hours Contributed',
        value: volunteers?.find(v => v.userId === user.email)?.contribution.hours || 0,
        icon: Clock,
        color: 'bg-green-100 text-green-700'
      }
    ]
  }[role];

  
  const featuredCampaign = activeCampaigns[0] || {};

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {role === 'admin' ? 'Organization Overview' : 'Your Dashboard'}
        </h1>
        <p className="text-gray-600">
          {role === 'admin' 
            ? 'Real-time insights across all campaigns' 
            : 'Track your impact and activities'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.trend && (
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' ? '+12%' : stat.trend === 'down' ? '-5%' : '±0%'}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Spotlight */}
      {featuredCampaign && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Featured Campaign</h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {featuredCampaign.status}
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <img 
                src={featuredCampaign.image} 
                alt={featuredCampaign.title}
                className="w-full md:w-1/3 h-48 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">{featuredCampaign.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {featuredCampaign.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Raised</p>
                    <p className="font-semibold">৳{featuredCampaign.raised?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Goal</p>
                    <p className="font-semibold">৳{featuredCampaign.goal?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Progress</p>
                    <p className="font-semibold">
                      {Math.round((featuredCampaign.raised / featuredCampaign.goal) * 100)}%
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, (featuredCampaign.raised / featuredCampaign.goal) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src={featuredCampaign?.organizer?.avatar} 
                alt={featuredCampaign?.organizer?.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{featuredCampaign?.organizer?.name}</p>
                <p className="text-xs text-gray-500">{featuredCampaign?.organizer?.organization}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {featuredCampaign?.division}
              </span>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                {featuredCampaign?.itemsCollected}/{featuredCampaign?.itemsNeeded} items
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity (Admin only) */}
      {role === 'admin' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Recent Donations</h2>
          <div className="space-y-4">
            {donations?.slice(0, 3).map(donation => (
              <div key={donation._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{donation.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">৳{donation.amount}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {donation.method.split(',')[0].trim()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;