import { useEffect } from "react";
import { getQuanliDatVe } from "../service/user.product1";
import { useParams } from "react-router";
import { useState } from "react";
import { manageLocalStorage1 } from "../common/utils/local-storage1";
export default function DatVe(){
    const param = useParams();
    const [data,setData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    useEffect(()=>{
        if(param.maLichChieu){
            getQuanliDatVe(param.maLichChieu).then((resp)=>{
                const content = resp.data.content;
                console.log("resp", resp.data.content);
                // lay dang sach da dat localstorage
               const veDaDat = manageLocalStorage1.get("veDaDat")||[];
               // cap nhat trang thai DaDat cho danh sach ghe

               const newDanhSachGhe = content.danhSachGhe.map((ghe) => 
                veDaDat.some((seller) => seller.maGhe === ghe.maGhe)
                    ? { ...ghe, daDat: true }
                    : ghe
            );

               setData({...content, danhSachGhe: newDanhSachGhe});

            })
        }
        
        
    },[param.maLichChieu]);

    if(!data) return<div className="text-center text-2xl font-bold">LOADING...</div>
    
    const {danhSachGhe,thongTinPhim}= data;

    // xu li ghe chon

    const handleSelectSeat = (ghe)=>{
        if(ghe.daDat) return ;
        setSelectedSeats((prev)=>{
            return prev.some((seller)=> seller.maGhe === ghe.maGhe)
                ? prev.filter((seller)=> seller.maGhe !== ghe.maGhe)
                : [...prev,ghe];
        })
    }
    const getSeatType =(index)=>{
        if(index>=100&& index<=160  ) return "VIP";

        return  "THUONG";
    }
    const getSeatClass =(ghe, index)=>{
        if(ghe.daDat) return "bg-gray-400  cursor-not-allowed text-white";
        if(selectedSeats.some(seller=> seller.maGhe === ghe.maGhe)) return "bg-green-500 text-white";
        if(getSeatType(index) === "VIP") return "bg-yellow-500 text-white";

        return "bg-white text-black";
    }
    const seatsPerRow  = 16;

    const rows =[];
    for(let i =0 ;i<danhSachGhe.length ;i+=seatsPerRow){
        rows.push(danhSachGhe.slice(i,i+seatsPerRow));
    }
    const total = selectedSeats.reduce((sum,ghe)=>{
        const index =danhSachGhe.findIndex((seller)=> seller.maGhe === ghe.maGhe);
        if(getSeatType(index) === "VIP") return sum +96000;
        return sum +60000;
    },0)

    const handleDatVe = ()=>{
         const oldVe = manageLocalStorage1.get("veDaDat")||[];
         const newVe = [...oldVe, ...selectedSeats.filter(seller=>!oldVe.some(sel=>sel.maGhe === seller.maGhe))];
         manageLocalStorage1.set("veDaDat", newVe);

         // cap nhap trang thai dã dat ghe vua chon
         const  newDanhSachGhe = danhSachGhe.map((ghe)=>
            selectedSeats.some((seller)=> seller.maGhe === ghe.maGhe)?{...ghe,daDat:true}:ghe
         );
         setData({...data, danhSachGhe: newDanhSachGhe});
         setSelectedSeats([]);
         alert("Đặt vé thành công");
    }   
    

    

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center py-8">
                <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl flex flex-col md:flex-row p-8 gap-8 w-full max-w-5xl">
                    {/* Sơ đồ ghế */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">{thongTinPhim.tenPhim}</h2>
                        <div className="mb-2 text-sm">
                            <span className="font-semibold">Ngày chiếu:</span> {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
                        </div>
                        <div className="mb-2 text-sm">
                            <span className="font-semibold">Rạp:</span> {thongTinPhim.tenRap} - {thongTinPhim.diaChi}
                        </div>
                        <div className="bg-gray-200 rounded-lg p-4 mt-4">
                            <div className="mb-2 text-center font-semibold">Màn hình</div>
                            <div className="h-2 bg-gray-400 rounded mb-4"></div>
                            <div className="flex flex-col gap-1">
                                {rows.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex gap-2 justify-center">
                                        {row.map((ghe, colIndex) => {
                                            const idx = rowIndex * seatsPerRow + colIndex;
                                            return (
                                                <button
                                                    key={ghe.maGhe}
                                                    className={`w-8 h-8 rounded border border-gray-300 text-xs font-bold ${getSeatClass(ghe, idx)}`}
                                                    disabled={ghe.daDat}
                                                    onClick={() => handleSelectSeat(ghe)}
                                                    title={ghe.tenGhe}
                                                >
                                                    {ghe.tenGhe}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                            {/* Chú thích màu ghế */}
                            <div className="flex gap-4 mt-4 text-xs">
                                <div><span className="inline-block w-4 h-4 bg-white border mr-1"></span> Ghế thường (80.000đ)</div>
                                <div><span className="inline-block w-4 h-4 bg-yellow-400 border mr-1"></span> Ghế VIP (96.000đ)</div>
                                <div><span className="inline-block w-4 h-4 bg-green-500 mr-1"></span> Đang chọn</div>
                                <div><span className="inline-block w-4 h-4 bg-gray-400 mr-1"></span> Đã đặt</div>
                            </div>
                        </div>
                    </div>
                    {/* Thông tin đặt vé */}
                    <div className="w-full md:w-80 bg-gray-100 rounded-lg p-6 flex flex-col">
                        <h3 className="text-lg font-bold mb-4">Thông tin vé</h3>
                        <div className="mb-2">
                            <span className="font-semibold">Ghế đã chọn:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {selectedSeats.length === 0
                                    ? <span className="text-gray-500">Chưa chọn</span>
                                    : selectedSeats.map((ghe) => (
                                        <span key={ghe.maGhe} className="bg-green-500 text-white px-2 py-1 rounded text-xs">{ghe.tenGhe}</span>
                                    ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Tổng tiền:</span>
                            <span className="ml-2 text-red-600 font-bold">{total.toLocaleString()} đ</span>
                        </div>
                        <button
                            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition"
                            disabled={selectedSeats.length === 0}
                            onClick={handleDatVe}
                        >
                            ĐẶT VÉ
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}