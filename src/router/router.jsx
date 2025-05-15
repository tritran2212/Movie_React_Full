import { createBrowserRouter } from "react-router" ;
import { home } from "../pages/home";
import { BaseTemplate } from "../templates_/base_/base.templates"
;
import{lazy, Suspense} from "react";
// lazy load công dụng khi nào gọi mới download về
const  Login = lazy(()=>import("../pages/login"));
const  Register = lazy(()=>import("../pages/register"));
const CardDetail = lazy(()=>import ("../pages/cardDetail"))
const  DatVe = lazy(()=>import ("../pages/datve"));
const  ListFilmAdmin= lazy(()=>import("../pages/Admin/listFilmAdmin"))
const  Profile = lazy(()=>import("../pages/Profile"))

export const router = createBrowserRouter([

    {
        Component:BaseTemplate,
        children:[
            {
                path:"/",
                Component:home,
            },
            {
                path:"/cardDetail/:maPhim",
                element:<CardDetail/>

            },
            {

                path:"/datve/:maLichChieu",
                element:<DatVe/>
            },
            {
                path:"/admin",
                element:<ListFilmAdmin/>
            },
            {
                path:"/profile",
                element:<Profile/>
            }
           
          
            
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


