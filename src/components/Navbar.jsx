import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";

const Navbar = () => {
  const auth = useAuth();
  const user = auth?.user || null;
  const signOutUser = auth?.signOutUser || null;

  const publicNavLinks = [
    {name: 'Home', path: '/'},
    {name: 'Donation Campaigns', path: '/donations'},
    {name: 'How to Help', path: 'how-to-help'},
    {name: 'Dashboard', path: '/dashboard'}
  ]
  
  return (
    <>
        {/* medium device */}
        <div className="navbar text-white justify-between">
            <div>
                <img src="./logo.png" alt="CozyKindness" className="w-28" />
            </div>
            <div className="bg-[#40acbb] h-fit rounded-full">
                <ul className="flex gap-8 px-8 items-center py-2">
                    {publicNavLinks.map(link=>(
                        <li key={link.path}><Link to={link.path}>{link.name}</Link></li>
                    ))}
                </ul>
            </div>
            <div>
                {
                    user? (
                        <div>
                            <Link><img src={user?.photoURL} alt={user?.displayName} className="rounded-full" /></Link>
                            <button className="btn text-white bg-[#1E293B]/90 rounded-lg" onClick={signOutUser}>Logout</button>
                        </div>
                    ):(
                        <div className="btn text-white bg-[#1E293B]/90 rounded-full">
                            <Link to={'/auth'}>Login</Link>
                        </div>
                    )
                }
            </div>
        </div>
        {/* mobile dropdown */}
        
    </>
  );
};

export default Navbar;