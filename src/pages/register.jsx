import { Input } from "../components/input";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import axios from "axios";
export default function Register (){
   const navigate = useNavigate();

   const formik = useFormik({
         initialValues: {
              taikhoan:"",
              password: "",
              email: "",
              phone: "",
              manhom: "GP01", // Replace with a valid group code as required by the API
              name: "",
         },
         onSubmit(values){
                console.log(values)
                axios.post("http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy", {
                    taiKhoan: values.taikhoan,
                    matKhau: values.password,
                    email: values.email,
                    soDt: values.phone,
                    maNhom: values.manhom,
                    hoTen: values.name,
                }).then((response)=>{
                    console.log("registration successfull",response.data);
                    navigate("/login");
                }).catch((error) => {
                    if (error.response) {
                        console.log("Error response:", error.response.data);
                    } else if (error.request) {
                        console.log("No response received:", error.request);
                    } else {
                        console.log("Error setting up request:", error.message);
                    }
                });
                
         },
         validate(){
            
         }
    }
)

    return (
        <> 
            <div className="flex flex-col justify-items-center items-center ">
            <h1 className="text-[25px]">ĐĂNG KÝ</h1>
            <form onSubmit= {formik.handleSubmit}    >
                <div  className="mb-4">
                <Input  
                {...formik.getFieldProps(" taiKhoan")}
                placeholder="Tài Khoản"
                required
               
                ></Input>
                </div>
                <div className="mb-4">
                <Input 
                 {...formik.getFieldProps("matKhau")}
                type="password"
                placeholder="Mật Khẩu"
                required
                className="mb-4"></Input>
                </div>
                
               <div className="mb-4">
               <Input  
                {...formik.getFieldProps("maNhom")}
                
                placeholder="Nhập Mã Nhóm"
                required
                ></Input>
               </div>
               

               <div className="mb-4">
               <Input 
               {...formik.getFieldProps("hoTen")}
                placeholder="Họ Tên"
                required
                ></Input>
                </div> 
               
               <div className="mb-4">
               <Input 
               {...formik.getFieldProps("email")}
                type="email"
                placeholder="Email"
                required
                className="mb-4"></Input>
               </div>
              
                 
                <div className="mb-4">
                <Input 
                {...formik.getFieldProps("soDt")}
                placeholder="Số Điện Thoại"
                required
                className="mb-4"></Input>
                </div>

                <div className="flex justify-around mb-4">
                    <button type="submit" className="border  py-3 px-4 rounded">Đăng Ký</button>
                    <button onClick={() => navigate('/login')} className="border  py-3 px-4 rounded">Đăng Nhập</button>
                </div>
            </form>

            </div>
          

           
           
        </>
    )
}