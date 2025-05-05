import { createBrowserRouter } from "react-router" ;
import { home } from "../pages/home";
import {CardDetail} from "../pages/cardDetail";
import { BaseTemplate } from "../templates_/base_/base.templates"
;
import{lazy, Suspense} from "react";
// lazy load công dụng khi nào gọi mới download về
const  Login = lazy(()=>import("../pages/login"));
const  Register = lazy(()=>import("../pages/register"));


export const router = createBrowserRouter([

    {
        Component:BaseTemplate,
        children:[
            {
                path:"/",
                Component:home,
            },
            {
                path:"/card",
                Component:CardDetail,

            },
            
        ]
    },
    {
        path:"login",
        // Component: Login,
        element: (
            <Suspense fallback={<div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
            </div>}>
            <Login />
            </Suspense>
        )
     },
   
    {
        path: "register",
      //  Component:Register,
         element:(<Register/>)
    }

])


