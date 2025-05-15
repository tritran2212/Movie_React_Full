import { axiosWithAuth1 } from "./config1";

export function getProfieAPI1(){
    return axiosWithAuth1("/api/QuanLyNguoiDung/ThongTinTaiKhoan",{
        method:"post",
    })
}

export function putQuanliThongTinNguoiDung(data, token) {
    return axiosWithout1(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json"
        },
        data
    });
}