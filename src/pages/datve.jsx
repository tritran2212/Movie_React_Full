import { useEffect, useState } from "react";
import { getQuanliDatVe } from "../service/user.product1";
import { useParams } from "react-router";
import { manageLocalStorage1 } from "../common/utils/index1";

export default function DatVe() {
  const param = useParams();
  const [data, setData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (param.maLichChieu) {
      getQuanliDatVe(param.maLichChieu).then((res) => {
        let content = res.data.content;
        console.log("content ", res.data.content);
        // Lấy danh sách vé đã đặt từ localStorage
        const veDaDat = manageLocalStorage1.get('veDaDat') || [];
        // Cập nhật trạng thái daDat cho các ghế đã đặt (theo localStorage)
        const newDanhSachGhe = content.danhSachGhe.map(ghe =>
          veDaDat.some(sel => sel.maGhe === ghe.maGhe)
            ? { ...ghe, daDat: true }
            : ghe
        );
        setData({ ...content, danhSachGhe: newDanhSachGhe });
      });
    }
  }, [param.maLichChieu]);

  if (!data) return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  const { thongTinPhim, danhSachGhe } = data;

  // Xử lý chọn ghế
  const handleSelectSeat = (ghe) => {
    if (ghe.daDat) return; // Ghế đã đặt không chọn được
    setSelectedSeats((prev) =>
      prev.some((item) => item.maGhe === ghe.maGhe)
        ? prev.filter((item) => item.maGhe !== ghe.maGhe)
        : [...prev, ghe]
    );
  };

  // Hàm xác định loại ghế dựa vào chỉ số mảng
  const getSeatType = (index) => {
    if (index >= 100 && index <= 160) return "VIP";
    return "THUONG";
  };

  // Hàm xác định class cho ghế
  const getSeatClass = (ghe, idx) => {
    if (ghe.daDat) return "bg-gray-400 cursor-not-allowed text-white"; // Đã đặt
    if (selectedSeats.some((item) => item.maGhe === ghe.maGhe)) return "bg-green-500 text-white"; // Đang chọn
    if (getSeatType(idx) === "VIP") return "bg-yellow-400 text-black hover:bg-yellow-300"; // VIP
    return "bg-white hover:bg-green-200 text-black"; // Thường
  };

  // Số ghế trên 1 hàng (ví dụ 16)
  const seatsPerRow = 16;
  const rows = [];
  for (let i = 0; i < danhSachGhe.length; i += seatsPerRow) {
    rows.push(danhSachGhe.slice(i, i + seatsPerRow));
  }

  // Tổng tiền dựa vào loại ghế
  const total = selectedSeats.reduce((sum, ghe) => {
    const idx = danhSachGhe.findIndex(g => g.maGhe === ghe.maGhe);
    if (getSeatType(idx) === "VIP") return sum + 96000;
    return sum + 80000;
  }, 0);

  // Đặt vé: lưu vào localStorage (dùng manageLocalStorage1) và cập nhật trạng thái daDat cho các ghế vừa đặt
  const handleDatVe = () => {
    // Lấy vé đã đặt cũ
    const oldVe = manageLocalStorage1.get('veDaDat') || [];
    // Gộp vé cũ và mới, loại trùng
    const newVe = [
      ...oldVe,
      ...selectedSeats.filter(sel => !oldVe.some(v => v.maGhe === sel.maGhe))
    ];
    manageLocalStorage1.set('veDaDat', newVe);
    // Cập nhật trạng thái đã đặt cho các ghế vừa chọn
    const newDanhSachGhe = danhSachGhe.map(ghe =>
      selectedSeats.some(sel => sel.maGhe === ghe.maGhe)
        ? { ...ghe, daDat: true }
        : ghe
    );
    setData({ ...data, danhSachGhe: newDanhSachGhe });
    setSelectedSeats([]);
    alert('Đặt vé thành công!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center py-8">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl flex flex-col md:flex-row p-8 gap-8 w-full max-w-5xl">
        {/* Sơ đồ ghế */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">{thongTinPhim?.tenPhim}</h2>
          <div className="mb-2 text-sm">
            <span className="font-semibold">Ngày chiếu:</span> {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}
          </div>
          <div className="mb-2 text-sm">
            <span className="font-semibold">Rạp:</span> {thongTinPhim?.tenRap} - {thongTinPhim?.diaChi}
          </div>
          <div className="bg-gray-200 rounded-lg p-4 mt-4">
            <div className="mb-2 text-center font-semibold">Màn hình</div>
            <div className="h-2 bg-gray-400 rounded mb-4"></div>
            <div className="flex flex-col gap-1">

              {rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2 justify-center">
                  {row.map((ghe, colIdx) => {
                    const idx = rowIdx * seatsPerRow + colIdx;
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
  );
}