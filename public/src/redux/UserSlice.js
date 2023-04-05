import { createSlice } from '@reduxjs/toolkit'


const INITIAL_STATE = { users: [] }

const userSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
            console.log(state.users + 'STATE')
        }
        ,
        deleteUser: (state, action) => {
            state.users = state.users.filter(user =>
                user._id !== action.payload
            )
        },
        editUser: (state, action) => {

            const { _id, name, email } = action.payload
            console.log(action.payload + "EDITPAYLOAD")
            const user = state.users.find(user =>
                user._id === _id)
            console.log(user + 'EDITUSER')
            if (user) {
                user.name = name
                user.email = email

            }
            // return {
            //     ...state,
            //     users: state.users.map(user => {
            //         if (user._id === _id) {
            //             return { ...user, name, email };
            //         } else {
            //             return user;
            //         }
            //     })
            // };
        }



    }

})


export const { setUsers, deleteUser, editUser } = userSlice.actions
export default userSlice.reducer