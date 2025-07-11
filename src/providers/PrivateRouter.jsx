import { Navigate } from "react-router-dom";
import useAuth from "../services/authService"


const PrivateRouter = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){return <span className="loading loading-spinner loading-md"></span>}

    if(!user){
        return <Navigate to={'/auth/login'} />
    }
  return children;
}

export default PrivateRouter;