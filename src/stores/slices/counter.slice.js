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

const deleteUserById = createAsyncThunk(
    "deleteUserByid",
    async (userId) => {
        //http://localhost:4000/users/1
        let res = await axios.delete(process.env.REACT_APP_SERVER_JSON + 'users/' + userId);
        return userId
    }
)

const updateUser = createAsyncThunk(
    "updateUser",
    async (dataObj) => {
        console.log("dataObj dataObj", dataObj)
        //http://localhost:4000/users/1   , editData
        let res = await axios.put(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId,  dataObj.editData);
        return res.data
    }
)

const setStatusUser = createAsyncThunk(
    "setStatusUser",
    async (dataObj) => {
        console.log("dataObj dataObj", dataObj)
        //http://localhost:4000/users/1   , editData
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId,  dataObj.patchData);
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
            builder.addCase(findAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [...action.payload]
            });
            // create new user
            builder.addCase(createNewUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload)
            });
            // delete user
            builder.addCase(deleteUserById.fulfilled, (state, action) => {
                state.loading = false;
                console.log("đã vào fulfilled", action.payload)
                state.users = state.users.filter(user => user.id != action.payload)
            });
            // edit user
            builder.addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user => {
                    if (user.id == action.payload.id) {
                        return action.payload
                    }
                    return user
                })
            });
            // set status user
            builder.addCase(setStatusUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user => {
                    if (user.id == action.payload.id) {
                        return action.payload
                    }
                    return user
                })
            });
            // xử lý các pending và rejected
            builder.addMatcher(
                (action) => {
                    if (action.meta) {
                        return action
                    }
                },
                (state, action) => {
                    if (action.meta) {
                        if (action.meta.requestStatus == "pending") {
                            console.log("đã vào pending của api: ",  action.type)
                            state.loading = false;
                        }
                        if (action.meta.requestStatus == "rejected") {
                            console.log("đã vào rejected của api: ",  action.type)
                            state.loading = false;
                        }
                    }
                }
            );
        }
    }
)

export const counterActions = {
    ... counterSlice.actions,
    findAllUsers,
    createNewUsers,
    deleteUserById,
    updateUser,
    setStatusUser
}
export default counterSlice.reducer;

