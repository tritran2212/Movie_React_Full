import { Input } from "../components/input";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import axios from "axios";
import { z } from "zod";

const RegisterSchema = z.object({
    taiKhoan: z.string().min(4, "Tài khoản phải có ít nhất 4 ký tự").nonempty("Tài khoản là bắt buộc"),
    matKhau: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").nonempty("Mật khẩu là bắt buộc"),
    email: z.string().email("Email không hợp lệ").nonempty("Email là bắt buộc"),
    soDt: z.string().regex(/^\d{10}$/, "Số điện thoại phải có 10 chữ số").nonempty("Số điện thoại là bắt buộc"),
    maNhom: z.string().nonempty("Mã nhóm là bắt buộc"),
    hoTen: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự").nonempty("Họ tên là bắt buộc"),
}).superRefine((val, ctx) => {
    if (val.password && val.password.toLowerCase().includes("password")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu không được chứa từ 'password'",
            path: ["password"],
        });
    }
});

export function ErrorMessage({ mess }) {
    return (
        <div className="text-red-500 text-sm mt-1">
            {mess}
        </div>
    );
}

export default function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "",
            hoTen: "",
        },
        onSubmit(values) {
            console.log(values);
            axios.post("http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy", {
                taiKhoan: values.taiKhoan,
                matKhau: values.matKhau,
                email: values.email,
                soDt: values.soDt,
                maNhom: values.maNhom,
                hoTen: values.hoTen,
            }).then((response) => {
                console.log("registration successful", response.data);
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
                const errors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                return errors;
            }
            return {};
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Ký</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("taiKhoan")}
                            placeholder="Tài Khoản"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        <ErrorMessage mess={formik.touched.taiKhoan && formik.errors.taiKhoan} />
                    </div>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("matKhau")}
                            type="password"
                            placeholder="Mật Khẩu"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        <ErrorMessage mess={formik.touched.matKhau && formik.errors.matKhau} />
                    </div>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("maNhom")}
                            placeholder="Nhập Mã Nhóm"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        <ErrorMessage mess={formik.touched.maNhom && formik.errors.maNhom} />
                    </div>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("hoTen")}
                            placeholder="Họ Tên"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        <ErrorMessage mess={formik.touched.hoTen && formik.errors.hoTen} />
                    </div>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("email")}
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        <ErrorMessage mess={formik.touched.email && formik.errors.email} />
                    </div>
                    <div className="mb-4">
                        <Input
                            {...formik.getFieldProps("soDt")}
                            placeholder="Số Điện Thoại"
                            required
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        <ErrorMessage mess={formik.touched.soDt && formik.errors.soDt} />
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            Đăng Ký
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                        >
                            Đăng Nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
