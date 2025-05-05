export const  manageLocalStorage1 ={

    set(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },

    get(key){
        const  result = localStorage.getItem(key);
        try{
            return  result? JSON.parse(result) : null ;
    }
    catch(error){
        console.error("Error parsing JSON from localStorage", error);
        return null; // or handle the error as needed
    }
        

    },
    clear(){
        localStorage.clear();
    }
}


