import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import AuthPage from "../auth/AuthPage";
import HomePage from '../pages/HomePage/HomePage';
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import HowToHelp from "../pages/HowToHelp/HowToHelp";
import Profile from "../auth/Profile";
import PrivateRouter from "../providers/PrivateRouter";
import AboutUs from "../pages/AboutUs/AboutUs";
import TeamPage from "../pages/AboutUs/TeamPage";
import DonateNow from "../pages/DonateNow/DonateNow";
import Gallery from "../pages/Gallery/Gallery";
import TestimonialsPage from "../pages/TestimonialsPage/TestimonialsPage";
import Contact from "../pages/Contact/Contact";
import Faq from "../pages/Faq/Faq";
import BecomeVolunteer from "../pages/BecomeVolunteer/BecomeVolunteer";
import VolunteerPage from "../pages/VolunteerPage/VolunteerPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import DonationDetails from "../components/Donations/DonationDetails/DonationDetails";
import PaymentSuccessPage from "../components/Donations/PaymentSuccessPage";
import DashboardLayout from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/team',
                element: <TeamPage />
            },
            {
                path: '/campaigns',
                element: <DonationCampaigns />
            },
            {
                path: '/campaigns/slug/:slug',
                element: <DonationDetails/>
            },
            {
                path: '/donate',
                element: <PrivateRouter><DonateNow /></PrivateRouter>
            },
            {
                path: '/payment/payment-success',
                element: <PrivateRouter><PaymentSuccessPage/></PrivateRouter>
            },
            {
                path: '/gallery',
                element: <Gallery />
            },
            {
                path: '/testimonials',
                element: <TestimonialsPage />
            },
            {
                path: '/blogs',
                element: <BlogPage />
            },
            {
                path: '/blogs/:id',
                element: <BlogPage />,
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/faqs',
                element: <Faq />
            },
            {
                path: '/how-to-help',
                element: <HowToHelp />
            },
            {
                path: '/become-volunteer',
                element: <PrivateRouter><BecomeVolunteer /></PrivateRouter>
            },
            {
                path: '/volunteer',
                element: <PrivateRouter><VolunteerPage /></PrivateRouter> 
            },
            
            {
                path: '/profile',
                element: <PrivateRouter><Profile /></PrivateRouter>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>
    },
    {
        path: '/auth/',
        element: <AuthPage />
    }
]);