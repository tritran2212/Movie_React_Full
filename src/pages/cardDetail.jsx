import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMaPhimAPI } from "../service/user.product1";
import { manageLocalStorage1 } from "../common/utils/index1";
import  {KEY_ACCESS_TOKEN1} from "../common/constanst"
import { useNavigate } from "react-router";


export default function CardDetail() {
    const param = useParams();
    const [product, setListProducts] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {

        const token = manageLocalStorage1.get(KEY_ACCESS_TOKEN1);
        if (!token) {
            navigate("/login");
            return;
        }
        if (param.maPhim) {
            getMaPhimAPI(param.maPhim).then((res) => {
                console.log("resdatacontent", res.data.content);
                setListProducts(res.data.content);
            })
        }
    }, [])
    

    if (!product) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a223f] to-[#2d3250] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row bg-[#181c2f] rounded-2xl shadow-2xl overflow-hidden">
                {/* Poster */}
                <div className="md:w-1/3 flex items-center justify-center bg-[#23284a]">
                    <img
                        src={product.hinhAnh}
                        alt={product.tenPhim}
                        className="w-full h-[420px] object-cover rounded-xl m-6 shadow-lg"
                    />
                </div>
                {/* Thông tin */}
                <div className="md:w-2/3 p-8 text-white relative">
                    <h1 className="text-4xl font-bold mb-4">{product.tenPhim}</h1>
                    <div className="mb-4">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold mr-2">
                            C18 - PHIM DÀNH CHO KHÁN GIẢ TỪ 18 TUỔI TRỞ LÊN
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Ngày khởi chiếu: </span>
                        {new Date(product.ngayKhoiChieu).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Đánh giá: </span>
                        <span className="text-yellow-400">{product.danhGia} ★</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Mô tả: </span>
                        {product.moTa}
                    </div>
                    {/* Thêm các thông tin khác nếu có */}
                    <div className="flex gap-4 mt-8">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold transition">
                            XEM TRAILER
                        </button>
                        <button onClick={() => navigate(`/datve/${product.maPhim}`)}
                          className=" bg-[#00c853] hover:bg-[#009624] text-white px-6 py-2 rounded font-bold transition">
                            MUA VÉ NGAY
                        </button>
                    </div>
                    {/* Hiệu ứng nền sao có thể dùng absolute + bg */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "url('https://www.transparenttextures.com/patterns/stardust.png') repeat"
                    }} />
                </div>
            </div>
        </div>
    )
}