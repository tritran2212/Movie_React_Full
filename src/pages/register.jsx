import { Input } from "../components/input";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import axios from "axios";
import {z} from "zod";

const RegisterSchema = z.object({
    taikhoan: z.string().min(4, "Tài khoản phải có ít nhất 4 ký tự").nonempty("Tài khoản là bắt buộc"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").nonempty("Mật khẩu là bắt buộc"),
    email: z.string().email("Email không hợp lệ").nonempty("Email là bắt buộc"),
    phone: z.string().regex(/^\d{10}$/, "Số điện thoại phải có 10 chữ số").nonempty("Số điện thoại là bắt buộc"),
    manhom: z.string().nonempty("Mã nhóm là bắt buộc"),
    name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự").nonempty("Họ tên là bắt buộc"),
}).superRefine((val, ctx) => {
    if (val.password && val.password.toLowerCase().includes("password")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu không được chứa từ 'password'",
            path: ["password"],
        });
    }
});

export  function ErrorMessage({mess}){
    return(
        <>
        <div className="text-red-500 text-sm">
            {mess}
        </div>
    </>
    )
}

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
                    taikhoan: values.taikhoan,
                    password: values.password,
                    email: values.email,
                    phone: values.phone,
                    manhom: values.manhom,
                    name: values.name,
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
         validate(values) {
            try {
                RegisterSchema.parse(values);
            } catch (error) {
                console.log(error)
                const errors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});

                return errors;
            }

            return {}
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
                {...formik.getFieldProps("taikhoan")}
                placeholder="Tài Khoản"
                required
               
                ></Input>
                 <ErrorMessage
                        message={formik.touched.taikhoan && formik.errors.taikhoan}
                        />
                </div>
                <div className="mb-4">
                <Input 
                 {...formik.getFieldProps("password")}
                type="password"
                placeholder="Mật Khẩu"
                required
                className="mb-4"></Input>
                 <ErrorMessage
                            message={formik.touched.password && formik.errors.password}
                        />
                </div>
                
               <div className="mb-4">
               <Input  
                {...formik.getFieldProps("manhom")}
                
                placeholder="Nhập Mã Nhóm"
                required
                ></Input>
                 <ErrorMessage
                            message={formik.touched.manhom && formik.errors.manhom}
                        />
               </div>
               

               <div className="mb-4">
               <Input 
               {...formik.getFieldProps("name")}
                placeholder="Họ Tên"
                required
                ></Input>
                 <ErrorMessage
                            message={formik.touched.name && formik.errors.name}
                        />
                </div> 
               
               <div className="mb-4">
               <Input 
               {...formik.getFieldProps("email")}
                type="email"
                placeholder="Email"
                required
                className="mb-4"></Input>
                 <ErrorMessage
                            message={formik.touched.email && formik.errors.email}
                        />
               </div>
              
                 
                <div className="mb-4">
                <Input 
                {...formik.getFieldProps("phone")}
                placeholder="Số Điện Thoại"
                required
                className="mb-4"></Input>
                 <ErrorMessage
                            message={formik.touched.phone && formik.errors.phone}
                        />
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