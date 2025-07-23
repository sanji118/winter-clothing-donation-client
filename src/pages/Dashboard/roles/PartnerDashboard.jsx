import { useState } from 'react';
import CampaignsTab from '../../../components/Dashboard/tabs/CampaignsTab';
import PartnerCampaignsTab from '../../../components/Dashboard/tabs/partner/PartnerCampaignsTab';
import DonationTab from '../../../components/Dashboard/tabs/DonationTab';
import { DashboardSidebar } from '../../../components/Dashboard/DashboardSidebar';

const PartnerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const renderSection = () => {
    switch (selectedSection) {
      case 'campaigns': return <CampaignsTab />;
      case 'my-campaigns': return <PartnerCampaignsTab />;
      case 'donations': return <DonationTab />;
      default: return <div>Partner Overview</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar 
        selected={selectedSection} 
        onSelect={setSelectedSection} 
        role="partner" 
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default PartnerDashboard;