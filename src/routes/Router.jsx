import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import AuthPage from "../auth/AuthPage";
import HomePage from '../pages/HomePage/HomePage';
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import Dashboard from "../user/Dashboard";
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
                element: <DonateNow />
            },
            {
                path: '/payment/payment-success',
                element: <PaymentSuccessPage/>
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
                element: <BecomeVolunteer />
            },
            {
                path: '/volunteer',
                element: <VolunteerPage />
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard /></PrivateRouter>
            },
            {
                path: '/profile',
                element: <Profile />
            },
        ]
    },
    {
        path: '/auth/',
        element: <AuthPage />
    }
]);