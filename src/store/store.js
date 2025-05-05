import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "./user.slice1.jsx"
export const  store  = configureStore({

        reducer:{
            text(state= {c:1}){
                return state
            },

            userReducer,
        }

        
})