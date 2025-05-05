import { axiosWithAuth1 } from "./config1";

export function getProfieAPI1(){
    return axiosWithAuth1("/api/QuanLyNguoiDung/ThongTinTaiKhoan",{
        method:"post",
    })
}