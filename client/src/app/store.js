import { configureStore } from "@reduxjs/toolkit";

import userReducer from './userSlice';
import catReducer from './catSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cat: catReducer
    }
});