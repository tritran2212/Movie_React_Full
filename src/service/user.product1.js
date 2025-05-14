import { axiosWithout1 } from "./config1";
export function getAllProcductsAPI1(maNhom){
    return axiosWithout1(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`)
}

export function getMaPhimAPI(maPhim){

    return axiosWithout1(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
}

export  function getDanhSachBanner(){
    return axiosWithout1("/api/QuanLyPhim/LayDanhSachBanner");
}

export  function getLayThongTinHeThongRap(){

    return axiosWithout1("/api/QuanLyRap/LayThongTinHeThongRap");
}

export function getThongTinLichChieuHeThongRap(maNhom){

    return axiosWithout1(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`);
}
export function getQuanliDatVe(maLichChieu){

    return  axiosWithout1(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
}