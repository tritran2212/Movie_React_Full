import {Hethongrap} from"../components/hethongrap/hethongrap"
import { ProductFeature1 } from "./home/product-feature1"
import { Hero } from "../components/carousel/Hero"
import { ThongTinHeThongRap } from "../components/thongtinlichchieuhethongrap/thongtinlichchieuhethongrap"
import { useNavigate } from "react-router"
// import { manageLocalStorage1 } from "../common/utils/index1"
// import { KEY_ACCESS_TOKEN1 } from "../common/constanst"
export function home(){

    // const navigate = useNavigate();;
    // const  token  = manageLocalStorage1.get(KEY_ACCESS_TOKEN1);

    // if(!token){
    //     navigate("/login");
    //     return ;

    // }

    return (

      

        <>
            <Hero/>
            <ProductFeature1/>

            <div className="flex flex-col ">
            <Hethongrap/>
            <ThongTinHeThongRap/>
            </div>
            
            

        </>
    )
}