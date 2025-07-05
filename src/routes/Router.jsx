import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import NotFoundPage from "../NotFoundPage";
import AuthPage from "../auth/AuthPage";
import HomePage from '../pages/HomePage/HomePage'
import DonationCompaigns from "../pages/DonationCompaigns/DonationCompaigns";
import Dashboard from "../user/Dashboard";
import HowToHelp from "../pages/HowToHelp/HowToHelp";
import Profile from "../auth/Profile";
import PrivateRouter from "../providers/PrivateRouter";





export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element:<HomePage />
            },
            {
                path: '/campaigns',
                element: <DonationCompaigns/>
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard/></PrivateRouter>
            },
            {
                path: 'how-to-help',
                element: <HowToHelp/>
            },
            {
                path: 'profile',
                element: <Profile/>
            }
        ]
    },
    {
        path: '/auth/',
        element: <AuthPage/>
    }
])

