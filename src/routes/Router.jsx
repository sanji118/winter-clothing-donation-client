import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import HomePage from "../pages/HomePage";
import Login from "../auth/Login";
import Register from "../auth/Register";
import NotFoundPage from "../NotFoundPage";





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
        path: '/auth/login',
        element: <Login/>
    },
    {
        path: '/auth/register',
        element: <Register/>
    }
])

