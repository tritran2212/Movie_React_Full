

import { useSelector } from "react-redux";
import {Link} from "react-router";
import { Avatar } from "../../../components/avatar/avatar";
import {Menu} from "./menu"
import { useNavigate } from "react-router";
function LogoIcon(){

    return (
        <>
            <img src="/logo.png" className="w-[116px] h-[40px] "/>
        </>
    )
}

export  function Header(){

    
    // cách lấy dữ liệu người dùng  từ reducer trong redux store
    const user = useSelector(
        (store)=>{
            return store.userReducer.user;
        }
    )
    const navigate = useNavigate();
    
    console.log("uerrr", user)
     
    return (
        
        <>
            <header className="h-[50px]  px-6 py-2 flex justify-between  items-center" >
                <div>
                    <LogoIcon/>
                </div>

                <div>
                    <ul className="flex gap-4 justify-end items-center text-blue-500">
                        <li className="border-r-2 pr-3 text-decoration: underline"><a href="#" className="text-decoration: underline; "onClick={()=>{
                                        navigate("/")
                                       }}>Trang Chủ</a></li>
                        <li className="border-r-2 pr-3 text-decoration: underline" ><a href="#" >Liên Hệ </a></li>
                        <li className="border-r-2 pr-3 text-decoration: underline"><a href="#">Tin Tức </a></li>
                        <li  className="text-decoration: underline"><a href="#" >Ứng Dụng</a></li>
                    </ul>

                </div>
                <div>
               
                {
                    user!== null ?(
                        <div className="flex gap-2 items-center">

                            <Menu
                                list={[
                                    {id:1,child:<button 
                                       onClick={()=>{
                                        navigate("/login")
                                       }}
                                        >Logout</button>}
                                    ,{
                                        id:2,child:
                                        <Link to="/change-password">Change Password</Link>
                                    }
                                ]}
                            >
                                <p>Hello,{user.taiKhoan}</p>
                                <Avatar>T</Avatar>
                            </Menu>
                                
                               
                        </div>
                    ):(<div>
                        <Link to="/login" className  ="border border-white px-2 py-1">Login</Link>
                        <Link to="/sign-up" className  ="border border-white px-2 py-1 border-1-0" >Register</Link>
                    </div>
                    )
                 
                }
                </div>
            </header>
        </>
    )
}