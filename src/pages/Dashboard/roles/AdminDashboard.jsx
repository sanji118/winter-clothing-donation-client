import { useState } from 'react';
import CampaignsTab from '../../../components/Dashboard/tabs/CampaignsTab';
import DonationTab from '../../../components/Dashboard/tabs/DonationTab';
import UsersTab from '../../../components/Dashboard/tabs/admin/UsersTab';
import BlogsTab from '../../../components/Dashboard/tabs/BlogsTab';
import VolunteersTab from '../../../components/Dashboard/tabs/VolunteersTab';
import TestimonialsTab from '../../../components/Dashboard/tabs/TestimonialsTab';
import AnnouncementsTab from '../../../components/Dashboard/tabs/admin/AnnouncementsTab';
import GalleryTab from '../../../components/Dashboard/tabs/admin/GalleryTab';
import TeamTab from '../../../components/Dashboard/tabs/admin/TeamTab';
import FaqTab from '../../../components/Dashboard/tabs/admin/FaqTab';
import { DashboardSidebar } from '../../../components/Dashboard/DashboardSidebar';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const renderSection = () => {
    switch (selectedSection) {
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
      default: return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar
      selected={selectedSection} 
      onSelect={setSelectedSection} 
      role='admin'
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
