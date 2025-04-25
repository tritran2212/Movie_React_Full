import { createBrowserRouter } from "react-router" ;
import { home } from "../pages/home";

import{lazy} from "react";

const  Login = lazy(()=>import("../pages/login"));
const  Register = lazy(()=>import("../pages/register"));


export const router = createBrowserRouter([
    {
        path:"",
        Component:home,
    },
    {
        path:"login",
         Component:Login,
         element:(<Login/>)
    },
    {
        path:"register",
        Component:Register,
         element:(<Register/>)
    }

])


