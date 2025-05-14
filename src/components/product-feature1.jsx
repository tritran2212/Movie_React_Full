import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getAllProcductsAPI1 } from "../service/user.product1";
import { Link } from "react-router-dom";

export default function ProductFeature() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const moviesPerPage = 10;

    useEffect(() => {
        setLoading(true);
        getAllProcductsAPI1("GP01")
            .then((res) => {
                setMovies(res.data.content);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % Math.ceil(movies.length / moviesPerPage));
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + Math.ceil(movies.length / moviesPerPage)) % Math.ceil(movies.length / moviesPerPage));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const startIndex = currentPage * moviesPerPage;
    const displayedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Phim Đang Chiếu</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={prevPage}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <button
                            onClick={nextPage}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Movie Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {displayedMovies.map((movie) => (
                        <Link
                            to={`/cardDetail/${movie.maPhim}`}
                            key={movie.maPhim}
                            className="group"
                        >
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                                {/* Movie Poster */}
                                <div className="relative">
                                    <img
                                        src={movie.hinhAnh}
                                        alt={movie.tenPhim}
                                        className="w-full h-[300px] object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full flex items-center space-x-1">
                                        <Star className="w-4 h-4" />
                                        <span className="text-sm font-semibold">{movie.danhGia}</span>
                                    </div>
                                </div>

                                {/* Movie Info */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {movie.tenPhim}
                                    </h3>
                                    <div className="flex justify-between items-center text-sm text-gray-600">
                                        <span>{movie.thoiLuong} phút</span>
                                        <span>{new Date(movie.ngayKhoiChieu).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Chi tiết
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                currentPage === index ? "bg-blue-600" : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 