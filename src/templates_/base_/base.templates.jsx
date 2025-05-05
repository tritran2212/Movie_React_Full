
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Outlet } from "react-router";

export function BaseTemplate(){
    return (
        <>
            <Header/>

            <Outlet/>
           
            <Footer/>
        </>
    )
}