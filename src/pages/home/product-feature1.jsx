import { useEffect } from "react";
import { useState } from "react";
import { ProductCard1 } from "../../components/product-card1/product-card1";
import { Link } from "react-router";
import {getAllProcductsAPI1} from "../../service/user.product1"

export function ProductFeature1() {
    const [product, setProdlist] = useState([]);
    const defaultGroup = "GP01";
    
    useEffect(() => {
        getAllProcductsAPI1(defaultGroup).then((res) => {
            console.log("Dữ liệu trả về", res.data.content);
            setProdlist(res.data.content);
        });
    }, []); 

    // const handleRenderProductByGroup = (group) => {
    //     getAllProcductsAPI1(group).then((res) => {
    //         console.log("Phim ", res.data.content);
    //         setProdlist(res.data.content);
    //     });
    // };
    // const handleRenderProductByGroup1 = (group) => {
    //     getAllProcductsAPI1(group).then((res) => {
    //         console.log("sdfdsfdsf", res.data.content);
    //         setProdlist(res.data.content);
    //     });
    // };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-12 relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Phim Đang Chiếu
                    </span>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {product.map((p) => (
                        <Link 
                            to={`/cardDetail/${p.maPhim}`}
                            key={p.maNhom}
                            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full group"
                        >
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[450px] w-full flex flex-col relative">
                                <div className="h-[300px] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                    <ProductCard1
                                        hinhAnh={{ hinhAnh: p.hinhAnh }}
                                        moTa={p.moTa}
                                        danhGia={p.danhGia}
                                        tenPhim={p.tenPhim}
                                        ngayKhoiChieu={p.ngayKhoiChieu}
                                    />
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                            {p.tenPhim}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                            {p.moTa}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                            {p.danhGia}
                                        </span>
                                        <span className="text-gray-400">
                                            {new Date(p.ngayKhoiChieu).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}