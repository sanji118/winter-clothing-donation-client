import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../NotFoundPage";
import AuthPage from "../auth/AuthPage";





export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element:<HomePage/>
            }
        ]
    },
    {
        path: '/auth/',
        element: <AuthPage/>
    }
])

