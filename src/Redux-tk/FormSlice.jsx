import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        users: []
    },
    reducers: {
        addUser: (state, id) => {
            state.users.push(id.payload)
        },
        deleteUser: (state, id) => {
            state.users.splice(id.payload, 1)
        },
        editUser: (state, id) => {
            state.users[id.payload.index] = id.payload.data
        }
    }
})

export const { addUser, deleteUser, editUser } = formSlice.actions
export default formSlice.reducer