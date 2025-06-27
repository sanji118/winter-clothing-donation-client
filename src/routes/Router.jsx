import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import NotFoundPage from "../NotFoundPage";
import AuthPage from "../auth/AuthPage";
import HomePage from '../pages/HomePage/HomePage'





export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element:<HomePage />
            }
        ]
    },
    {
        path: '/auth/',
        element: <AuthPage/>
    }
])

