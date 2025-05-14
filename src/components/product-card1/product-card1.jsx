export function ProductCard1({hinhAnh,moTa,danhGia,tenPhim,ngayKhoiChieu}){
    return (
        <>
            <div className="bg-[#F8F8F8]">
                <div className="card-header">
                    <img className="w-full h-full pt-[45px] px-[60px]" src={hinhAnh.hinhAnh} />
                </div>
                <div className="card-body">
                    <h3 className="font-light text-2xl text-black text-center">Tên Phim: {tenPhim}</h3>
                    <p className="text-[#CBC9C9] font-light text-xl mt-2 line-clamp-3">Mô Tả: {moTa}</p>
                </div>
                <div className="card-footer">
                    <p className="text-[#CBC9C9] font-light text-xl mt-2 line-clamp-3">Đánh Giá: {danhGia}*</p>
                    <p className="text-[#CBC9C9] font-light text-xl mt-2 line-clamp-3">Giờ chiếu: {ngayKhoiChieu}</p>
                </div>
            </div>
        </>
    )

}