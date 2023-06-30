import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const findAllUsers = createAsyncThunk(
    "findAllUsers",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return res.data
    }
)

const createNewUsers = createAsyncThunk(
    "createNewUsers",
    async (newUser) => {
        //http://localhost:4000/users
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'users', newUser);
        return res.data
    }
)

const counterSlice = createSlice(
    {
        name: "counter",
        initialState: {
            counter: 0,
            loading: false,
            users: []
        },
        reducers: {
            increment: (state, action) => {
                return {...state, counter: state.counter + 1}
            },
            decrement: (state, action) => ({...state, counter: state.counter - 1}),
            resetCounter: (state, action) => {
                return {...state, counter: action.payload.number * action.payload.temp}
            }
        },
        extraReducers: (builder) => {
            // find all users
            builder.addCase(findAllUsers.pending, (state, action) => {
                state.loading = true;
                console.log("đã vào pending")
            });
            builder.addCase(findAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [...action.payload]
            });
            builder.addCase(findAllUsers.rejected, (state, action) => {
                state.loading = false;
                console.log("đã vào rejected")
            });
            // create new user
            builder.addCase(createNewUsers.pending, (state, action) => {
                state.loading = true;
                console.log("đã vào pending")
            });
            builder.addCase(createNewUsers.fulfilled, (state, action) => {
                state.loading = false;
                console.log("đã vào fulfilled", action.payload)
            });
            builder.addCase(createNewUsers.rejected, (state, action) => {
                state.loading = false;
                console.log("đã vào rejected")
            });
        }
    }
)

export const counterActions = {
    ... counterSlice.actions,
    findAllUsers,
    createNewUsers
}
export default counterSlice.reducer;

