import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import OverviewTab from './tabs/OverviewTab';
import ProfileTab from './tabs/ProfileTab';
import DonationsTab from './tabs/DonationsTab';
import EventsTab from './tabs/EventsTab';
import UsersTab from './tabs/UsersTab';
import CampaignsTab from './tabs/CampaignsTab';
import SettingsTab from './tabs/SettingsTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState('user');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role from backend
    const fetchUserRole = async () => {
      try {
        // You would typically make an API call here to get user role
        // For example: const response = await axios.get(`/users/${currentUser.uid}/role`);
        // setUserRole(response.data.role);
        
        // Mock implementation for now
        if (currentUser?.email === 'admin@example.com') {
          setUserRole('admin');
        } else if (currentUser?.email === 'volunteer@example.com') {
          setUserRole('volunteer');
        } else {
          setUserRole('user');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    if (currentUser) {
      fetchUserRole();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab userRole={userRole} />;
      case 'profile':
        return <ProfileTab userRole={userRole} />;
      case 'donations':
        return <DonationsTab />;
      case 'events':
        return <EventsTab userRole={userRole} />;
      case 'users':
        return userRole === 'admin' ? <UsersTab /> : null;
      case 'campaigns':
        return userRole === 'admin' ? <CampaignsTab /> : null;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userRole={userRole} 
          handleLogout={handleLogout} 
        />
        
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser?.displayName || 'User'}!</h2>
              <p className="mt-1 text-gray-600">
                {userRole === 'admin' 
                  ? 'Here\'s what\'s happening with your organization today.' 
                  : userRole === 'volunteer'
                  ? 'Thank you for your dedication to our cause!'
                  : 'Thank you for your support of our mission!'}
              </p>
            </div>
            
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;