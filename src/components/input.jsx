  import clsx  from "clsx";
 import { useId } from "react";

export function Input({

    type="text",
    placeholder="Enter text",
     required,
    ...restInput
}){

    const id = useId()
    return (

        <>
           
            <div className="relative inline-block">
                <input 
                id={id}
                type={type}
                placeholder={placeholder}
                {...restInput}
                className={clsx("py-1 pr-10 pb-2 border-t-0 border-l-0 border-r-0 border-b-2 border-neutral-500  outline-none w-[400px]","focus:border-b-4 focus:border-b-fuchsia-800 focus:shadow-[0px_1px_0px_0px_8a0194]",{"pr-6":required})}
                />
                   
                {required && (<span className={clsx("absolute right-0 top-1/2 -translate-y-1/2 text-red-500 text-[20px]")}>*</span>) }
            </div>

            
        
        </>
    );
}