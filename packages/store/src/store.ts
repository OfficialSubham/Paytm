import { configureStore } from "@reduxjs/toolkit";
import balanceSlice from "./balance/balanceSlice"
const store = configureStore({
    reducer: {
        balance: balanceSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store