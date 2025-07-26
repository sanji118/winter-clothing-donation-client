import { useQuery } from '@tanstack/react-query';
import { getVolunteers } from '../../../services/volunteerService';
import { getCampaigns } from '../../../services/campaignService';
import { getDonations } from '../../../services/donationService';
import { getUsers } from '../../../services/userService';
import useAuth from '../../../services/authService';
import { getAdminStats } from '../../../services/statsService';
import { LoadingState } from '../../ui/LoadingState';
import { ErrorState } from '../../ui/ErrorState';
import { 
  BarChart, 
  PieChart, 
  Bar, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Calendar, 
  HeartHandshake, 
  Users, 
  DollarSign, 
  PackageCheck, 
  AlertCircle,
  Clock,
  TrendingUp,
  ClipboardList
} from 'lucide-react';
import { format } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const OverviewTab = () => {
  const { user , userRole} = useAuth();
  
  const { data: campaigns =[]} = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns
  });
  
  const { data: donations =[] } = useQuery({
    queryKey: ['donations'],
    queryFn: getDonations
  });
  
  const { data: users = [] } = useQuery({
    queryKey: ['users'], 
    queryFn: getUsers
  });
  
  const { data: volunteers = [] } = useQuery({
    queryKey: ['volunteers'], 
    queryFn: getVolunteers
  });

  const { data: adminStatsData = [], isError, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: getAdminStats
  });

  if (isLoading) return <LoadingState name="dashboard data" />;
  if (isError) return <ErrorState name="dashboard data" />;

  // Calculate metrics
  const activeCampaigns = campaigns?.filter(c => c.status === 'Active') || [];
  const upcomingEvents = campaigns?.filter(c => c.status === 'Upcoming') || [];
  const completedCampaigns = campaigns?.filter(c => c.status === 'Completed') || [];
  
  const volunteerNeededForUpcomingEvent = upcomingEvents.filter(c => 
    c.volunteersNeeded > (c.volunteersRegistered || 0)
  );
  
  const recentDonations = [...donations]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  const recentCampaigns = [...campaigns]
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 3);
  
  const topCampaigns = [...campaigns]
    .sort((a, b) => b.raised - a.raised)
    .slice(0, 5);
  
  // Prepare chart data
  const campaignProgressData = topCampaigns.map(campaign => ({
    name: campaign.title,
    raised: campaign.raised,
    goal: campaign.goal,
    progress: (campaign.raised / campaign.goal) * 100
  }));
  
  const donationTypeData = [
    { name: 'Campaign', value: donations.filter(d => !d.isGuest).length },
    { name: 'General', value: donations.filter(d => d.isGuest).length }
  ];
  
  // userRole-based stats
  const renderStatsCards = () => {
    const commonStats = [
      {
        title: 'Active Campaigns',
        value: activeCampaigns.length,
        icon: <HeartHandshake className="w-6 h-6" />,
        change: '+2 from last month',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600'
      },
      {
        title: 'Upcoming Events',
        value: upcomingEvents.length,
        icon: <Calendar className="w-6 h-6" />,
        change: '+1 from last month',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600'
      }
    ];
    console.log(adminStatsData)
    if (userRole === 'admin') {
      return [
        ...commonStats,
        {
          title: 'Total Donations',
          value: `৳ ${adminStatsData?.totalDonationAmount?.toLocaleString() || 0}`,
          icon: <DollarSign className="w-6 h-6" />,
          change: '+৳12,500 from last month',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600'
        },
        {
          title: 'Total Volunteers',
          value: adminStatsData.totalVolunteers || 0,
          icon: <Users className="w-6 h-6" />,
          change: '+3 from last month',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-600'
        },
        {
          title: 'Registered Users',
          value: adminStatsData.totalUsers || 0,
          icon: <Users className="w-6 h-6" />,
          change: '+5 from last month',
          bgColor: 'bg-indigo-50',
          textColor: 'text-indigo-600'
        },
        {
          title: 'Pending Approvals',
          value: '4',
          icon: <AlertCircle className="w-6 h-6" />,
          change: '-2 from last week',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-600'
        }
      ];
    }
    
    if (userRole === 'volunteer') {
      return [
        ...commonStats,
        {
          title: 'My Volunteer Hours',
          value: '24',
          icon: <Clock className="w-6 h-6" />,
          change: '+8 this month',
          bgColor: 'bg-teal-50',
          textColor: 'text-teal-600'
        },
        {
          title: 'Upcoming Shifts',
          value: '3',
          icon: <Calendar className="w-6 h-6" />,
          change: '1 new this week',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-600'
        },
        {
          title: 'Campaigns Needing Help',
          value: volunteerNeededForUpcomingEvent.length,
          icon: <AlertCircle className="w-6 h-6" />,
          change: 'Urgent: 2 need more volunteers',
          bgColor: 'bg-red-50',
          textColor: 'text-red-600'
        }
      ];
    }
    
    // Default user view
    return [
      ...commonStats,
      {
        title: 'My Donations',
        value: `৳${donations.filter(d => d.userId === user?.uid).reduce((sum, d) => sum + d.amount, 0).toLocaleString()}`,
        icon: <DollarSign className="w-6 h-6" />,
        change: '+৳5,000 this year',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600'
      }
    ];
  };

  return (
    <div className="space-y-8 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatsCards().map((stat, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-xl shadow-sm border ${stat.bgColor} ${stat.textColor}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs mt-2 opacity-75">{stat.change}</p>
              </div>
              <div className="p-2 rounded-lg bg-white bg-opacity-30">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Top Campaigns by Donations
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`৳${value.toLocaleString()}`, "Raised Amount"]}
                />
                <Legend />
                <Bar dataKey="raised" fill="#8884d8" name="Raised Amount" />
                <Bar dataKey="goal" fill="#82ca9d" name="Goal Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donation Types Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <ClipboardList className="w-5 h-5 mr-2" />
            Donation Types
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donationTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {donationTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} donations`, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-4">Recent Donations</h3>
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{donation.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-500">
                      {campaigns.find(c => c.slug === donation.campaignSlug)?.title || 'General Donation'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">৳{donation.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(donation.date), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Updates */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-4">Recent Campaign Updates</h3>
          <div className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <div key={index} className="p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{campaign.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {campaign.description.substring(0, 100)}...
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {Math.round((campaign.raised / campaign.goal) * 100)}%
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>৳{campaign.raised.toLocaleString()} raised</span>
                  <span>Goal: ৳{campaign.goal.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Volunteer-specific sections */}
      {userRole === 'volunteer' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-4">Campaigns Needing Volunteers</h3>
          <div className="space-y-4">
            {volunteerNeededForUpcomingEvent.slice(0, 3).map((campaign, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{campaign.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {campaign.division} • {format(new Date(campaign.startDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Urgent
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">
                      Volunteers needed: {campaign.volunteersNeeded}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-600">
                      Registered: {campaign.volunteersRegistered || 0}
                    </span>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Sign Up
                  </button>
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