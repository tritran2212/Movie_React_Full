import { axiosWithout1 } from "./config1";

export function getAllProcductsAPI1(maNhom){
    return axiosWithout1(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`)
}