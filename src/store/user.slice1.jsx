

import   {createSlice} from "@reduxjs/toolkit";

 const  userSlice = createSlice({
        name : "userSlice",

        initialState :{
            user : null,
        },

         reducers:{
            setUser(state, action){
                state.user = action.payload;

            },

            clearUser(state){
                state.user = null;
            },
         }

 })

  export  const userReducer = userSlice.reducer;
    export  const {setUser} = userSlice.actions;