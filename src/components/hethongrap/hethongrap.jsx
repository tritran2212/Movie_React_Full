import { useEffect, useState } from "react";
import { getLayThongTinHeThongRap } from "../../service/user.product1";

export function Hethongrap() {
    const [hethongrap, setHeThongRap] = useState([]);

    useEffect(() => {
        getLayThongTinHeThongRap().then((res) => {
            setHeThongRap(res.data.content);
        });
    }, []);

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Hệ Thống Rạp Chiếu
                    </span>
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {hethongrap.map((ht) => (
                        <div 
                            key={ht.maHeThongRap} 
                            className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center">
                                <div className="relative w-24 h-24 mb-4">
                                    <img 
                                        src={ht.logo} 
                                        alt={ht.tenHeThongRap} 
                                        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                                    />
                                </div>
                                <h3 className="text-center text-gray-800 font-medium group-hover:text-blue-600 transition-colors duration-300">
                                    {ht.tenHeThongRap}
                                </h3>
                            </div>
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
