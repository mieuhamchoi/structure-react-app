import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './slices/counter.slice'
import userLoginReducer from './slices/userLogin.slice'

const store = configureStore(
    {
        reducer: {
            counterStore: counterReducer,
            userLoginStore: userLoginReducer
        }
    }
)

export default store