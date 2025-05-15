const dataUpdateFormat = {
    taiKhoan: "hongyen",    
    matKhau: "12345678",      
    email: "nguyenthihongyen@gmail.com",         
    soDt: "0346760598",          
    maNhom: "GP00",        
    hoTen: "nguyen thi hong yen",         
    maLoaiNguoiDung: "QuanTri"
};

const urlEnpoint = "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung";

const handleChangeRoleUser = (accessToken, userData, roleID) => {
    if (!(roleID === "QuanTri" || roleID === "KhachHang")) {
        alert("Vui lòng chọn vai trò hợp lệ!");
        return;
    }
    fetch(urlEnpoint, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...userData,
            maLoaiNguoiDung: roleID
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.statusCode === 200) {
            alert("Cập nhật role thành công!");
           
        } else {
            alert(data.content || "Cập nhật role thất bại!");
        }
    })
    .catch(err => {
        console.log(err);
        alert("Lỗi kết nối server!");
    });
};

const Profile = () => {
    const handleRoleChange = (accessToken, userData, roleID) => {
        handleChangeRoleUser(accessToken, userData, roleID);
    };

    return (
        <div>
            {/* Your Profile component content */}
            {/* Example button to change role */}
            <button 
                onClick={() => handleRoleChange(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9uZ3llbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Im5ndXllbnRoaWhvbmd5ZW5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJuZ3V5ZW50aGlob25neWVuQGdtYWlsLmNvbSIsIkdQMDAiXSwibmJmIjoxNzQ3MzE3MzU0LCJleHAiOjE3NDczMjA5NTR9.uiyonbbKmEPB-w7bflUEFPMs_8mZnvt-6IXiC2M8fwY",
                    dataUpdateFormat,
                    "QuanTri"
                )}
            >
                Change role
            </button>
        </div>
    );
};

export default Profile;