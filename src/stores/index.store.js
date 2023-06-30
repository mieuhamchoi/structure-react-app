import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './slices/counter.slice'

const store = configureStore(
    {
        reducer: {
            counterStore: counterReducer
        }
    }
)

export default store