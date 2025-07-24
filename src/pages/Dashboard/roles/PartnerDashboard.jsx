import { useState } from 'react';
import PartnerCampaignsTab from '../../../components/Dashboard/tabs/partner/PartnerCampaignsTab';
import { DashboardSidebar } from '../../../components/Dashboard/DashboardSidebar';
import CampaignsTab from '../../../components/Dashboard/tabs/admin/CampaignsTab';
import DonationTab from '../../../components/Dashboard/tabs/admin/DonationTab';
import OverviewTab from '../../../components/Dashboard/tabs/OverviewTab';

const PartnerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const renderSection = () => {
    switch (selectedSection) {
      case 'dashboard' : return <OverviewTab/>;
      case 'campaigns': return <CampaignsTab />;
      case 'my-campaigns': return <PartnerCampaignsTab />;
      case 'donations': return <DonationTab />;
      default: return <OverviewTab/>;
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