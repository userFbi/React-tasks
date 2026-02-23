import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        deleteUser: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        }
    }
})

export const { addUser, deleteUser } = formSlice.actions
export default formSlice.reducer