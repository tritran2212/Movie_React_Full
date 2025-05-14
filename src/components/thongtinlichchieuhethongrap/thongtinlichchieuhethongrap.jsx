import { getThongTinLichChieuHeThongRap } from "../../service/user.product1";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function ThongTinHeThongRap() {
    const defaultGroup = "GP01";
    const [lichChieu, setLichChieu] = useState([]);

    useEffect(() => {
        getThongTinLichChieuHeThongRap(defaultGroup).then((res) => {
            console.log("LẤY THÔNG TIN LICH CHIEU HE THONG RAP", res.data.content);
            setLichChieu(res.data.content);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        LỊCH CHIẾU CHI TIẾT
                    </span>
                </h1>
                
                <div className="space-y-8">
                    {lichChieu.map((heThongRap) => (
                        <div key={heThongRap.maHeThongRap} 
                            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                            
                            {/* Theater System Header */}
                            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={heThongRap.logo}
                                        alt={heThongRap.tenHeThongRap}
                                        className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                                    />
                                    <h2 className="text-2xl font-bold text-white">{heThongRap.tenHeThongRap}</h2>
                                </div>
                            </div>

                            {/* Movies Section */}
                            <div className="p-6">
                                {heThongRap.lstCumRap.map((cumRap) => (
                                    <div key={cumRap.maCumRap} className="mb-8 last:mb-0">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                            {cumRap.tenCumRap}
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {cumRap.danhSachPhim.slice(0, 3).map((phim) => (
                                                <Link 
                                                    to={`/cardDetail/${phim.maPhim}`}
                                                    key={phim.maPhim}
                                                    className="block transform transition-all duration-300 hover:scale-105"
                                                >
                                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl">
                                                        <div className="relative">
                                                            <img
                                                                src={phim.hinhAnh}
                                                                alt={phim.tenPhim}
                                                                className="w-full h-[300px] object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                                {phim.tenPhim}
                                                            </h4>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2">
                                                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                                    </svg>
                                                                    <span className="text-gray-700 font-medium">{phim.danhGia}</span>
                                                                </div>
                                                                <span className="text-sm text-gray-500">
                                                                    {new Date(phim.ngayKhoiChieu).toLocaleDateString('vi-VN')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}