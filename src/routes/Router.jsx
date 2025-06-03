import Home from "../HomePage/Home";

import { createBrowserRouter } from "react-router-dom";


const donationLoad = ({params}) =>fetch('http://localhost:3100/donations');



const router = createBrowserRouter([
    {
        path:'/',
        element:<Home></Home>,
    }
])

export default router;