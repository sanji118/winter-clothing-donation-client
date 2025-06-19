import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import HomePage from "../pages/HomePage";





export const router = createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout/>,
        children:[
            {
                index: true,
                element:<HomePage/>
            }
        ]
    }
])

