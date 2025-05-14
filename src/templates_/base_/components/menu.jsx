
import { useState } from "react"

export function Menu({children , list}){

    const [isOpen, setIsOpen]= useState(false)
    
    return (

        <>
            <div className="relative">

                <button onClick = {()=>{
                    setIsOpen(!isOpen)
                    
                }}>{children}</button>
                   {

                    isOpen && (
                        <div className="absolute top-full bg-white  right-0 shadow-lg  min-w-48 text-black z-50 ">
                            {
                                list.map((item)=>{
                                    return (
                                        <div key={item.id}>
                                            {item.child}
                                        </div>
                                    )
                                })
                            }
                </div>
                    )
                   }

            </div>
        </>
    )
}