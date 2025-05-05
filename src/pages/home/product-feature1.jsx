import { useEffect } from "react";
import { useParams } from "react-router";
import {getAllProcductsAPI1} from "../../service/user.product1"
export  function ProductFeature1(){

    const param = useParams();
    console.log("param ", param);
    useEffect(() => {
        if (param.maNhom) {
            getAllProcductsAPI1(param.maNhom).then((res) => {
                console.log("sdfdsfdsf",res.data.content);
            });
        }
    }, []);

    return (
        <>
            <h1>Card</h1>    
    </>
    )
}