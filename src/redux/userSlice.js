import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        data:null
    },
    reducers:{
        loginUser:(state,action)=>{
            state.data = action.payload
        },
        signOutUser : (state)=>{
            state.data = null
        }
    }
})

export const {loginUser, signOutUser} = userSlice.actions
export default userSlice.reducer