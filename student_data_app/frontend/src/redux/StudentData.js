import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[]
}

const userSlice = createSlice({
    name:"userDataSlice",
    initialState:initialState,
    reducers:{
        addUsers:(state,action)=>{
           state.users.push(action.payload)
        },
        removeUser:(state,action)=>{
           state.users = state.users.filter((user)=>{
            return user.id != action.payload
           })
        },
          filterUsers: (state, action) => {
            console.log("ENRE")
            const searchTerm = action.payload.toLowerCase();
            state.users = state.users.filter(
              user => 
                user.id.toString().includes(searchTerm) || 
                user.name.toLowerCase().includes(searchTerm)
            );
          }
    }
})
 
export const {addUsers,removeUser,filterUsers} = userSlice.actions
export default userSlice.reducer