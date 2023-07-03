import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const CryptoJS = require("crypto-js");

const login = createAsyncThunk(
    "login",
    async (inforLogin) => {
        // localhost:4000/users
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return {
            users: res.data,
            inforLogin: inforLogin
        }
    }
)
const checkTokenLocal = createAsyncThunk(
    "checkTokenLocal",
    async (token) => {
        // localhost:4000/users
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return {
            users: res.data,
            token: token
        }
    }
)

function createToken(userObj, privateKey) {
    return CryptoJS.AES.encrypt(JSON.stringify(userObj), privateKey).toString();
}
function checkToken(token, privateKey, keyEnv) {
    try {
        if (privateKey != keyEnv) {
            return false
        }
        // giải mã
        const decryptedData = CryptoJS.AES.decrypt(token, privateKey)
            .toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData)
    } catch {
        //console.log("key lỗi")
        return false
    }
}

const userLoginSlice = createSlice(
    {
        name: "userLogin",
        initialState: {
            loading: false,
            userInfor: null
        },
        reducers: {
        },
        extraReducers: (builder) => {
            // login
            builder.addCase(login.fulfilled, (state, action) => {
                let user = action.payload.users.find(user => user.userName == action.payload.inforLogin.userName);
                if (!user) {
                    alert("Không tìm thấy người dùng")
                } else {
                    if (user.password != action.payload.inforLogin.password) {
                        alert("Mật khẩu không chính xác")
                    } else {
                        state.userInfor = user; // cập nhật lại state
                        // tạo token và lưu vào local storage

                        // Mã hóa dữ liệu
                        let token = createToken(user, process.env.REACT_APP_JWT_KEY);
                        localStorage.setItem("token", token);
                    }
                }

            });
            // check token
            builder.addCase(checkTokenLocal.fulfilled, (state, action) => {
                console.log("du lieu khi checktoken", action.payload)
                let deToken = checkToken(action.payload.token, process.env.REACT_APP_JWT_KEY, process.env.REACT_APP_JWT_KEY);
                let user = action.payload.users.find(user => user.userName == deToken.userName);
                if (deToken) {
                    if (user) {
                        if (user.password == deToken.password) {
                            state.userInfor = user;
                        }else {
                            localStorage.removeItem("token")
                        }
                    }else {
                        localStorage.removeItem("token")
                    }
                }else {
                    localStorage.removeItem("token")
                }
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
                            //console.log("đã vào pending của api: ", action.type)
                            // if (action.type == "deleteUserByid/pending") {
                            //     console.log("trường hợp pending của api delete")
                            // }
                            state.loading = true;
                        }
                        if (action.meta.requestStatus == "rejected") {
                            //console.log("đã vào rejected của api: ", action.type)
                            state.loading = false;
                        }
                        if (action.meta.requestStatus == "fulfilled") {
                            //console.log("đã vào fulfilled của api: ", action.type)
                            state.loading = false;
                        }
                    }
                }
            );
        }
    }
)


export const userLoginActions = {
    ...userLoginSlice.actions,
    login,
    checkTokenLocal
}
export default userLoginSlice.reducer;
