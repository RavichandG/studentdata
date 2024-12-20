import {configureStore} from "@reduxjs/toolkit"
import UserAuthenticationProvider from "./UserAuthentication"
import UserDataSlice  from "./StudentData"

export const store = configureStore({
    reducer:{
        UserAuthSlice:UserAuthenticationProvider,
        userDataSlice:UserDataSlice
    }
})