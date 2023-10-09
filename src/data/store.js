import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice.js";
import userSlice from "./userSlice.js";

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        user: userSlice.reducer
    }
})


