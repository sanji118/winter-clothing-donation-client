import { useState } from 'react';
import Profile from '../../../auth/Profile';
import UserDonationsTab from '../../../components/Dashboard/tabs/user/UserDonationsTab';
import { DashboardSidebar } from '../../../components/Dashboard/DashboardSidebar';

const UserDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('profile');

  const renderSection = () => {
    switch (selectedSection) {
      case 'profile': return <Profile />;
      case 'donations': return <UserDonationsTab />;
      default: return <div>User Overview</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar 
        selected={selectedSection} 
        onSelect={setSelectedSection} 
        role="user" 
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default UserDashboard;