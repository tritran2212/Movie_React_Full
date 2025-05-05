import { Input } from "../components/input";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import axios from "axios";
import { z } from "zod";
import { manageLocalStorage1 } from "../common/utils/local-storage1.js";
import { KEY_ACCESS_TOKEN1 } from "../common/constanst/index.js";
import { getProfieAPI1 } from "../service/user.service1.js";

import {useDispatch}  from "react-redux";
import {setUser} from "../store/user.slice1.jsx";
const LoginSchema = z.object({
    taiKhoan: z.string().min(4, "Tài khoản phải có ít nhất 4 ký tự").nonempty("Tài khoản là bắt buộc"),
    matKhau: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").nonempty("Mật khẩu là bắt buộc"),
});

export function ErrorMessage({ mess }) {
    return (
        <>
            {mess && <div className="text-red-500 text-sm mt-1">{mess}</div>}
        </>
    );
}

export default function Login() {
    const navigate = useNavigate();

    const  dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        onSubmit(values) {
            axios
                .post("http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap", {
                    taiKhoan: values.taiKhoan,
                    matKhau: values.matKhau,
                })
                .then((response) => {
                 //   console.log("registration successful", response.data);
                    navigate("/");
                    // 1 luu token vào local storage 
                manageLocalStorage1.set(KEY_ACCESS_TOKEN1,response.data.content.accessToken);
                    // lưu token vào redux
                getProfieAPI1().then((res)=>{
                    console.log("thanh cong ", res.data)

                    dispatch(setUser(res.data.content))
                })
                
                // console.log("Token", response.data.content.accessToken); 
                // console.log("Token", response.data.content); 
                // console.log("Token", response.data); 
            })
                .catch((error) => {
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
                LoginSchema.parse(values);
            } catch (error) {
                const errors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                return errors;
            }
            return {};
        },
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">ĐĂNG NHẬP</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("taiKhoan")}
                            placeholder="Tài Khoản"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage mess={formik.touched.taiKhoan && formik.errors.taiKhoan} />
                    </div>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("matKhau")}
                            type="password"
                            placeholder="Mật Khẩu"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage mess={formik.touched.matKhau && formik.errors.matKhau} />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Đăng Nhập
                        </button>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="text-blue-500 hover:underline"
                        >
                            Chưa có tài khoản? Đăng Ký
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
