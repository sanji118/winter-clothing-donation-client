
import useAuth from '../../services/authService'
import AdminDashboard from './roles/AdminDashboard';
import UserDashboard from './roles/UserDashboard';
import VolunteerDashboard from './roles/VolunteerDashboard';
import PartnerDashboard from './roles/PartnerDashboard';

const Dashboard = () => {
  const {userRole} = useAuth();
  
  if(userRole === 'admin') return <AdminDashboard />
  if (userRole === 'partner') return <PartnerDashboard />;
  if (userRole === 'volunteer') return <VolunteerDashboard />;
  if (userRole === 'user') return <UserDashboard />;
}

export default Dashboard