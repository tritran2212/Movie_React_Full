import { useEffect, useState } from "react";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";
import { getDanhSachBanner } from "../../service/user.product1";

export function Hero() {
    const [banner, setBanner] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getDanhSachBanner().then((res) => {
            console.log("banner", res.data.content);
            setBanner(res.data.content);
        });
    }, []);

    if (banner.length === 0) return null;

    return (
        <div className="relative w-full h-screen">
            <div className="absolute inset-0">
                <img
                    src={banner[index].hinhAnh}
                    className="w-full h-full object-cover"
                    alt="Banner"
                />
            </div>

           

            <div className="absolute inset-0 flex justify-between items-center px-4">
                <button
                    onClick={() => {
                        if (index === 0) return;
                        setIndex(index - 1);
                    }}
                    className="text-white text-4xl  bg-opacity-50 p-2 rounded-full"
                >
                    <CircleArrowLeft size={48} />
                </button>

                <button
                    onClick={() => {
                        if (index === banner.length - 1) return;
                        setIndex(index + 1);
                    }}
                    className="text-white text-4xl  bg-opacity-50 p-2 rounded-full"
                >
                    <CircleArrowRight size={48} />
                </button>
            </div>
        </div>
    );
}