import { createSlice } from "@reduxjs/toolkit";

const authInit = {
    auth:false
}

const UserAuthenticationProvider = createSlice({
    name:"UserAuthSlice",
    initialState:authInit,
    reducers:{
        authUser:(state)=>{
            state.auth=true;
        },
        unAuthUser:(state)=>{
            state.auth=false
        }
    }
})

export const {authUser,unAuthUser}=UserAuthenticationProvider.actions
export default UserAuthenticationProvider.reducer