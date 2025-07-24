import { useState } from 'react';
import VolunteerTasksTab from '../../../components/Dashboard/tabs/volunteer/VolunteerTasksTab';
import VolunteerEventsTab from '../../../components/Dashboard/tabs/volunteer/VolunteerEventsTab';
import { DashboardSidebar } from '../../../components/Dashboard/DashboardSidebar';
import OverviewTab from '../../../components/Dashboard/tabs/OverviewTab';

const VolunteerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('tasks');

  const renderSection = () => {
    switch (selectedSection) {
      case 'tasks': return <VolunteerTasksTab />;
      case 'events': return <VolunteerEventsTab />;
      default: return <OverviewTab/>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar 
        selected={selectedSection} 
        onSelect={setSelectedSection} 
        role="volunteer" 
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default VolunteerDashboard;