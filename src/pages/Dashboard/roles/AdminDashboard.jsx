import { useEffect, useState } from 'react';
import DonationTab from '../../../components/Dashboard/tabs/admin/DonationTab';
import UsersTab from '../../../components/Dashboard/tabs/admin/UsersTab';
import BlogsTab from '../../../components/Dashboard/tabs/admin/BlogTab/BlogsTab';
import VolunteersTab from '../../../components/Dashboard/tabs/admin/VolunteersTab';
import TestimonialsTab from '../../../components/Dashboard/tabs/admin/TestimonialsTab';
import AnnouncementsTab from '../../../components/Dashboard/tabs/admin/AnnouncementsTab';
import GalleryTab from '../../../components/Dashboard/tabs/admin/GalleryTab';
import TeamTab from '../../../components/Dashboard/tabs/admin/TeamTab';
import FaqTab from '../../../components/Dashboard/tabs/admin/FaqTab';
import { DashboardSidebar } from '../../../components/Dashboard/DashboardSidebar';
import CampaignsTab from '../../../components/Dashboard/tabs/admin/campaignTab/CampaignsTab';
import OverviewTab from '../../../components/Dashboard/tabs/OverviewTab';

const sectionMap = {
  dashboard: <OverviewTab />,
  campaigns: <CampaignsTab />,
  users: <UsersTab />,
  donations: <DonationTab />,
  blogs: <BlogsTab />,
  volunteers: <VolunteersTab />,
  testimonials: <TestimonialsTab />,
  announcements: <AnnouncementsTab />,
  gallery: <GalleryTab />,
  team: <TeamTab />,
  faq: <FaqTab />
};

const AdminDashboard = () => {
  const getSectionFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return sectionMap[hash] ? hash : 'dashboard';
  };

  const [selectedSection, setSelectedSection] = useState(getSectionFromHash);

  
  useEffect(() => {
    const onHashChange = () => {
      const section = getSectionFromHash();
      setSelectedSection(section);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  
  const handleSelect = (section) => {
    window.location.hash = section;
    setSelectedSection(section);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div>
        <DashboardSidebar
          selected={selectedSection}
          onSelect={handleSelect}
          role="admin"
        />
      </div>
      <main className="flex-1 overflow-y-auto">
        {sectionMap[selectedSection]}
      </main>
    </div>
  );
};

export default AdminDashboard;
