import { useEffect } from "react";
import { useState } from "react";
import { ProductCard1 } from "../../components/product-card1/product-card1";
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
        <>
            <div className="flex justify-center gap-4 mb-6">
                {/* <button className="px-4 py-2 bg-teal-300 text-white rounded hover:bg-teal-400"
                    onClick={() => { handleRenderProductByGroup1("GP01") }}>Get GP01</button>
                <button
                    className="px-4 py-2 bg-teal-300 text-white rounded hover:bg-teal-400"
                    onClick={() => { handleRenderProductByGroup("GP02") }}
                >
                    Get GP02
                </button> */}
            </div>
            <div className="grid grid-cols-5 gap-4" style={{ width: "80%", margin: "auto" }}>
                {
                    product.map((p) => {
                        return (
                            <div key={p.maNhom} className="w-full text-black">
                                <ProductCard1
                                    hinhAnh={{ hinhAnh: p.hinhAnh }}
                                    moTa={p.moTa}
                                    danhGia={p.danhGia}
                                    tenPhim={p.tenPhim}
                                    ngayKhoiChieu={p.ngayKhoiChieu}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}