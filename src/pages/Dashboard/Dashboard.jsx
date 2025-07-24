import { LoadingState } from "../../components/ui/LoadingState";
import AdminDashboard from "./roles/AdminDashboard";
import PartnerDashboard from './roles/PartnerDashboard';
import VolunteerDashboard from './roles/VolunteerDashboard';
import UserDashboard from './roles/UserDashboard';
import Unauthorized from '../../components/ui/Unauthorized';
import useAuth from "../../services/authService";


const Dashboard = () => {
  const { userRole, loading } = useAuth();
  
  if (loading) return <LoadingState name={''} />;
  
  switch(userRole) {
    case 'admin': return <AdminDashboard />;
    case 'partner': return <PartnerDashboard />;
    case 'volunteer': return <VolunteerDashboard />;
    case 'user': return <UserDashboard />;
    default: return <Unauthorized />;
  }
}

export default Dashboard;