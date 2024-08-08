import { configureStore } from "@reduxjs/toolkit";

import userReducer from './userSlice';
import catReducer from './catSlice';
import aiReducer from './aiSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cat: catReducer,
        ai: aiReducer
    }
});