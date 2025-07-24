import { useState } from 'react';
import DonationTab from '../../../components/Dashboard/tabs/admin/DonationTab';
import UsersTab from '../../../components/Dashboard/tabs/admin/UsersTab';
import BlogsTab from '../../../components/Dashboard/tabs/admin/BlogsTab';
import VolunteersTab from '../../../components/Dashboard/tabs/admin/VolunteersTab';
import TestimonialsTab from '../../../components/Dashboard/tabs/admin/TestimonialsTab';
import AnnouncementsTab from '../../../components/Dashboard/tabs/admin/AnnouncementsTab';
import GalleryTab from '../../../components/Dashboard/tabs/admin/GalleryTab';
import TeamTab from '../../../components/Dashboard/tabs/admin/TeamTab';
import FaqTab from '../../../components/Dashboard/tabs/admin/FaqTab';
import { DashboardSidebar } from '../../../components/Dashboard/DashboardSidebar';
import CampaignsTab from '../../../components/Dashboard/tabs/admin/CampaignsTab';
import OverviewTab from '../../../components/Dashboard/tabs/OverviewTab';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const renderSection = () => {
    switch (selectedSection) {
      case 'dashboard' : return <OverviewTab/>;
      case 'campaigns': return <CampaignsTab />;
      case 'users': return <UsersTab />;
      case 'donations': return <DonationTab/>;
      case 'blogs': return <BlogsTab />;
      case 'volunteers': return <VolunteersTab />;
      case 'testimonials': return <TestimonialsTab />;
      case 'announcements': return <AnnouncementsTab />;
      case 'gallery': return <GalleryTab />;
      case 'team': return <TeamTab />;
      case 'faq': return <FaqTab />;
      default: return <OverviewTab/>;
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div>
        <DashboardSidebar
          selected={selectedSection} 
          onSelect={setSelectedSection} 
          role='admin'
        />
      </div>
      <main className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
