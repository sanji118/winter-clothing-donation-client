import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, HandCoins, Newspaper, 
  HeartHandshake, MessageSquare, Megaphone, 
  Image, Users2, HelpCircle 
} from 'lucide-react';


const sidebarItems = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Megaphone size={18} /> },
    { id: 'users', label: 'Users', icon: <Users size={18} /> },
    { id: 'donations', label: 'Donations', icon: <HandCoins size={18} /> },
    { id: 'blogs', label: 'Blogs', icon: <Newspaper size={18} /> },
    { id: 'volunteers', label: 'Volunteers', icon: <HeartHandshake size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={18} /> },
    { id: 'team', label: 'Team', icon: <Users2 size={18} /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
  ],
  partner: [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Megaphone size={18} /> },
    { id: 'donations', label: 'Donations', icon: <HandCoins size={18} /> },
  ],
  volunteer: [
    { id: 'tasks', label: 'Tasks', icon: <HeartHandshake size={18} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={18} /> },
  ],
  user: [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'donations', label: 'My Donations', icon: <HandCoins size={18} /> },
  ],
};

export const DashboardSidebar = ({ role = 'admin', selected, onSelect }) => {
  const items = sidebarItems[role] || [];

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <div className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              selected === item.id
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};