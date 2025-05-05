import clsx from "clsx";

export function Avatar({children, size="s"}){
    const sizes ={
        s:"w-8 h-8",
        m:"w-10 h-10",
        xl:"w-12 h-12",
    }
    return (
        <>
        <div className={clsx("bg-gray-500  text-while  rounded-full flex items-center justify-center",sizes[size])}>
            {children}
        </div>
        </>
    )


}