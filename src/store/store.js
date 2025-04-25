import {configureStore} from "@reduxjs/toolkit"
export const  store  = configureStore({

        reducer:{
            text(state= {c:1}){
                return state
            }
        }
})