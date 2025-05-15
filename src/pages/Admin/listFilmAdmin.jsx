import { useEffect, useState } from "react";
import { getAllProcductsAPI1, addFilmAPI, updateFilmAPI, deleteFilmAPI } from "../../service/user.product1";

export default function ListFilmAdmin() {
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add"); // "add" | "edit"
    const [currentFilm, setCurrentFilm] = useState(null);
    const [form, setForm] = useState({
        tenPhim: "",
        moTa: "",
        hinhAnh: "",
        maNhom: "GP01",
    });
    const defaultGroup = "GP01";

    const fetchFilms = () => {
        getAllProcductsAPI1(defaultGroup).then((res) => {
            setFilms(res.data.content);
        });
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    const filteredFilms = films.filter(film =>
        film.tenPhim.toLowerCase().includes(search.toLowerCase()) ||
        film.moTa?.toLowerCase().includes(search.toLowerCase()) ||
        String(film.maPhim).includes(search)
    );

    // Xử lý mở modal thêm/sửa
    const openAddModal = () => {
        setModalType("add");
        setForm({ tenPhim: "", moTa: "", hinhAnh: "", maNhom: defaultGroup });
        setShowModal(true);
    };
    const openEditModal = (film) => {
        setModalType("edit");
        setCurrentFilm(film);
        setForm({
            tenPhim: film.tenPhim,
            moTa: film.moTa,
            hinhAnh: film.hinhAnh,
            maNhom: film.maNhom || defaultGroup,
        });
        setShowModal(true);
    };
    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalType === "add") {
                const formData = new FormData();
                formData.append("tenPhim", form.tenPhim);
                formData.append("moTa", form.moTa);
                formData.append("maNhom", form.maNhom);
                if (form.hinhAnh instanceof File) {
                    formData.append("hinhAnh", form.hinhAnh);
                }
                await addFilmAPI(formData);
            } else if (modalType === "edit" && currentFilm) {
                const formData = new FormData();
                formData.append("maPhim", currentFilm.maPhim);
                formData.append("tenPhim", form.tenPhim);
                formData.append("moTa", form.moTa);
                formData.append("maNhom", form.maNhom);
                if (form.hinhAnh instanceof File) {
                    formData.append("hinhAnh", form.hinhAnh);
                }
                await updateFilmAPI(formData);
            }
            setShowModal(false);
            fetchFilms();
        } catch (err) {
            alert("Có lỗi xảy ra!");
        }
    };
    // Xử lý xóa phim
    const handleDelete = async (maPhim) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
            try {
                await deleteFilmAPI(maPhim);
                fetchFilms();
            } catch (err) {
                alert("Xóa thất bại!");
            }
        }
    };
    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "hinhAnh") {
            setForm((f) => ({ ...f, hinhAnh: files[0] }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Quản lý Phim</h2>
            <div className="flex justify-between items-center mb-6">
                <button onClick={openAddModal} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Thêm phim</button>
                <input
                    type="text"
                    placeholder="Tìm kiếm phim..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="overflow-x-auto rounded shadow bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã phim</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên phim</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFilms.map((film) => (
                            <tr key={film.maPhim} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-center">{film.maPhim}</td>
                                <td className="px-4 py-3 text-center">
                                    <img src={film.hinhAnh} alt={film.tenPhim} className="w-16 h-20 object-cover rounded mx-auto" />
                                </td>
                                <td className="px-4 py-3">{film.tenPhim}</td>
                                <td className="px-4 py-3 max-w-xs truncate" title={film.moTa}>{film.moTa}</td>
                                <td className="px-4 py-3 text-center">
                                    <button title="Sửa" onClick={() => openEditModal(film)} className="inline-block mr-2 text-blue-500 hover:text-blue-700">
                                        <span role="img" aria-label="edit">✏️</span>
                                    </button>
                                    <button title="Xóa" onClick={() => handleDelete(film.maPhim)} className="inline-block text-red-500 hover:text-red-700">
                                        <span role="img" aria-label="delete">🗑️</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal thêm/sửa phim */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
                        <h3 className="text-xl font-bold mb-4">{modalType === "add" ? "Thêm phim" : "Sửa phim"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Tên phim</label>
                                <input name="tenPhim" value={form.tenPhim} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Mô tả</label>
                                <textarea name="moTa" value={form.moTa} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Hình ảnh {modalType === "edit" && <span className="text-xs text-gray-400">(bỏ qua nếu không đổi)</span>}</label>
                                <input name="hinhAnh" type="file" accept="image/*" onChange={handleChange} className="w-full" />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Mã nhóm</label>
                                <input name="maNhom" value={form.maNhom} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

